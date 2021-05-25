import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';

import { ButtonToolbar, Panel, Form, FormGroup, Button, Schema } from 'rsuite';

import TextField from '../../components/text-field';

import { getStore } from '../../stores/user';

const store = getStore();

const { StringType } = Schema.Types;

const model = Schema.Model({
  email: StringType().isRequired('Введите email').isEmail('Введите корректный email'),
  password: StringType().isRequired('Введите пароль'),
});

const LoginPanel = observer(() => {
  const form = useRef(null);
  const history = useHistory();

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const submitForm = () => {
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }
    store.login(formValue);
  };

  return (
    <Panel header={<h3>Авторизация</h3>} bordered>
      {/* <Form model={model} onSubmit={() => store.login(email, password)} fluid> */}
      <Form ref={form} model={model} onChange={e => setFormValue(e)} formValue={formValue} onSubmit={submitForm} fluid>
        <TextField label="Email" name="email" type="email" />
        <TextField label="Пароль" name="password" type="password" />
        <FormGroup>
          <ButtonToolbar>
            <Button type="submit" appearance="primary">
              Войти
            </Button>
            <Button appearance="link" onClick={() => history.push('/register')}>
              {/* Добавить функционал */}
              Забыли пароль?
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </Panel>
  );
});

export default LoginPanel;
