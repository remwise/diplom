<?php
class Feedbacks
{
  private $conn;
  private $table_name = "feedbacks";

  public $feedback_id;
  public $text;
  public $filename;
  public $user_id;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  function create()
  {
    $query = "INSERT INTO " . $this->table_name . "
                SET
                    text = :text,
                    filename = :filename,
                    user_id = :user_id";

    $stmt = $this->conn->prepare($query);

    $this->text = htmlspecialchars(strip_tags($this->text));
    $this->filename = htmlspecialchars(strip_tags($this->filename));
    $this->user_id = htmlspecialchars(strip_tags($this->user_id));

    $myvar = NULL;

    if ($this->filename != "") {
      $stmt->bindParam(':filename', $this->filename);
    } else {
      $stmt->bindParam(':filename', $myvar, PDO::PARAM_NULL);
    }

    $stmt->bindParam(':user_id', $this->user_id, PDO::PARAM_INT);
    $stmt->bindParam(':text', $this->text);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function delete()
  {
    $query = "DELETE FROM " . $this->table_name . "
                WHERE
                    feedback_id = :feedback_id";

    $stmt = $this->conn->prepare($query);

    $this->feedback_id = htmlspecialchars(strip_tags($this->feedback_id));

    $stmt->bindParam(':feedback_id', $this->feedback_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  // function read()
  // {
  //   $query = "SELECT
  //             feedback_id, name
  //         FROM
  //             " . $this->table_name . "
  //         ORDER BY
  //             name";

  //   $stmt = $this->conn->prepare($query);

  //   $stmt->execute();

  //   return $stmt;
  // }
}
