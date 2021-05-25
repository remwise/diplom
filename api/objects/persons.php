<?php
class Persons
{
  private $conn;
  private $table_name = "persons";

  public $person_id;
  public $surname;
  public $name;
  public $patronymic;
  public $position_id;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  function create()
  {
    $query = "INSERT INTO " . $this->table_name . "
                SET
                    surname = :surname,
                    name = :name,
                    patronymic = :patronymic,
                    position_id = :position_id";

    $stmt = $this->conn->prepare($query);

    $this->surname = htmlspecialchars(strip_tags($this->surname));
    $this->name = htmlspecialchars(strip_tags($this->name));
    $this->patronymic = htmlspecialchars(strip_tags($this->patronymic));
    $this->position_id = htmlspecialchars(strip_tags($this->position_id));

    $myvar = NULL;

    $stmt->bindParam(':surname', $this->surname);
    $stmt->bindParam(':name', $this->name);

    if ($this->patronymic != "") {
      $stmt->bindParam(':patronymic', $this->patronymic);
    } else {
      $stmt->bindParam(':patronymic', $myvar, PDO::PARAM_NULL);
    }

    if ($this->position_id != "") {
      $stmt->bindParam(':position_id', $this->position_id, PDO::PARAM_INT);
    } else {
      $stmt->bindParam(':position_id', $myvar, PDO::PARAM_NULL);
    }

    if ($stmt->execute()) {
      $this->person_id = $this->conn->lastInsertId();
      return true;
    }

    return false;
  }

  function delete()
  {
    $query = "DELETE FROM " . $this->table_name . "
                WHERE
                  person_id = :person_id";

    $stmt = $this->conn->prepare($query);

    $this->person_id = htmlspecialchars(strip_tags($this->person_id));

    $stmt->bindParam(':person_id', $this->person_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }
}
