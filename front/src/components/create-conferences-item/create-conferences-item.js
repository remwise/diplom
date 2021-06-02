import React from 'react';
import { Panel, Progress, Icon, FlexboxGrid, Loader } from 'rsuite';

// import { getStore } from '../../stores/user';

import './create-conferences-item.css';

// const store = getStore();

const CreateConferencesItem = props => {
  // const { caption, text, users } = props;
  const { name, organization_name } = props;
  // const userData = users.find(item => item.username === store.user.username);

  // let percentage;

  // if (!userData) return <Loader />;

  // if (!userData.records.length) {
  //   percentage = 0;
  // } else {
  //   percentage = Number(userData.records[userData.records.length - 1].value);
  // }

  return (
    <Panel bordered header={name} className="create-conferences-item">
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={22}>
          <p>{organization_name}</p>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={2}>
          <Icon icon="peoples" />
          <span>2</span>
          {/* <span>{users.length}</span> */}
        </FlexboxGrid.Item>
      </FlexboxGrid>
      {/* <Line percent={percentage} /> */}
    </Panel>
  );
};

export default CreateConferencesItem;
