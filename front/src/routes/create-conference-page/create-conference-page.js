import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  IconButton,
  Icon,
  Modal,
  Button,
  ButtonToolbar,
  FormGroup,
  Form,
  InputPicker,
  DatePicker,
  DateRangePicker,
  Uploader,
} from 'rsuite';

import { getCookie } from '../../utils/cookies';

import CreateConferencesList from '../../components/create-conferences-list';
import TextField from '../../components/text-field';
import './create-conference-page.css';

import { getStore as getUserStore } from '../../stores/user';
import { getStore as getConferenceStore } from '../../stores/conference';
import { getStore as getInfoListStore } from '../../stores/info-list';

const infoListStore = getInfoListStore();
const userStore = getUserStore();
const conferenceStore = getConferenceStore();

const CreateConferencePage = () => {
  useEffect(() => {
    infoListStore.getOrganizations();
  }, []);

  const uploader = useRef(null);
  const [file, setFile] = useState([]);
  const [show, setShow] = useState(false);

  const [formValue, setFormValue] = useState({
    name: '',
    organization_id: '',
  });

  return (
    <div className="modal-container">
      <Container>
        <CreateConferencesList />
      </Container>
      <IconButton className="create-button" onClick={() => setShow(true)} size="lg" icon={<Icon icon="plus" />} circle />

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Создание новой конференции</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onChange={e => setFormValue(e)}
            formValue={formValue}
            onSubmit={async () => {
              uploader.current.start();
              await conferenceStore.createConference({
                ...formValue,
                user_id: userStore.user['user_id'],
              });
              await conferenceStore.getConferences({ jwt: getCookie('token') });
            }}
            // fluid
          >
            <TextField required name="name" label="Введите название конференции" />
            <TextField required name="event_name" label="Введите название события" />
            <Uploader
              className="uploader"
              accept="image/*"
              ref={uploader}
              autoUpload={false}
              listType="picture-text"
              action="/api/files/upload.php"
              name="logo_filename"
              onChange={file => setFile(file)}
              disabled={Boolean(file.length)}
            >
              <Button>Загрузить логотип</Button>
            </Uploader>
            <TextField
              name="organization_id"
              label="Организация"
              placeholder="Выберите организацию"
              accepter={InputPicker}
              data={infoListStore.organizations}
            />
            <TextField
              name="register_date"
              label="Дата окончания регистрации"
              placement="topStart"
              format="DD.MM.YYYY HH:mm"
              accepter={DatePicker}
            />
            <TextField name="event_date" label="Дата проведения" placement="topStart" accepter={DateRangePicker} />
            <TextField rows={5} name="about" componentClass="textarea" label="О мероприятии" />
            <TextField rows={5} name="contacts" componentClass="textarea" label="Контактная информация" />
            <TextField rows={5} name="price" componentClass="textarea" label="Стоимость участия" />
            <FormGroup>
              <ButtonToolbar>
                <Button type="submit" onClick={() => setShow(false)} appearance="primary">
                  Создать
                </Button>
                <Button onClick={() => setShow(false)}>Закрыть</Button>
              </ButtonToolbar>
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateConferencePage;
