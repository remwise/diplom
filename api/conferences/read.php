<?php
include_once '../config/core.php';
include_once '../config/database.php';
include_once '../objects/conferences.php';
include_once '../objects/conferences_admins.php';
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

$conference_admin = new Conferences_admins($db);
$conference = new Conferences($db);

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

  $conference_admin->user_id = $decoded->data->user_id;

  $stmt = $conference_admin->read();

  $num = $stmt->rowCount();

  if ($num > 0) {
    $conferences = array();
    $conferences["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $conference->conference_id = $conference_id;

      $tmp = $conference->read();

      while ($row2 = $tmp->fetch(PDO::FETCH_ASSOC)) {
        extract($row2);

        $conferences_item = array(
          "conference_id" => $conference_id,
          "name" => $name,
          "organization_name" => $organization_name
        );

        array_push($conferences["records"], $conferences_item);
      }
    }

    http_response_code(200);
    echo json_encode($conferences);
  } else {
    http_response_code(404);
    echo json_encode(array("message" => "Нет созданных конференций."));
  }
} else {
  http_response_code(401);
  echo json_encode(array("message" => "Доступ запрещён."));
}
