<?php
class Sections
{
  private $conn;
  private $table_name = "sections";

  public $section_id;
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
                    section_id = :section_id";

    $stmt = $this->conn->prepare($query);

    $this->section_id = htmlspecialchars(strip_tags($this->section_id));

    $stmt->bindParam(':section_id', $this->section_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function read()
  {
    $query = "SELECT
                section_id, name
          FROM
              " . $this->table_name;

    $stmt = $this->conn->prepare($query);

    $stmt->execute();

    return $stmt;
  }
}
