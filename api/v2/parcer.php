<!-- $vk = new VKApiClient();

$vk-> -->
<?php
set_time_limit(0);
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "universities_db";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$lang = 0; // russian
$headerOptions = array(
  'http' => array(
    'method' => "GET",
    'header' => "Accept-language: ru\r\n" .
      "Cookie: remixlang=$lang\r\n"
  )
);
$token = 'access_token=af6c9110af6c9110af6c911006af1b7dbdaaf6caf6c9110cfcac2265b1eb27dc371bb9a';
// $methodUrl = "https://api.vk.com/method/database.getRegions?v=5.130&count=1000&country_id=1&" . $token;
$streamContext = stream_context_create($headerOptions);
// $json = file_get_contents($methodUrl, false, $streamContext);
// $arr = json_decode($json, true);

// foreach ($arr['response']['items'] as $region) {
$methodUrl = "https://api.vk.com/method/database.getCities?v=5.130&count=1000&country_id=1&" . $token;
// $methodUrl = "https://api.vk.com/method/database.getCities?v=5.130&region_id=" . $region['id'] . "&count=1000&country_id=1&" . $token;
$jsonCities = file_get_contents($methodUrl, false, $streamContext);
$arrCities = json_decode($jsonCities, true);
// echo '<pre>';
// print_r($arrCities['response']['items']);
// echo '</pre>';
$arrCities['response']['items'] = [
  array(
    "id" => 25,
    "title" => "Барнаул",
    "region" => "Алтайский край"
  )
];
foreach ($arrCities['response']['items'] as $city) {
  $methodUrl = "https://api.vk.com/method/database.getUniversities?v=5.130&city_id=" . $city['id'] . "&count=10000&country_id=1&" . $token;
  $jsonUniversities = file_get_contents($methodUrl, false, $streamContext);
  $arrUniversities = json_decode($jsonUniversities, true);

  if ($arrUniversities['response']['count'] != 0) {
    $sql = "INSERT INTO cities (name) VALUES ('{$city['title']}')";
    if (mysqli_query($conn, $sql)) {
      echo "New cities created successfully ('{$city['title']}')<br>";
    } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    $city_id = mysqli_insert_id($conn);
  }
  foreach ($arrUniversities['response']['items'] as $university) {
    $sql = "INSERT INTO universities (name) VALUES ('{$university['title']}')";
    if (mysqli_query($conn, $sql)) {
      echo "New universities created successfully ('{$university['title']}')<br>";
    } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    $university_id = mysqli_insert_id($conn);
    $sql = "INSERT INTO cities_university (city_id, university_id) VALUES ({$city_id}, {$university_id})";
    if (mysqli_query($conn, $sql)) {
      echo "New record created successfully<br>";
    } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
  }
}
// echo ($arrCities['response']['count']);
// echo '</pre>';
// }

mysqli_close($conn);

// echo '<pre>';
// echo 'Total countries count: ' . $arr['response']['count'] . ' loaded: ' . count($arr['response']['items']);
// print_r($arr['response']['items']);
// echo '</pre>';

//af6c9110af6c9110af6c911006af1b7dbdaaf6caf6c9110cfcac2265b1eb27dc371bb9a
