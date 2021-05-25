<?php
include_once '../config/core.php';
include_once '../config/database.php';
include_once '../objects/users.php';
include_once '../libs/response-code.php';
include_once '../libs/password.php';
include_once '../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../libs/php-jwt-master/src/ExpiredException.php';
include_once '../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../libs/php-jwt-master/src/JWT.php';

header("Access-Control-Allow-Origin: " . $URL);
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

use \Firebase\JWT\JWT;

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

$user->email = $data->email;
$email_exists = $user->emailExists();


if ($email_exists && password_verify($data->password, $user->password)) {
  $token = array(
    "iss" => $iss,
    "aud" => $aud,
    "iat" => $iat,
    "nbf" => $nbf,
    "data" => array(
      "user_id" => $user->user_id,
      "email" => $user->email,
      "phone" => $user->phone,
      "birthday" => $user->birthday,
      "sex" => $user->sex,
      "address" => $user->address,
      "city_id" => $user->city_id,
      "organization_id" => $user->organization_id,
      "person_id" => $user->person_id,
      "role_id" => $user->role_id
    )
  );

  http_response_code(200);

  $jwt = JWT::encode($token, $key);
  echo json_encode(
    array(
      "message" => "Успешный вход в систему.",
      "jwt" => $jwt
    )
  );
} else {
  http_response_code(401);
  echo json_encode(array("message" => "Ошибка входа."));
}
