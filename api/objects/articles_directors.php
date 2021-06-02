<?php
class Articles_directors
{
  private $conn;
  private $table_name = "articles_directors";

  public $article_id;
  public $director_id;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  // function create()
  // {
  //   $query = "INSERT INTO " . $this->table_name . "
  //               SET
  //                 article_id = :article_id";

  //   $stmt = $this->conn->prepare($query);

  //   $this->name = htmlspecialchars(strip_tags($this->name));

  //   $stmt->bindParam(':name', $this->name);

  //   if ($stmt->execute()) {
  //     return true;
  //   }

  //   return false;
  // }

  // function delete()
  // {
  //   $query = "DELETE FROM " . $this->table_name . "
  //               WHERE
  //                   country_id = :country_id";

  //   $stmt = $this->conn->prepare($query);

  //   $this->country_id = htmlspecialchars(strip_tags($this->country_id));

  //   $stmt->bindParam(':country_id', $this->country_id, PDO::PARAM_INT);

  //   if ($stmt->execute()) {
  //     return true;
  //   }

  //   return false;
  // }

  function read()
  {
    $query = "SELECT
              p.surname, p.name as person_name, p.patronymic, pos.name as position_name
          FROM
              " . $this->table_name . " ad
              LEFT JOIN
              persons p
                  ON p.person_id = ad.director_id
              LEFT JOIN
              positions pos
                  ON pos.position_id = p.position_id
            WHERE article_id = :article_id";


    $stmt = $this->conn->prepare($query);

    $this->article_id = htmlspecialchars(strip_tags($this->article_id));

    $stmt->bindParam(':article_id', $this->article_id, PDO::PARAM_INT);

    $stmt->execute();

    return $stmt;
  }
}
