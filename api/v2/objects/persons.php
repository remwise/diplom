<!-- 
  public $surname;
  public $name;
  public $patronymic;
  public $position;

  $query = "INSERT INTO " . $this->table_name . "
                SET
                    email = :email,
                    surname = :surname,
                    name = :name,
                    patronymic = :patronymic,
                    phone = :phone,
                    university = :university,
                    sex = :sex,
                    birthDate = :birthDate,
                    password = :password"; 
                  
    $this->surname = htmlspecialchars(strip_tags($this->surname));
    $this->name = htmlspecialchars(strip_tags($this->name));
    $this->patronymic = htmlspecialchars(strip_tags($this->patronymic));
  
        $stmt->bindParam(':surname', $this->surname);
    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':patronymic', $this->patronymic);
  -->

<!-- $user->email = $data->email;
  $user->phone = isset($data->phone) ? $data->phone : "NULL";
  $user->password = $data->password;
  $user->birthday = $data->birthday;
  $user->sex = $data->sex;
  $user->address = isset($data->address) ? $data->address : "NULL";
  $user->city_id = isset($data->city_id) ? $data->city_id : "NULL";
  // $user->city_id = $data->city_id == "" ? $data->city_id : "NULL";

  $user->organization_id = $data->organization_id != "" ? $data->organization_id : "NULL";
  $user->person_id = $data->person_id;

  // echo $user->organization_id . "orgid"; -->