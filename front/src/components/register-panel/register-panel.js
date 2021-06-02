import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Panel, Form, Button, Schema, InputPicker, DatePicker } from 'rsuite';

import { passwordValidate, phoneValidate } from '../../utils/validators';
import TextField from '../text-field';

import { getStore as getUserStore } from '../../stores/user';
import { getStore as getInfoListStore } from '../../stores/info-list';

const userStore = getUserStore();
const infoListStore = getInfoListStore();

const { StringType, DateType, NumberType } = Schema.Types;

const model = Schema.Model({
  email: StringType().isRequired('Введите email').isEmail('Введите корректный email'),
  name: StringType().isRequired('Введите имя'),
  surname: StringType().isRequired('Введите фамилию'),
  patronymic: StringType(),
  position_id: NumberType(),
  city_id: NumberType(),
  organization_id: NumberType(),
  address: StringType(),
  phone: StringType().addRule(value => phoneValidate(value), 'Введите корректный номер телефона'),
  sex: StringType().isRequired('Выберите пол'),
  birthday: DateType().max(new Date(), 'Дата рождения не может быть позже сегодняшнего дня'),
  password: StringType()
    .isRequired('Введите пароль')
    .minLength(8, 'Минимальная длина пароля 8 символов')
    .addRule(value => passwordValidate(value), 'Пароль должен состоять из букв и цифр'),
});

const RegisterPanel = observer(() => {
  useEffect(() => {
    infoListStore.getInfoLists();
  }, []);

  const form = useRef(null);

  const [formValue, setFormValue] = useState({
    birthday: null,
    email: '',
    name: '',
    password: '',
    patronymic: '',
    phone: '',
    sex: '',
    surname: '',
    organization_id: '',
    position_id: '',
    city_id: '',
    address: '',
  });

  const submitForm = () => {
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }
    userStore.register(formValue);
  };

  return (
    <Panel header={<h3>Регистрация</h3>} bordered>
      <Form
        ref={form}
        model={model}
        onChange={e => setFormValue(e)}
        formValue={formValue}
        onSubmit={submitForm}
        // style={{ margin: '0 auto', width: '350px' }}
      >
        <TextField required name="email" label="Email" type="email" />
        <TextField required name="surname" label="Фамилия" />
        <TextField required name="name" label="Имя" />
        <TextField name="patronymic" label="Отчество" />
        <TextField
          name="phone"
          // mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          label="Телефон"
          type="phone"
        />
        <TextField name="city_id" label="Город" placeholder="Выберите город" accepter={InputPicker} data={infoListStore.cities} />
        <TextField name="address" label="Адрес" />
        <TextField
          name="organization_id"
          label="Организация"
          placeholder="Выберите организацию"
          accepter={InputPicker}
          data={infoListStore.organizations}
        />
        <TextField
          name="position_id"
          label="Должность"
          placeholder="Выберите должность"
          accepter={InputPicker}
          data={infoListStore.positions}
        />
        <TextField
          required
          name="sex"
          label="Пол"
          placeholder="Выберите пол"
          cleanable={false}
          accepter={InputPicker}
          data={[
            { label: 'Мужской', value: 'm' },
            { label: 'Женский', value: 'w' },
          ]}
        />
        <TextField name="birthday" label="Дата рождения" placement="topStart" accepter={DatePicker} />
        <TextField required name="password" label="Пароль" type="password" />
        <Button appearance="primary" type="submit">
          Зарегистрироваться
        </Button>
      </Form>
    </Panel>
  );
});

export default RegisterPanel;
