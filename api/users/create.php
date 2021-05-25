<?php
include_once '../config/core.php';
include_once '../config/database.php';
include_once '../objects/users.php';
include_once '../objects/persons.php';
include_once '../libs/response-code.php';
include_once '../libs/password.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$database = new Database();
$db = $database->getConnection();

$user = new Users($db);
$person = new Persons($db);

$data = json_decode(file_get_contents("php://input"));

$user->email = $data->email;
$email_exists = $user->emailExists();

if ($email_exists) {
  http_response_code(400);
  echo json_encode(array("message" => "Данный email уже занят другим пользоватлем."));
} else {
  $person->surname = $data->surname;
  $person->name = $data->name;
  $person->patronymic = $data->patronymic;
  $person->position_id = $data->position_id;

  if (!empty($person->surname) && !empty($person->name) && $person->create()) {
    $user->email = $data->email;
    $user->phone = $data->phone;
    $user->password = $data->password;
    $user->birthday = $data->birthday;
    // $user->birthday = date('Y-m-d', strtotime($data->birthday));
    // echo $user->birthday . 'data';
    $user->sex = $data->sex;
    $user->address = $data->address;
    $user->city_id = $data->city_id;
    $user->organization_id = $data->organization_id;
    $user->person_id = $person->person_id;

    if (
      !empty($user->birthday) && !empty($user->email) &&
      !empty($user->password) && !empty($user->sex) &&
      !empty($user->person_id) && $user->create()
    ) {
      http_response_code(200);
      echo json_encode(array("message" => "Пользователь был создан."));
    } else {
      $person->delete();
      http_response_code(400);
      echo json_encode(array("message" => "Невозможно создать пользователя, либо введенные данные не корректны."));
    }
  } else {
    http_response_code(400);
    echo json_encode(array("message" => "Невозможно создать пользователя, либо введенные данные не корректны."));
  }
}
