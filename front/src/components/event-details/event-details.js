import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Col,
  FlexboxGrid,
  Form,
  FormGroup,
  Icon,
  IconButton,
  InputPicker,
  Modal,
  Row,
  Timeline,
  Uploader,
} from 'rsuite';
import { observer } from 'mobx-react-lite';

import TextField from '../text-field';

import './event-details.css';

import { getStore as getEventStore } from '../../stores/event';

const eventStore = getEventStore();

const EventDetails = observer(({ conference_id }) => {
  useEffect(() => {
    eventStore.getEvent({ conference_id });
  }, []);

  const uploader = useRef(null);
  const [file, setFile] = useState([]);
  const [show, setShow] = useState(false);
  const [directorsCounter, setDirectorsCounter] = useState(1);
  const [collaboratorsCounter, setCollaboratorsCounter] = useState(1);

  const { event_id, name, logo_filename, registration_end, start_date, end_date, about, contacts, price, program, files } =
    eventStore.event;

  const timline = program.map(el => {
    return (
      <Timeline.Item key={el.program_id}>
        <p>{el.date}</p>
        <p>{el.text}</p>
      </Timeline.Item>
    );
  });

  const fileList = files.map(el => {
    return (
      <a key={el.file_id} href={`/files/file-${event_id}.pdf`}>
        {el.name}
      </a>
    );
  });

  const modal = (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header>
        <Modal.Title>Создание новой конференции</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
        // onChange={e => setFormValue(e)}
        // formValue={formValue}
        // onSubmit={async () => {
        //   uploader.current.start();
        //   await conferenceStore.createConference({
        //     ...formValue,
        //     user_id: userStore.user['user_id'],
        //   });
        //   await conferenceStore.getConferences({ jwt: getCookie('token') });
        // }}
        // fluid
        >
          <TextField required name="name" label="Название статьи" />
          <TextField
            name="section_id"
            label="Секция"
            placeholder="Выберите секцию"
            accepter={InputPicker}
            data={[
              { label: 'Секция 1', value: 'sec1' },
              { label: 'Секция 2', value: 'sec2' },
            ]}
          />
          <TextField rows={5} name="description" componentClass="textarea" label="Аннотация" />
          <TextField required name="pages_count" label="Количество страниц" type="number" />
          <Uploader
            className="uploader"
            ref={uploader}
            autoUpload={false}
            listType="text"
            action="/api/files/upload.php"
            name="filename"
            onChange={file => setFile(file)}
            disabled={Boolean(file.length)}
          >
            <Button>Загрузить статью</Button>
          </Uploader>

          <TextField
            label="Данные автора"
            value={'Комаров Андрей Владимирович, студент'}
            disabled
            style={{ marginBottom: '3px' }}
          />
          <TextField
            label="Организация"
            value={'Алтайский Государственный технический университет им. И.И. Ползунова'}
            disabled
            style={{ marginBottom: '3px' }}
          />
          <a style={{ display: 'block', marginBottom: '23px' }} href="/">
            Изменить в настройках профиля
          </a>

          {[...new Array(collaboratorsCounter)].map((el, index) => (
            <TextField key={`collaborator_${index}`} name={`collaborator_${index}`} label={`ФИО ${index + 1} соавтора`} />
          ))}
          <IconButton onClick={() => setCollaboratorsCounter(collaboratorsCounter + 1)} size="lg" icon={<Icon icon="plus" />} />
          <IconButton
            onClick={() => setCollaboratorsCounter(!collaboratorsCounter ? 0 : collaboratorsCounter - 1)}
            size="lg"
            icon={<Icon icon="minus" />}
          />

          {[...new Array(directorsCounter)].map((el, index) => (
            <TextField key={`director_${index}`} name={`director_${index}`} label={`ФИО ${index + 1} научного руководителя`} />
          ))}
          <IconButton onClick={() => setDirectorsCounter(directorsCounter + 1)} size="lg" icon={<Icon icon="plus" />} />
          <IconButton
            onClick={() => setDirectorsCounter(!directorsCounter ? 0 : directorsCounter - 1)}
            size="lg"
            icon={<Icon icon="minus" />}
          />
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
  );

  return (
    <div className="modal-container">
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={6}>
          <img className="conference-logo" src={`/data/images/${logo_filename}`} alt="" />
          <Timeline align="left">{timline}</Timeline>
          {/* <IconButton onClick={() => setShow(true)} size="lg" icon={<Icon icon="plus" />} /> */}
          <Button className="send-article-btn" onClick={() => setShow(true)}>
            Подать заявку
          </Button>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={17}>
          <h3>{name}</h3>
          <Row>
            <Col lg={8} md={10} xs={12}>
              <p>Дата проведения:</p>
              <p>
                {start_date} - {end_date}
              </p>
            </Col>
            <Col lg={8} md={10} xs={12}>
              <p>Регистрация открыта до: </p>
              <p>{registration_end}</p>
            </Col>
          </Row>

          <h4>О конференции:</h4>
          <p>{about}</p>
          <h4>Контакты:</h4>
          <p>{contacts}</p>
          <h4>Цена:</h4>
          <p>{price}</p>
          <h4>Файлы:</h4>
          <div>{fileList}</div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      {modal}
    </div>
  );
});

export default EventDetails;
