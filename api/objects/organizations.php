<?php
class Organizations
{
  private $conn;
  private $table_name = "organizations";

  public $organization_id;
  public $city_id;
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
                    city_id = :city_id";

    $stmt = $this->conn->prepare($query);

    $this->name = htmlspecialchars(strip_tags($this->name));
    $this->city_id = htmlspecialchars(strip_tags($this->city_id));

    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':city_id', $this->city_id);


    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function delete()
  {
    $query = "DELETE FROM " . $this->table_name . "
                WHERE
                    organization_id = :organization_id";

    $stmt = $this->conn->prepare($query);

    $this->organization_id = htmlspecialchars(strip_tags($this->organization_id));

    $stmt->bindParam(':organization_id', $this->organization_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function read()
  {
    $query = "SELECT
              organization_id, name, city_id
          FROM
              " . $this->table_name . "
          ORDER BY
              name";

    $stmt = $this->conn->prepare($query);

    $stmt->execute();

    return $stmt;
  }
}
