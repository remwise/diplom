<?php
include_once '../config/database.php';
include_once '../objects/digests_sections.php';
include_once '../objects/articles.php';
include_once '../objects/users.php';
include_once '../objects/articles_collaborators.php';
include_once '../objects/articles_directors.php';
include_once '../libs/response-code.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();

$digests_sections = new Digests_sections($db);
$articles = new Articles($db);
$users = new Users($db);
$articles_collaborators = new Articles_collaborators($db);
$articles_directors = new Articles_directors($db);

$digests_sections->digest_id = isset($_GET['id']) ? $_GET['id'] : die();

$stmt = $digests_sections->read_one();

$num = $stmt->rowCount();

if ($num > 0) {
  $digests_sections_arr = array();
  $digests_sections_arr["records"] = array();
  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $articles->digest_section_id = $digest_section_id;
    $tmp = $articles->read_one();
    $articles_arr = array();
    while ($row2 = $tmp->fetch(PDO::FETCH_ASSOC)) {
      extract($row2);

      $articles_collaborators->article_id = $article_id;
      $tmp2 = $articles_collaborators->read();
      $articles_collaborators_arr = array();
      while ($row3 = $tmp2->fetch(PDO::FETCH_ASSOC)) {
        extract($row3);

        $articles_collaborators_item = array(
          "collaborator_num" => $collaborator_num,
          "surname" => $surname,
          "name" => $person_name,
          "patronymic" => $patronymic,
          "position_name" => $position_name
        );
        array_push($articles_collaborators_arr, $articles_collaborators_item);
      }

      $articles_directors->article_id = $article_id;
      $tmp2 = $articles_directors->read();
      $articles_directors_arr = array();
      while ($row3 = $tmp2->fetch(PDO::FETCH_ASSOC)) {
        extract($row3);

        $articles_directors_item = array(
          "surname" => $surname,
          "name" => $person_name,
          "patronymic" => $patronymic,
          "position_name" => $position_name
        );
        array_push($articles_directors_arr, $articles_directors_item);
      }

      $users->user_id = $user_id;
      $tmp2 = $users->read();
      $user_arr = array();
      $row3 = $tmp2->fetch(PDO::FETCH_ASSOC);
      extract($row3);

      $user_arr = array(
        "surname" => $surname,
        "name" => $person_name,
        "patronymic" => $patronymic,
        "position_name" => $position_name
      );

      $articles_item = array(
        "article_id" => $article_id,
        "name" => $article_name,
        "description" => $description,
        "user" => $user_arr,
        "status_id" => $status_id,
        "payment_id" => $payment_id,
        "collaborators" => $articles_collaborators_arr,
        "directors" => $articles_directors_arr

      );
      array_push($articles_arr, $articles_item);
    }

    $digests_sections_item = array(
      "digest_section_id" => $digest_section_id,
      "name" => $name,
      "section_num" => $section_num,
      "articles" => $articles_arr
    );
    array_push($digests_sections_arr["records"], $digests_sections_item);
  }

  http_response_code(200);
  echo json_encode($digests_sections_arr);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "Сборник не существует."));
}
