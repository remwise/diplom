<?php
include_once '../config/core.php';
include_once '../config/database.php';
include_once '../objects/feedbacks.php';
include_once '../libs/response-code.php';
include_once '../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../libs/php-jwt-master/src/ExpiredException.php';
include_once '../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../libs/php-jwt-master/src/JWT.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

use \Firebase\JWT\JWT;

$database = new Database();
$db = $database->getConnection();

$feedbacks = new Feedbacks($db);

$data = json_decode(file_get_contents("php://input"));

$jwt = isset($data->jwt) ? $data->jwt : "";

if ($jwt) {
  try {
    $decoded = JWT::decode($jwt, $key, array('HS256'));
  } catch (Exception $e) {
    http_response_code(401);
    echo json_encode(array(
      "message" => "Доступ закрыт.",
      "error" => $e->getMessage()
    ));
  }

  $feedbacks->text = $data->text;
  $feedbacks->filename = $data->filename;
  $feedbacks->user_id = $decoded->data->user_id;

  if (!empty($feedbacks->text) && $feedbacks->create()) {
    http_response_code(200);
    echo json_encode(array("message" => "Отзыв был успешно добавлен."));
  } else {
    http_response_code(400);
    echo json_encode(array("message" => "Данные не корректны, либо добавление невозможно."));
  }
} else {
  http_response_code(401);
  echo json_encode(array("message" => "Доступ запрещён."));
}
