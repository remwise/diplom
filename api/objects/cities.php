<?php
class Cities
{
  private $conn;
  private $table_name = "cities";

  public $city_id;
  public $country_id;
  public $name;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  function create()
  {
    $query = "INSERT INTO " . $this->table_name . "
                SET
                    name = :name,
                    country_id = :country_id";

    $stmt = $this->conn->prepare($query);

    $this->name = htmlspecialchars(strip_tags($this->name));
    $this->country_id = htmlspecialchars(strip_tags($this->country_id));

    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':country_id', $this->country_id);


    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function delete()
  {
    $query = "DELETE FROM " . $this->table_name . "
                WHERE
                    city_id = :city_id";

    $stmt = $this->conn->prepare($query);

    $this->city_id = htmlspecialchars(strip_tags($this->city_id));

    $stmt->bindParam(':city_id', $this->city_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function read()
  {
    $query = "SELECT
              ci.city_id, ci.name as city_name, co.name as country_name
          FROM
              " . $this->table_name . " ci
              LEFT JOIN
                  countries co
                      ON ci.country_id = co.country_id
          ORDER BY
              ci.name";

    $stmt = $this->conn->prepare($query);

    $stmt->execute();

    return $stmt;
  }
}
