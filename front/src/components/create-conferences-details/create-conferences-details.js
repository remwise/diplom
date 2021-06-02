import React from 'react';
import { Panel, Progress, Icon, FlexboxGrid, Loader } from 'rsuite';

import './create-conferences-details.css';

const CreateConferencesDetails = props => {
  const { name, organization_name } = props;

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

export default CreateConferencesDetails;
