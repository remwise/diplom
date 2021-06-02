<?php
include_once '../config/database.php';
include_once '../objects/conferences.php';
include_once '../libs/response-code.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();

$conference = new Conferences($db);

$conference->conference_id = isset($_GET['id']) ? $_GET['id'] : die();

$stmt = $conference->read();

$num = $stmt->rowCount();

if ($num > 0) {
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  extract($row);

  $conference_arr = array(
    "conference_id" => $conference_id,
    "name" => $name,
    "organization_name" => $organization_name
  );

  http_response_code(200);
  echo json_encode($conference_arr);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "Конференция не существует."));
}
