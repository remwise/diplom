import React from 'react';
import { FlexboxGrid, Panel } from 'rsuite';

import './conferences-item.css';

const ConferencesItem = props => {
  const { title, imgURL, registerDate, eventDate, universityName } = props;

  return (
    <Panel {...props} header={title} className="conferences-item">
      <p>Дата проведения: {eventDate}</p>
      <p>Дата регистрации: {registerDate}</p>
      <p>Название вуза: {universityName}</p>
    </Panel>
    // <Panel shaded bordered bodyFill className="conferences-item">
    //   <img className="conference-logo" src={imgURL} />
    //   <Panel header={title}>
    //     <p>Дата проведения: {eventDate}</p>
    //     <p>Дата регистрации: {registerDate}</p>
    //     <p>Название вуза: {universityName}</p>
    //   </Panel>
    // </Panel>
    // <Panel bordered header={title}>
    //   <FlexboxGrid>
    //     <FlexboxGrid.Item colspan={3}>
    //       <img className="conference-logo" src={imgURL} alt="" />
    //     </FlexboxGrid.Item>
    //     <FlexboxGrid.Item colspan={9}>
    //       <span>Дата проведения: {eventDate}</span>
    //       <span>Дата регистрации: {registerDate}</span>
    //       <span>Название вуза: {universityName}</span>
    //     </FlexboxGrid.Item>
    //   </FlexboxGrid>
    // </Panel>
  );
};

export default ConferencesItem;
