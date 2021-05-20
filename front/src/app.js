import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Loader, Navbar, Nav, Icon, Dropdown, Header, Container, Content, Footer } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import './app.css';
import LoginPage from './routes/login-page';
import RegisterPage from './routes/register-page';
import ConferencesPage from './routes/conference-page';

import ConferencesDetails from './components/conferences-details';

function App() {
  return (
    <Router>
      <div className="show-fake-browser navbar-page">
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
                    {/* <Nav.Item componentClass="span" className={authStore.authenticated ? 'menu-links' : 'invisible'}> */}
                    <Nav.Item componentClass="span">Научный календарь</Nav.Item>
                  </Link>
                </Nav>
                <Nav pullRight>
                  <Link to="/register">
                    <Nav.Item componentClass="span">Регистрация</Nav.Item>
                  </Link>
                  <Link to="/login">
                    <Nav.Item componentClass="span">Вход</Nav.Item>
                  </Link>
                  {/* <Dropdown title="Меню" trigger="click" className={authStore.authenticated ? '' : 'invisible'}> */}
                  <Dropdown title="Андрей" trigger="click" placement="bottomEnd">
                    <Link to="/lk">
                      {/* <Dropdown.Item className="dropdown" onSelect={() => userStore.logout()} /> */}
                      <Dropdown.Item componentClass="span" className="dropdown">
                        Личный кабинет
                      </Dropdown.Item>
                    </Link>

                    <Dropdown.Item className="dropdown">Выход</Dropdown.Item>
                  </Dropdown>
                </Nav>
              </Navbar.Body>
            </Navbar>
          </Header>
          <Content>
            <Switch>
              {/* <Route path="/" component={MainPage} exact />
              <Route path="/activities/:id" component={ActivityDetails} /> */}
              <Route path="/conferences/" component={ConferencesPage} exact />
              <Route path="/conferences/:id" component={ConferencesDetails} exact />
              <Route path="/register" component={RegisterPage} exact />
              <Route path="/login" component={LoginPage} exact />
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Container>
      </div>
    </Router>
  );
}

export default App;
