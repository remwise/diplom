import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, Header, Container, Content, Loader, Icon, FlexboxGrid, Col } from 'rsuite';
import { getCookie } from './utils/cookies';

import AppFooter from './components/app-footer';

import 'rsuite/dist/styles/rsuite-default.css';
import './app.css';

import useRoutes from './utils/hoc/use-routes';

import { getStore } from './stores/user';

const store = getStore();

const App = observer(() => {
  useEffect(() => {
    store.getUser();
  }, []);

  if (store.loading || (!store.user && getCookie('token'))) return <Loader center size="lg" />;

  const routes = useRoutes(store.user);

  const admin =
    store.isAuthenticated && Number(store.user['role_id']) === 2 ? (
      <Link to="/admin">
        <Dropdown.Item componentClass="span" className="dropdown">
          Админ панель
        </Dropdown.Item>
      </Link>
    ) : null;

  const loginNav = store.isAuthenticated ? (
    <Nav pullRight>
      <Dropdown title={store.user.name} trigger="click" placement="bottomEnd" icon={<Icon size="lg" icon="user" />}>
        <Link to="/user">
          <Dropdown.Item componentClass="span" className="dropdown">
            Личный кабинет
          </Dropdown.Item>
        </Link>
        {admin}
        <Link to="/conference/create/">
          <Dropdown.Item componentClass="span" className="dropdown">
            Создать конференцию
          </Dropdown.Item>
        </Link>

        <Dropdown.Item className="dropdown" onSelect={() => store.logout()}>
          Выход
        </Dropdown.Item>
      </Dropdown>
    </Nav>
  ) : (
    <Nav pullRight>
      <Link to="/register">
        <Nav.Item componentClass="span" className="menu-links">
          Регистрация
        </Nav.Item>
      </Link>
      <Link to="/login">
        <Nav.Item componentClass="span" className="menu-links">
          Вход
        </Nav.Item>
      </Link>
    </Nav>
  );

  return (
    <Router>
      <Container>
        <Header>
          <Navbar appearance="inverse">
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item componentClass={Col} lg={20} md={20} sm={24} xs={12} colspan={20}>
                <Navbar.Header>
                  <Link to="/" className="navbar-brand">
                    Ползунов
                  </Link>
                </Navbar.Header>
                <Navbar.Body>
                  <Nav>
                    <Link to="/conferences/">
                      <Nav.Item componentClass="span" icon={<Icon size="lg" icon="mortar-board" />}>
                        Конференции
                      </Nav.Item>
                    </Link>
                  </Nav>
                  {loginNav}
                </Navbar.Body>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Navbar>
        </Header>
        <Content className="app_component">
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={20}>{routes}</FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
        <AppFooter />
      </Container>
    </Router>
  );
});

export default App;
