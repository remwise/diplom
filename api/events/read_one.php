<?php
include_once '../config/database.php';
include_once '../objects/events.php';
include_once '../objects/programs.php';
include_once '../objects/files.php';
include_once '../libs/response-code.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();

$event = new Events($db);
$program = new Programs($db);
$file = new Files($db);

$event->conference_id = isset($_GET['id']) ? $_GET['id'] : die();

$event->read_one();

if ($event->name != null) {

  $program->event_id = $event->event_id;
  $stmt = $program->read_one();

  $program_arr = array();

  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $program_item = array(
      "program_id" => $program_id,
      "date" => $date,
      "text" => $text
    );

    array_push($program_arr, $program_item);
  }

  $file->event_id = $event->event_id;
  $stmt = $file->read_one();

  $file_arr = array();

  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $file_item = array(
      "file_id" => $file_id,
      "filename" => $filename,
      "name" => $name
    );

    array_push($file_arr, $file_item);
  }

  $event_arr = array(
    "event_id" => $event->event_id,
    "name" => $event->name,
    "logo_filename" => $event->logo_filename,
    "registration_end" => $event->registration_end,
    "start_date" => $event->start_date,
    "end_date" => $event->end_date,
    "about" => $event->about,
    "contacts" => $event->contacts,
    "price" => $event->price,
    "conference_id" => $event->conference_id,
    "program" => $program_arr,
    "files" => $file_arr,
  );

  http_response_code(200);
  echo json_encode($event_arr);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "Конференция не существует."), JSON_UNESCAPED_UNICODE);
}
