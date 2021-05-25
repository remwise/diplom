<?php
include_once '../config/database.php';
include_once '../objects/positions.php';
include_once '../libs/response-code.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$database = new Database();
$db = $database->getConnection();

$positions = new Positions($db);

$stmt = $positions->read();
$num = $stmt->rowCount();

if ($num > 0) {
  $positions_arr = array();
  $positions_arr["records"] = array();

  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $positions_item = array(
      "position_id" => $position_id,
      "name" => $name
    );

    array_push($positions_arr["records"], $positions_item);
  }

  http_response_code(200);
  echo json_encode($positions_arr);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "В списке нету должностей."), JSON_UNESCAPED_UNICODE);
}
