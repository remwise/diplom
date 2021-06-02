import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';

import { ButtonToolbar, Panel, Form, FormGroup, Button, Schema, Uploader } from 'rsuite';

import TextField from '../text-field';

import { getStore } from '../../stores/user';

const store = getStore();

const { StringType } = Schema.Types;

const model = Schema.Model({
  email: StringType().isRequired('Введите email').isEmail('Введите корректный email'),
  password: StringType().isRequired('Введите пароль'),
});

const FeedbackPanel = observer(() => {
  const form = useRef(null);
  const history = useHistory();

  const uploader = useRef(null);
  const [file, setFile] = useState([]);

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const submitForm = () => {
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }
    // store.login(formValue);
  };

  return (
    <Panel header={<h3>Обратная связь</h3>} bordered>
      <Form ref={form} model={model} onChange={e => setFormValue(e)} formValue={formValue} onSubmit={submitForm} fluid>
        <TextField rows={5} name="text" componentClass="textarea" label="О чем вы хотите рассказать?" />
        <Uploader
          className="uploader"
          ref={uploader}
          accept="image/*"
          multiple
          autoUpload={false}
          listType="picture-text"
          action="/api/files/upload.php"
          name="filename"
          onChange={file => setFile(file)}
        >
          <Button>Приложить скриншоты</Button>
        </Uploader>
        <FormGroup>
          <ButtonToolbar>
            <Button type="submit" appearance="primary">
              Отправить
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </Panel>
  );
});

export default FeedbackPanel;
