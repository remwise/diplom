<?php
include_once '../config/database.php';
include_once '../objects/digests_sections.php';
include_once '../libs/response-code.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();

$digests_sections = new Digests_sections($db);

$digests_sections->digest_id = isset($_GET['id']) ? $_GET['id'] : die();

$stmt = $digests_sections->read_one();

$sections = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  extract($row);

  $section = array(
    "digest_section_id" => $digest_section_id,
    "section_num" => $section_num,
    "name" => $name
  );

  array_push($sections, $section);
}

if (!empty($sections)) {
  http_response_code(200);
  echo json_encode($sections);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "Секций нет."), JSON_UNESCAPED_UNICODE);
}
