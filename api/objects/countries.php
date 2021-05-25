<?php
class Countries
{
  private $conn;
  private $table_name = "countries";

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
                    name = :name";

    $stmt = $this->conn->prepare($query);

    $this->name = htmlspecialchars(strip_tags($this->name));

    $stmt->bindParam(':name', $this->name);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function delete()
  {
    $query = "DELETE FROM " . $this->table_name . "
                WHERE
                    country_id = :country_id";

    $stmt = $this->conn->prepare($query);

    $this->country_id = htmlspecialchars(strip_tags($this->country_id));

    $stmt->bindParam(':country_id', $this->country_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function read()
  {
    $query = "SELECT
              country_id, name
          FROM
              " . $this->table_name . "
          ORDER BY
              name";

    $stmt = $this->conn->prepare($query);

    $stmt->execute();

    return $stmt;
  }
}
