<?php
// include_once '../config/core.php';
// include_once '../config/database.php';
// include_once '../objects/conferences.php';
// include_once '../objects/conferences_admins.php';
// include_once '../libs/response-code.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$name = basename($_FILES["file"]["name"]);

if (move_uploaded_file($tmp_name = $_FILES["file"]["tmp_name"], "../../data/images/$name")) {
  echo "Файл корректен и был успешно загружен.\n";
} else {
  echo "Возможная атака с помощью файловой загрузки!\n";
}
