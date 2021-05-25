<?php
// показывать сообщения об ошибках 
ini_set('display_errors', 1);
error_reporting(E_ALL);

$URL = "http://diplom.local/";
// $URL = "http://localhost:3000";

// URL домашней страницы 
$home_url = $URL . "api/";

// установить часовой пояс по умолчанию 
date_default_timezone_set('Europe/Moscow');

// страница указана в параметре URL, страница по умолчанию одна 
$page = isset($_GET['page']) ? $_GET['page'] : 1;

// установка количества записей на странице 
$records_per_page = 5;

// расчёт для запроса предела записей 
$from_record_num = ($records_per_page * $page) - $records_per_page;

// переменные, используемые для JWT 
$key = "Hlae6lUBG2YZ72NUC56YsFDBupK7Ba8ikEIbHmV2iidP5CTCVX";
$iss = $URL;
$aud = $URL;
$iat = 1356999524;
$nbf = 1357000000;
