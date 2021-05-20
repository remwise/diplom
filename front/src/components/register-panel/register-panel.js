import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Panel, Form, Button, Schema, InputPicker, DatePicker } from 'rsuite';

import { passwordValidate, phoneValidate } from '../../utils/validators';
import TextField from '../text-field';

// import { getStore } from '../../stores/auth';

// const store = getStore();

const { StringType, DateType } = Schema.Types;

const model = Schema.Model({
  email: StringType().isRequired('Введите email').isEmail('Введите корректный email'),
  name: StringType().isRequired('Введите имя'),
  surname: StringType().isRequired('Введите фамилию'),
  patronymic: StringType(),
  phone: StringType().addRule(value => phoneValidate(value), 'Введите корректный номер телефона'),
  university: StringType(),
  sex: StringType().isRequired('Выберите пол'),
  birthDate: DateType()
    .isRequired('Выберите дату рождения')
    .max(new Date(), 'Дата рождения не может быть позже сегодняшнего дня'),
  password: StringType()
    .isRequired('Введите пароль')
    .minLength(8, 'Минимальная длина пароля 8 символов')
    .addRule(value => passwordValidate(value), 'Пароль должен состоять из букв и цифр'),
});

const RegisterPanel = observer(() => {
  const form = useRef(null);

  const [formValue, setFormValue] = useState({
    birthDate: null,
    email: '',
    name: '',
    password: '',
    patronymic: '',
    phone: '',
    sex: '',
    surname: '',
    university: '',
  });

  const submitForm = () => {
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }
    console.log(formValue);
  };

  return (
    <Panel header={<h3>Регистрация</h3>} bordered>
      {/* <Form model={model} onSubmit={() => store.register(email, name, password)} fluid>    onChange={e => setEmail(e)} value={email} */}
      <Form ref={form} model={model} onChange={e => setFormValue(e)} formValue={formValue} onSubmit={submitForm}>
        <TextField required name="email" label="Email" type="email" />
        <TextField required name="surname" label="Фамилия" />
        <TextField required name="name" label="Имя" />
        <TextField name="patronymic" label="Отчество" />
        <TextField
          name="phone"
          mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          label="Телефон"
          type="phone"
        />
        <TextField
          name="university"
          label="Универститет"
          placeholder="Выберите университет"
          accepter={InputPicker}
          data={[
            { label: 'Политех', value: 'altgtu' },
            { label: 'Агу', value: 'agu' },
          ]}
        />
        <TextField
          required
          name="sex"
          label="Пол"
          placeholder="Выберите пол"
          cleanable={false}
          accepter={InputPicker}
          data={[
            { label: 'Мужской', value: 'man' },
            { label: 'Женский', value: 'woman' },
          ]}
        />
        <TextField required name="birthDate" label="Дата рождения" accepter={DatePicker} />
        <TextField required name="password" label="Пароль" type="password" />
        <Button appearance="primary" type="submit">
          Зарегистрироваться
        </Button>
      </Form>
    </Panel>
  );
});

export default RegisterPanel;
