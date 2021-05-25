<?php
include_once '../config/database.php';
include_once '../objects/cities.php';
include_once '../libs/response-code.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$database = new Database();
$db = $database->getConnection();

$cities = new Cities($db);

$stmt = $cities->read();
$num = $stmt->rowCount();

if ($num > 0) {
  $cities_arr = array();
  $cities_arr["records"] = array();

  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $cities_item = array(
      "city_id" => $city_id,
      "city_name" => $city_name,
      "country_name" => $country_name
    );

    array_push($cities_arr["records"], $cities_item);
  }

  http_response_code(200);
  echo json_encode($cities_arr);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "В списке нету городов."), JSON_UNESCAPED_UNICODE);
}
