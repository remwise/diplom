<?php
class Users
{
  private $conn;
  private $table_name = "users";

  public $user_id;
  public $email;
  public $phone;
  public $password;
  public $birthday;
  public $sex;
  public $address;
  public $city_id;
  public $organization_id;
  public $person_id;
  public $role_id;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  function create()
  {
    $query = "INSERT INTO " . $this->table_name . "
                SET
                    email = :email,
                    phone = :phone,
                    password = :password,
                    birthday = :birthday,
                    sex = :sex,
                    city_id = :city_id,
                    organization_id = :organization_id,
                    person_id = :person_id";

    $stmt = $this->conn->prepare($query);

    $this->email = htmlspecialchars(strip_tags($this->email));
    $this->phone = htmlspecialchars(strip_tags($this->phone));
    $this->password = htmlspecialchars(strip_tags($this->password));
    $this->birthday = htmlspecialchars(strip_tags($this->birthday));
    $this->birthday = date('Y-m-d', strtotime($this->birthday));
    $this->sex = htmlspecialchars(strip_tags($this->sex));
    $this->city_id = htmlspecialchars(strip_tags($this->city_id));
    $this->organization_id = htmlspecialchars(strip_tags($this->organization_id));
    $this->person_id = htmlspecialchars(strip_tags($this->person_id));

    $myvar = NULL;

    $stmt->bindParam(':email', $this->email);

    if ($this->phone != "") {
      $stmt->bindParam(':phone', $this->phone, PDO::PARAM_INT);
    } else {
      $stmt->bindParam(':phone', $myvar, PDO::PARAM_NULL);
    }

    $stmt->bindParam(':birthday', $this->birthday);
    $stmt->bindParam(':sex', $this->sex);

    if ($this->city_id != "") {
      $stmt->bindParam(':city_id', $this->city_id, PDO::PARAM_INT);
    } else {
      $stmt->bindParam(':city_id', $myvar, PDO::PARAM_NULL);
    }

    if ($this->organization_id != "") {
      $stmt->bindParam(':organization_id', $this->organization_id, PDO::PARAM_INT);
    } else {
      $stmt->bindParam(':organization_id', $myvar, PDO::PARAM_NULL);
    }

    $stmt->bindParam(':person_id', $this->person_id, PDO::PARAM_INT);

    $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
    $stmt->bindParam(':password', $password_hash);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  function emailExists()
  {
    $query = "SELECT user_id, email, phone, birthday, sex, address, city_id, organization_id, person_id, role_id, password
          FROM " . $this->table_name . "
          WHERE email = :email
          LIMIT 0,1";

    $stmt = $this->conn->prepare($query);

    $this->email = htmlspecialchars(strip_tags($this->email));

    $stmt->bindParam(":email", $this->email);

    $stmt->execute();

    $num = $stmt->rowCount();

    if ($num > 0) {
      $row = $stmt->fetch(PDO::FETCH_ASSOC);

      $this->user_id = $row['user_id'];
      $this->email = $row['email'];
      $this->phone = $row['phone'];
      $this->password = $row['password'];
      $this->birthday = $row['birthday'];
      $this->sex = $row['sex'];
      $this->address = $row['address'];
      $this->city_id = $row['city_id'];
      $this->organization_id = $row['organization_id'];
      $this->person_id = $row['person_id'];
      $this->role_id = $row['role_id'];
      return true;
    }

    return false;
  }

  function read()
  {
    // $query = "SELECT u.user_id, u.email, u.phone, u.birthday, u.sex, u.address, u.city_id, u.organization_id, u.role_id, p.surname, p.name, p.patronymic, pos.name as position_name
    $query = "SELECT u.user_id, u.email, u.phone, u.birthday, u.sex, u.address, u.city_id, u.organization_id, u.role_id, p.surname, p.name as person_name, p.patronymic, pos.name as position_name
          FROM " . $this->table_name . " u
          LEFT JOIN
          persons p
              ON p.person_id = u.person_id
          LEFT JOIN
          positions pos
              ON pos.position_id = p.position_id
          WHERE user_id = :user_id
          LIMIT 0,1";

    $stmt = $this->conn->prepare($query);

    $this->user_id = htmlspecialchars(strip_tags($this->user_id));

    $stmt->bindParam(":user_id", $this->user_id);

    $stmt->execute();

    return $stmt;
  }

  // обновить запись пользователя 
  public function update()
  {

    // Если в HTML-форме был введен пароль (необходимо обновить пароль) 
    $password_set = !empty($this->password) ? ", password = :password" : "";

    // если не введен пароль - не обновлять пароль 
    $query = "UPDATE " . $this->table_name . "
          SET
              firstname = :firstname,
              lastname = :lastname,
              email = :email
              {$password_set}
          WHERE id = :id";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);

    // инъекция (очистка) 
    $this->firstname = htmlspecialchars(strip_tags($this->firstname));
    $this->lastname = htmlspecialchars(strip_tags($this->lastname));
    $this->email = htmlspecialchars(strip_tags($this->email));

    // привязываем значения с HTML формы 
    $stmt->bindParam(':firstname', $this->firstname);
    $stmt->bindParam(':lastname', $this->lastname);
    $stmt->bindParam(':email', $this->email);

    // метод password_hash () для защиты пароля пользователя в базе данных 
    if (!empty($this->password)) {
      $this->password = htmlspecialchars(strip_tags($this->password));
      $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
      $stmt->bindParam(':password', $password_hash);
    }

    // уникальный идентификатор записи для редактирования 
    $stmt->bindParam(':id', $this->id);

    // Если выполнение успешно, то информация о пользователе будет сохранена в базе данных 
    if ($stmt->execute()) {
      return true;
    }

    return false;
  }
}
