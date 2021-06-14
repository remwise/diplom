<?php
include_once '../config/database.php';
include_once '../objects/digests.php';
include_once '../libs/response-code.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();

$digest = new Digests($db);

$digest->conference_id = isset($_GET['id']) ? $_GET['id'] : die();

$stmt = $digest->read();

$num = $stmt->rowCount();

if ($num > 0) {
  $digests_arr = array();
  $digests_arr["records"] = array();
  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $digests_item = array(
      "digest_id" => $digest_id,
      "filename" => $filename,
      "publication_year" => $publication_year,
      "conference_id" => $conference_id,
    );

    array_push($digests_arr["records"], $digests_item);
  }
  http_response_code(200);
  echo json_encode($digests_arr["records"]);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "Сборников нет."));
}
