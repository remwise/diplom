import React from 'react';
import { useParams } from 'react-router-dom';
import { PanelGroup, Row, Col } from 'rsuite';

const ConferencesDetails = () => {
  const params = useParams();
  const id = params.id;
  return (
    <div>
      <h1>ДЕТАЛИ КОНФЕРЕНЦИИ {id}</h1>
    </div>
  );
};

export default ConferencesDetails;
