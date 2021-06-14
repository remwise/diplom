<?php
class Digests
{
  private $conn;
  private $table_name = "digests";

  public $digest_id;
  public $publication_year;
  public $conference_id;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  function create()
  {
    $query = "INSERT INTO " . $this->table_name . "
                SET
                  conference_id = :conference_id,
                  publication_year = :publication_year";

    $stmt = $this->conn->prepare($query);

    $this->conference_id = htmlspecialchars(strip_tags($this->conference_id));
    $this->publication_year = htmlspecialchars(strip_tags($this->publication_year));

    $stmt->bindParam(':conference_id', $this->conference_id);
    $stmt->bindParam(':publication_year', $this->publication_year);

    if ($stmt->execute()) {
      $this->digest_id = $this->conn->lastInsertId();
      return true;
    }

    return false;
  }

  function delete()
  {
    $query = "DELETE FROM " . $this->table_name . "
                WHERE
                    digest_id = :digest_id";

    $stmt = $this->conn->prepare($query);

    $this->digest_id = htmlspecialchars(strip_tags($this->digest_id));

    $stmt->bindParam(':digest_id', $this->digest_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function read()
  {
    $query = "SELECT
              digest_id, publication_year, filename, conference_id
          FROM
              " . $this->table_name . "
          WHERE conference_id = :conference_id
            ORDER BY publication_year DESC";

    $stmt = $this->conn->prepare($query);

    $this->conference_id = htmlspecialchars(strip_tags($this->conference_id));

    $stmt->bindParam(':conference_id', $this->conference_id, PDO::PARAM_INT);

    $stmt->execute();

    return $stmt;
  }
}
