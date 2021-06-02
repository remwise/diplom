<?php
class Events
{
  private $conn;
  private $table_name = "events";

  public $event_id;
  public $name;
  public $logo_filename;
  public $registration_end;
  public $start_date;
  public $end_date;
  public $about;
  public $contacts;
  public $price;
  public $conference_id;


  public function __construct($db)
  {
    $this->conn = $db;
  }

  function create()
  {
    $query = "INSERT INTO " . $this->table_name . "
                SET
                    name = :name,
                    logo_filename = :logo_filename,
                    registration_end = :registration_end,
                    start_date = :start_date,
                    end_date = :end_date,
                    about = :about,
                    contacts = :contacts,
                    price = :price,
                    conference_id = :conference_id";

    $stmt = $this->conn->prepare($query);

    $this->name = htmlspecialchars(strip_tags($this->name));
    $this->logo_filename = htmlspecialchars(strip_tags($this->logo_filename));
    $this->registration_end = htmlspecialchars(strip_tags($this->registration_end));
    $this->start_date = htmlspecialchars(strip_tags($this->start_date));
    $this->end_date = htmlspecialchars(strip_tags($this->end_date));
    $this->about = htmlspecialchars(strip_tags($this->about));
    $this->contacts = htmlspecialchars(strip_tags($this->contacts));
    $this->price = htmlspecialchars(strip_tags($this->price));
    $this->conference_id = htmlspecialchars(strip_tags($this->conference_id));

    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':logo_filename', $this->logo_filename);
    $stmt->bindParam(':registration_end', $this->registration_end);
    $stmt->bindParam(':start_date', $this->start_date);
    $stmt->bindParam(':end_date', $this->end_date);
    $stmt->bindParam(':about', $this->about);
    $stmt->bindParam(':contacts', $this->contacts);
    $stmt->bindParam(':price', $this->price);
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
                    event_id = :event_id";

    $stmt = $this->conn->prepare($query);

    $this->event_id = htmlspecialchars(strip_tags($this->event_id));

    $stmt->bindParam(':event_id', $this->event_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function read()
  {
    $query = "SELECT
              c.conference_id, e.event_id, e.name as event_name, c.name as conference_name, e.logo_filename, e.registration_end,
              e.start_date, e.end_date, e.about, e.contacts, e.price, o.name as organization_name
          FROM
              " . $this->table_name . " e
                LEFT JOIN
                conferences c
                    ON c.conference_id = e.conference_id
                LEFT JOIN
                organizations o
                    ON o.organization_id = c.organization_id";

    $stmt = $this->conn->prepare($query);

    $stmt->execute();

    return $stmt;
  }

  function read_one()
  {
    $query = "SELECT
              event_id, name, logo_filename, registration_end, start_date, end_date, about, contacts, price, conference_id
          FROM
              " . $this->table_name . "
              WHERE conference_id = :conference_id";

    $stmt = $this->conn->prepare($query);

    $this->conference_id = htmlspecialchars(strip_tags($this->conference_id));

    $stmt->bindParam(':conference_id', $this->conference_id, PDO::PARAM_INT);

    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->event_id = $row['event_id'];
    $this->name = $row['name'];
    $this->logo_filename = $row['logo_filename'];
    $this->registration_end = $row['registration_end'];
    $this->start_date = $row['start_date'];
    $this->end_date = $row['end_date'];
    $this->about = $row['about'];
    $this->contacts = $row['contacts'];
    $this->price = $row['price'];
    $this->conference_id = $row['conference_id'];

    return $stmt;
  }
}
