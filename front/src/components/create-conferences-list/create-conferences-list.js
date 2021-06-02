import React, { useEffect } from 'react';
import { getCookie } from '../../utils/cookies';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Row, Col } from 'rsuite';

import CreateConferencesItem from '../create-conferences-item';
import './create-conferences-list.css';

import { getStore as getConferenceStore } from '../../stores/conference';

const conferenceStore = getConferenceStore();

const CreateConferencesList = observer(() => {
  useEffect(() => {
    conferenceStore.getConferences({ jwt: getCookie('token') });
  }, []);

  const history = useHistory();

  let arr = conferenceStore.conferences;

  if (!arr || (arr && !arr.length))
    return (
      <div className="create-conferences-list-empty">
        <div>Конференции не найдены, создайте новую!</div>
      </div>
    );

  return (
    <Row className="create-conferences-list">
      {arr
        ? arr.map(el => {
            return (
              <Col onClick={() => history.push(el.conference_id)} key={el.conference_id} lg={6} md={12} sm={24}>
                <CreateConferencesItem {...el} />
              </Col>
            );
          })
        : ''}
    </Row>
  );
});

export default CreateConferencesList;
