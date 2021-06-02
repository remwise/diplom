<?php
class Articles
{
  private $conn;
  private $table_name = "articles";

  public $article_id;
  public $name;
  public $description;
  public $user_id;
  public $status_id;
  public $digest_section_id;
  public $payment_id;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  // function create()
  // {
  //   $query = "INSERT INTO " . $this->table_name . "
  //               SET
  //                   name = :name,
  //                   country_id = :country_id";

  //   $stmt = $this->conn->prepare($query);

  //   $this->name = htmlspecialchars(strip_tags($this->name));
  //   $this->country_id = htmlspecialchars(strip_tags($this->country_id));

  //   $stmt->bindParam(':name', $this->name);
  //   $stmt->bindParam(':country_id', $this->country_id);


  //   if ($stmt->execute()) {
  //     return true;
  //   }

  //   return false;
  // }

  // function delete()
  // {
  //   $query = "DELETE FROM " . $this->table_name . "
  //               WHERE
  //                   article_id = :article_id";

  //   $stmt = $this->conn->prepare($query);

  //   $this->article_id = htmlspecialchars(strip_tags($this->article_id));

  //   $stmt->bindParam(':article_id', $this->article_id, PDO::PARAM_INT);

  //   if ($stmt->execute()) {
  //     return true;
  //   }

  //   return false;
  // }

  // function read()
  // {
  //   $query = "SELECT
  //             ci.article_id, ci.name as article_name, co.name as country_name
  //         FROM
  //             " . $this->table_name . " ci
  //             LEFT JOIN
  //                 countries co
  //                     ON ci.country_id = co.country_id
  //         ORDER BY
  //             ci.name";

  //   $stmt = $this->conn->prepare($query);

  //   $stmt->execute();

  //   return $stmt;
  // }

  function read_one()
  {
    $query = "SELECT
              article_id, name as article_name, description, user_id, status_id, digest_section_id, payment_id
          FROM
              " . $this->table_name . "
              WHERE
                digest_section_id = :digest_section_id";

    $stmt = $this->conn->prepare($query);

    $this->digest_section_id = htmlspecialchars(strip_tags($this->digest_section_id));

    $stmt->bindParam(':digest_section_id', $this->digest_section_id, PDO::PARAM_INT);

    $stmt->execute();

    return $stmt;
  }
}
