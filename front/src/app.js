import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Navbar, Nav, Dropdown, Header, Container, Content, Footer, Loader } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import './app.css';

import useRoutes from './utils/hoc/use-routes';

import { getStore } from './stores/user';

const store = getStore();

const App = observer(() => {
  useEffect(() => {
    store.getUser();
  }, []);

  if (store.loading) return <Loader center size="lg" />;

  const routes = useRoutes(store.user);

  const admin =
    store.isAuthenticated && store.user['role_id'] === 2 ? (
      <Link to="/admin">
        <Dropdown.Item componentClass="span" className="dropdown">
          Админ панель
        </Dropdown.Item>
      </Link>
    ) : null;

  const loginNav = store.isAuthenticated ? (
    <Nav pullRight>
      <Dropdown title="Андрей" trigger="click" placement="bottomEnd">
        <Link to="/user">
          <Dropdown.Item componentClass="span" className="dropdown">
            Личный кабинет
          </Dropdown.Item>
        </Link>
        {admin}
        <Link to="/conferences/create">
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
      <div className="navbar-page">
        <Container>
          <Header>
            <Navbar appearance="subtle">
              <Navbar.Header>
                <Link to="/" className="navbar-brand logo">
                  НАУЧНЫЙ САЙТ
                </Link>
              </Navbar.Header>
              <Navbar.Body>
                <Nav>
                  <Link to="/conferences/">
                    <Nav.Item componentClass="span">Научный календарь</Nav.Item>
                  </Link>
                </Nav>
                {loginNav}
              </Navbar.Body>
            </Navbar>
          </Header>
          <Content>{routes}</Content>
          <Footer>
            <Link to="/feedback">Обратная связь</Link>
          </Footer>
        </Container>
      </div>
    </Router>
  );
});

export default App;
