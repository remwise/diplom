<?php
class Conferences_admins
{
  private $conn;
  private $table_name = "conferences_admins";

  public $conference_id;
  public $user_id;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  function create()
  {
    $query = "INSERT INTO " . $this->table_name . "
                SET
                    user_id = :user_id,
                    conference_id = :conference_id";

    $stmt = $this->conn->prepare($query);

    $this->user_id = htmlspecialchars(strip_tags($this->user_id));
    $this->conference_id = htmlspecialchars(strip_tags($this->conference_id));

    $stmt->bindParam(':user_id', $this->user_id, PDO::PARAM_INT);
    $stmt->bindParam(':conference_id', $this->conference_id, PDO::PARAM_INT);


    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function delete()
  {
    $query = "DELETE FROM " . $this->table_name . "
                WHERE
                    user_id = :user_id,
                    conference_id = :conference_id";

    $stmt = $this->conn->prepare($query);

    $this->user_id = htmlspecialchars(strip_tags($this->user_id));
    $this->conference_id = htmlspecialchars(strip_tags($this->conference_id));

    $stmt->bindParam(':user_id', $this->user_id, PDO::PARAM_INT);
    $stmt->bindParam(':conference_id', $this->conference_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function read()
  {
    $query = "SELECT
              conference_id, user_id
          FROM
              " . $this->table_name . " 
              WHERE user_id = :user_id";

    $stmt = $this->conn->prepare($query);

    $this->user_id = htmlspecialchars(strip_tags($this->user_id));

    $stmt->bindParam(":user_id", $this->user_id, PDO::PARAM_INT);

    $stmt->execute();

    return $stmt;
  }
}
