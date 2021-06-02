<?php
class Programs
{
  private $conn;
  private $table_name = "programs";

  public $program_id;
  public $date;
  public $text;
  public $event_id;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  function create()
  {
    $query = "INSERT INTO " . $this->table_name . "
                SET
                    date = :date,
                    text = :text,
                    event_id = :event_id";

    $stmt = $this->conn->prepare($query);

    $this->date = htmlspecialchars(strip_tags($this->date));
    $this->text = htmlspecialchars(strip_tags($this->text));
    $this->event_id = htmlspecialchars(strip_tags($this->event_id));

    $stmt->bindParam(':date', $this->date);
    $stmt->bindParam(':text', $this->text);
    $stmt->bindParam(':event_id', $this->event_id);


    if ($stmt->execute()) {
      $this->program_id = $this->conn->lastInsertId();
      return true;
    }

    return false;
  }

  function delete()
  {
    $query = "DELETE FROM " . $this->table_name . "
                WHERE
                    program_id = :program_id";

    $stmt = $this->conn->prepare($query);

    $this->program_id = htmlspecialchars(strip_tags($this->program_id));

    $stmt->bindParam(':program_id', $this->program_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function read_one()
  {
    $query = "SELECT
              program_id, date, text
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
