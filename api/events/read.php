<?php
include_once '../config/database.php';
include_once '../objects/events.php';
include_once '../libs/response-code.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$database = new Database();
$db = $database->getConnection();

$events = new Events($db);

$stmt = $events->read();
$num = $stmt->rowCount();

if ($num > 0) {
  $events_arr = array();
  $events_arr["records"] = array();

  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $events_item = array(
      "conference_id" => $conference_id,
      "event_id" => $event_id,
      "event_name" => $event_name,
      "logo_filename" => $logo_filename,
      "conference_name" => $conference_name,
      "registration_end" => $registration_end,
      "start_date" => $start_date,
      "end_date" => $end_date,
      "about" => $about,
      "contacts" => $contacts,
      "price" => $price,
      "organization_name" => $organization_name,
    );

    array_push($events_arr["records"], $events_item);
  }

  http_response_code(200);
  echo json_encode($events_arr);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "В списке нету событий."));
}
