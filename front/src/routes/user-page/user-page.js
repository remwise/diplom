import React, { useState } from 'react';
import { FlexboxGrid, Content, Container, Sidebar, Navbar, Nav, Dropdown, Icon, Sidenav, Header } from 'rsuite';

import UserArticlesPanel from '../../components/user-articles-panel';
import NotificationsPanel from '../../components/notifications-panel';

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

const iconStyles = {
  width: 56,
  height: 56,
  lineHeight: '56px',
  textAlign: 'center',
};

const UserPage = () => {
  const [active, setActive] = useState('articles');

  const pages = active === 'articles' ? <UserArticlesPanel /> : <NotificationsPanel />;

  return (
    <Container>
      <Sidebar style={{ display: 'flex', flexDirection: 'column' }} width={260} collapsible>
        <Sidenav appearance="subtle" onSelect={e => setActive(e)}>
          <Sidenav.Body>
            <Nav activeKey={active}>
              <Nav.Item eventKey="articles" icon={<Icon icon="group" />}>
                Отправленные заявки
              </Nav.Item>
              <Nav.Item eventKey="notifications" icon={<Icon icon="magic" />}>
                Оповещения
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Sidebar>

      <Container>
        {pages}
        {/* <Header>
          <h2>Оповещения</h2>
        </Header>
        <Content>Контент</Content> */}
      </Container>
    </Container>
  );
};

export default UserPage;
