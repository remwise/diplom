import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PanelGroup, Row, Col, Loader, Nav, Icon, Timeline, FlexboxGrid } from 'rsuite';
import ConferencesDetailsContent from '../conference-details-content';
import ConferenceNav from '../conference-nav';

import './conferences-details.css';

import { getStore as getConferenceStore } from '../../stores/conference';

const conferenceStore = getConferenceStore();

// import { getStore as getActivityStore } from '../../stores/activities';
// import { getStore as getUserStore } from '../../stores/user';

// const activityStore = getActivityStore();
// const userStore = getUserStore();

const ConferencesDetails = observer(() => {
  const params = useParams();
  const id = params.id;

  const [active, setActive] = useState('home');

  useEffect(() => {
    conferenceStore.getConference({ conference_id: id });
  }, []);

  if (!conferenceStore.conference || !id) return <Loader center size="lg" />;

  const { name, organization_name } = conferenceStore.conference;

  return (
    <div>
      <h2>{name}</h2>
      <p>{organization_name}</p>
      <ConferenceNav appearance="tabs" active={active} onSelect={e => setActive(e)} conference_id={id} />
      <ConferencesDetailsContent conference_id={id} active={active} />
    </div>
  );
});

export default ConferencesDetails;
