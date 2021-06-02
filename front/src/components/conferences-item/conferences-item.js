import React from 'react';
import { Col, FlexboxGrid, Panel, Row } from 'rsuite';

import './conferences-item.css';

const ConferencesItem = props => {
  const { conference_name, logo_filename, event_name, registration_end, start_date, end_date, organization_name } = props;

  return (
    // <Panel {...props} header={conference_name} className="conferences-item">
    <Panel {...props} className="conferences-item">
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={4}>
          <img className="conference-logo" src={`/data/images/${logo_filename}`} alt="" />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={19}>
          <h5>{event_name}</h5>
          <Row className="show-grid">
            <Col xs={6}>
              <p>Дата проведения:</p>
              <p>
                {start_date} - {end_date}
              </p>
            </Col>
            <Col xs={6}>
              <p>Дата окончания регистрации:</p>
              <p>{registration_end}</p>
            </Col>
          </Row>
          <div>
            <p>Место проведения:</p>
            <p>{organization_name}</p>
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  );
};

export default ConferencesItem;

{
  /* <p>
            Дата проведения: {start_date} - {end_date}
          </p>
          <p>Регистрация доступна до: {registration_end}</p>
          <p>Название вуза: {organization_name}</p> */
}
