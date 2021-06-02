<?php
include_once '../config/database.php';
include_once '../objects/organizations.php';
include_once '../libs/response-code.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$database = new Database();
$db = $database->getConnection();

$organizations = new Organizations($db);

$stmt = $organizations->read();
$num = $stmt->rowCount();

if ($num > 0) {
  $organizations_arr = array();
  $organizations_arr["records"] = array();

  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $organizations_item = array(
      "organization_id" => $organization_id,
      "name" => $name,
      "city_id" => $city_id
    );

    array_push($organizations_arr["records"], $organizations_item);
  }

  http_response_code(200);
  echo json_encode($organizations_arr);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "В списке нету организаций."));
}
