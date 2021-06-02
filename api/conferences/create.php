<?php
include_once '../config/core.php';
include_once '../config/database.php';
include_once '../objects/conferences.php';
include_once '../objects/conferences_admins.php';
include_once '../libs/response-code.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$database = new Database();
$db = $database->getConnection();

$conference_admin = new Conferences_admins($db);
$conference = new Conferences($db);

$data = json_decode(file_get_contents("php://input"));

$conference->name = $data->name;
$conference->organization_id = $data->organization_id;

if (!empty($conference->name) && !empty($conference->organization_id) && $conference->create()) {

  $conference_admin->conference_id = $conference->conference_id;
  $conference_admin->user_id = $data->user_id;

  if (!empty($conference_admin->conference_id) && !empty($conference_admin->user_id) && $conference_admin->create()) {
    http_response_code(200);
    echo json_encode(array("message" => "Конференция была создана."));
  } else {
    $conference->delete();
    http_response_code(400);
    echo json_encode(array("message" => "Невозможно создать конференцию, либо введенные данные не корректны."));
  }
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Невозможно создать конференцию, либо введенные данные не корректны."));
}
