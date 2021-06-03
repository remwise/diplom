<?php
include_once '../config/file_helper.php';
include_once '../config/core.php';
include_once '../libs/response-code.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$path = "../../data/images/feedbacks";

$name = basename($_FILES["filename"]["name"]);
$extension = strtolower(substr(strrchr($name, '.'), 1));

$filename = DFileHelper::getRandomFileName($path, $extension);

$target = $path . '/' . $filename . '.' . $extension;

if (move_uploaded_file($tmp_name = $_FILES["filename"]["tmp_name"], $target)) {
  http_response_code(200);
  echo json_encode(array("data" => $filename . '.' . $extension));
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Данные не корректны, либо загрузка файла невозможна."));
}
