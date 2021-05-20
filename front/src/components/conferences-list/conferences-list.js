import React from 'react';
import { PanelGroup, Row, Col } from 'rsuite';
import ConferencesItem from '../conferences-item';
import { useHistory } from 'react-router-dom';

const arr = [
  {
    id: 'fefff',
    title: 'Международная научно-техническая конференция "Измерение, контроль, информатизация"',
    imgURL: 'http://mca.altstu.ru/i/logor.gif',
    registerDate: '12.04.2012-12.04.2012',
    eventDate: '12.04.2012-12.04.2012',
    universityName: 'АлтГТУ им. И.И. Ползунова',
  },
  {
    id: 'sdfgsdf',
    title: 'Международная научно-техническая конференция "Измерение, контроль, информатизация"',
    imgURL: 'http://mca.altstu.ru/i/logor.gif',
    registerDate: '12.04.2012-12.04.2012',
    eventDate: '12.04.2012-12.04.2012',
    universityName: 'АлтГТУ им. И.И. Ползунова',
  },
  {
    id: '4cg54',
    title: 'Международная научно-техническая конференция "Измерение, контроль, информатизация"',
    imgURL: 'http://mca.altstu.ru/i/logor.gif',
    registerDate: '12.04.2012-12.04.2012',
    eventDate: '12.04.2012-12.04.2012',
    universityName: 'АлтГТУ им. И.И. Ползунова',
  },
  {
    id: 'srtcge42',
    title: 'Международная научно-техническая конференция "Измерение, контроль, информатизация"',
    imgURL: 'http://mca.altstu.ru/i/logor.gif',
    registerDate: '12.04.2012-12.04.2012',
    eventDate: '12.04.2012-12.04.2012',
    universityName: 'АлтГТУ им. И.И. Ползунова',
  },
  {
    id: 'sgerg3434',
    title: 'Международная научно-техническая конференция "Измерение, контроль, информатизация"',
    imgURL: 'http://mca.altstu.ru/i/logor.gif',
    registerDate: '12.04.2012-12.04.2012',
    eventDate: '12.04.2012-12.04.2012',
    universityName: 'АлтГТУ им. И.И. Ползунова',
  },
  {
    id: '5c6h546',
    title: 'Международная научно-техническая конференция "Измерение, контроль, информатизация"',
    imgURL: 'http://mca.altstu.ru/i/logor.gif',
    registerDate: '12.04.2012-12.04.2012',
    eventDate: '12.04.2012-12.04.2012',
    universityName: 'АлтГТУ им. И.И. Ползунова',
  },
  {
    id: 'ercth54tc',
    title: 'Международная научно-техническая конференция "Измерение, контроль, информатизация"',
    imgURL: 'http://mca.altstu.ru/i/logor.gif',
    registerDate: '12.04.2012-12.04.2012',
    eventDate: '12.04.2012-12.04.2012',
    universityName: 'АлтГТУ им. И.И. Ползунова',
  },
];

const ConferencesList = () => {
  const history = useHistory();
  return (
    <PanelGroup>
      {arr.map(el => {
        const { id, ...params } = el;
        return <ConferencesItem onClick={() => history.push(id)} key={id} {...params} />;
      })}
    </PanelGroup>
    // <Row gutter={16}>
    //   {arr.map(el => {
    //     return (
    //       <Col lg={6} md={12} sm={24}>
    //         <ConferencesItem {...el} />
    //       </Col>
    //     );
    //   })}
    // </Row>
  );
};

export default ConferencesList;
