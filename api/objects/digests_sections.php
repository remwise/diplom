<?php
class Digests_sections
{
  private $conn;
  private $table_name = "digests_sections";

  public $digest_section_id;
  public $section_num;
  public $digest_id;
  public $section_id;
  public function __construct($db)
  {
    $this->conn = $db;
  }

  function create()
  {
    $query = "INSERT INTO " . $this->table_name . "
                SET
                    section_num = :section_num,
                    digest_id = :digest_id,
                    section_id = :section_id";

    $stmt = $this->conn->prepare($query);

    $this->section_num = htmlspecialchars(strip_tags($this->section_num));
    $this->digest_id = htmlspecialchars(strip_tags($this->digest_id));
    $this->section_id = htmlspecialchars(strip_tags($this->section_id));

    $stmt->bindParam(':section_num', $this->section_num);
    $stmt->bindParam(':digest_id', $this->digest_id);
    $stmt->bindParam(':section_id', $this->section_id);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function delete()
  {
    $query = "DELETE FROM " . $this->table_name . "
                WHERE
                    digest_section_id = :digest_section_id";

    $stmt = $this->conn->prepare($query);

    $this->digest_section_id = htmlspecialchars(strip_tags($this->digest_section_id));

    $stmt->bindParam(':digest_section_id', $this->digest_section_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function read_one()
  {
    $query = "SELECT
                dc.digest_section_id, dc.section_num, s.name
          FROM
              " . $this->table_name . " dc
                LEFT JOIN
                sections s
                    ON s.section_id = dc.section_id
              WHERE digest_id = :digest_id
                ORDER BY dc.section_num";

    $stmt = $this->conn->prepare($query);

    $this->digest_id = htmlspecialchars(strip_tags($this->digest_id));

    $stmt->bindParam(':digest_id', $this->digest_id);

    $stmt->execute();

    return $stmt;
  }
}
