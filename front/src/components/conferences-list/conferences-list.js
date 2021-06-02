import React, { useEffect } from 'react';
import { PanelGroup, Row, Col, Loader } from 'rsuite';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import ConferencesItem from '../conferences-item';

import { getStore as getEventStore } from '../../stores/event';

const eventStore = getEventStore();

const ConferencesList = observer(() => {
  useEffect(() => {
    eventStore.getEvents();
  }, []);

  const history = useHistory();

  const events = eventStore.events;

  if (!events) return <Loader center size="lg" />;

  if (!events || (events && !events.length))
    return (
      <div className="create-conferences-list-empty">
        <div>Конференции не найдены</div>
      </div>
    );

  return (
    <PanelGroup>
      {events.map(el => {
        return <ConferencesItem onClick={() => history.push(el.conference_id)} key={el.conference_id} {...el} />;
      })}
    </PanelGroup>
  );
});

export default ConferencesList;
