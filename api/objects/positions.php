<?php
class Positions
{
  private $conn;
  private $table_name = "positions";

  public $position_id;
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
                    position_id = :position_id";

    $stmt = $this->conn->prepare($query);

    $this->position_id = htmlspecialchars(strip_tags($this->position_id));

    $stmt->bindParam(':position_id', $this->position_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function read()
  {
    $query = "SELECT
              position_id, name
          FROM
              " . $this->table_name . "
          ORDER BY
              name";

    $stmt = $this->conn->prepare($query);

    $stmt->execute();

    return $stmt;
  }
}
