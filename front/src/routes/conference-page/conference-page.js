import React from 'react';
import { FlexboxGrid, Content, Container } from 'rsuite';
import ConferencesList from '../../components/conferences-list';
import SearchPanel from '../../components/search-panel';

const ConferencesPage = () => {
  return (
    <div>
      <SearchPanel />
      <ConferencesList />
    </div>
  );
};

export default ConferencesPage;
