<?php
class Files
{
  private $conn;
  private $table_name = "files";

  public $file_id;
  public $name;
  public $event_id;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  function create()
  {
    $query = "INSERT INTO " . $this->table_name . "
                SET
                    name = :name,
                    event_id = :event_id";

    $stmt = $this->conn->prepare($query);

    $this->name = htmlspecialchars(strip_tags($this->name));
    $this->event_id = htmlspecialchars(strip_tags($this->event_id));

    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':event_id', $this->event_id);


    if ($stmt->execute()) {
      $this->file_id = $this->conn->lastInsertId();
      return true;
    }

    return false;
  }

  function delete()
  {
    $query = "DELETE FROM " . $this->table_name . "
                WHERE
                    file_id = :file_id";

    $stmt = $this->conn->prepare($query);

    $this->file_id = htmlspecialchars(strip_tags($this->file_id));

    $stmt->bindParam(':file_id', $this->file_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function read_one()
  {
    $query = "SELECT
              file_id, name
          FROM
              " . $this->table_name . "
              WHERE event_id = :event_id";

    $stmt = $this->conn->prepare($query);

    $this->event_id = htmlspecialchars(strip_tags($this->event_id));

    $stmt->bindParam(':event_id', $this->event_id, PDO::PARAM_INT);

    $stmt->execute();

    return $stmt;
  }
}
