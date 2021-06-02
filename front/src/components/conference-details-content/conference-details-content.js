import React, { useEffect } from 'react';
import { FlexboxGrid, Loader, Panel, Timeline } from 'rsuite';
import { observer } from 'mobx-react-lite';

import EventDetails from '../event-details';

import './conference-details-content.css';

import { getStore as getEventStore } from '../../stores/event';
import DigestDetails from '../digest-details/digest-details';

const eventStore = getEventStore();

const ConferencesDetailsContent = observer(props => {
  const { active, conference_id } = props;

  useEffect(() => {
    eventStore.getEvent({ conference_id });
  }, []);

  if (!eventStore.event) return <Loader center size="lg" />;

  if (active === 'home') {
    return <EventDetails conference_id={conference_id} />;
  }

  return <DigestDetails active={active} />;
});

export default ConferencesDetailsContent;
