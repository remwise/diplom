<?php
class Conferences
{
  private $conn;
  private $table_name = "conferences";

  public $conference_id;
  public $name;
  public $organization_id;


  public function __construct($db)
  {
    $this->conn = $db;
  }

  function create()
  {
    $query = "INSERT INTO " . $this->table_name . "
                SET
                    name = :name,
                    organization_id = :organization_id";

    $stmt = $this->conn->prepare($query);

    $this->name = htmlspecialchars(strip_tags($this->name));
    $this->organization_id = htmlspecialchars(strip_tags($this->organization_id));

    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':organization_id', $this->organization_id, PDO::PARAM_INT);


    if ($stmt->execute()) {
      $this->conference_id = $this->conn->lastInsertId();
      return true;
    }

    return false;
  }

  function delete()
  {
    $query = "DELETE FROM " . $this->table_name . "
                WHERE
                    conference_id = :conference_id";

    $stmt = $this->conn->prepare($query);

    $this->conference_id = htmlspecialchars(strip_tags($this->conference_id));

    $stmt->bindParam(':conference_id', $this->conference_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function read()
  {
    $query = "SELECT
              c.conference_id, c.name, o.name as organization_name
          FROM
              " . $this->table_name . " c
              LEFT JOIN
                  organizations o
                      ON o.organization_id = c.organization_id
              WHERE conference_id = :conference_id";

    $stmt = $this->conn->prepare($query);

    $this->conference_id = htmlspecialchars(strip_tags($this->conference_id));

    $stmt->bindParam(":conference_id", $this->conference_id, PDO::PARAM_INT);

    $stmt->execute();

    return $stmt;
  }
}
