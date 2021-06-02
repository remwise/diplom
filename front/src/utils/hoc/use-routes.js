import { Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from '../../routes/login-page';
import RegisterPage from '../../routes/register-page';
import ConferencesPage from '../../routes/conferences-page';
import HomePage from '../../routes/home-page';
import AdminPage from '../../routes/admin-page';
import UserPage from '../../routes/user-page';
import FeedbackPage from '../../routes/feedback-page';
import CreateConferencePage from '../../routes/create-conference-page';
import ConferencesDetails from '../../components/conferences-details';

const useRoutes = user => {
  if (user) {
    if (Number(user['role_id']) === 2) {
      return (
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/admin" component={AdminPage} exact />
          <Route path="/user" component={UserPage} exact />
          <Route path="/conferences/" component={ConferencesPage} exact />
          <Route path="/conference/create/" component={CreateConferencePage} exact />
          <Route path="/conference/create/:id" component={CreateConferencePage} exact />
          <Route path="/conferences/:id" component={ConferencesDetails} exact />
          <Route path="/feedback" component={FeedbackPage} exact />
          <Redirect to="/" />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/user" component={UserPage} exact />
          <Route path="/conferences/" component={ConferencesPage} exact />
          <Route path="/conference/create/" component={CreateConferencePage} exact />
          <Route path="/conference/create/:id" component={CreateConferencePage} exact />
          <Route path="/conferences/:id" component={ConferencesDetails} exact />
          <Route path="/feedback" component={FeedbackPage} exact />
          <Redirect to="/" />
        </Switch>
      );
    }
  } else {
    return (
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/conferences/" component={ConferencesPage} exact />
        <Route path="/conferences/:id" component={ConferencesDetails} exact />
        <Route path="/register" component={RegisterPage} exact />
        <Route path="/login" component={LoginPage} exact />
        {/* <Route path="/feedback" component={FeedbackPage} exact /> */}
        <Redirect to="/login" />
      </Switch>
    );
  }
};

export default useRoutes;

/* <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/admin" render={() => (store.user['role-id'] != 2 ? <Redirect to="/" /> : <AdminPage />)} exact />
              <Route path="/user" component={UserPage} exact />
              <Route path="/conferences/" component={ConferencesPage} exact />
              <Route path="/conferences/create" component={CreateConferencePage} exact />
              <Route path="/conferences/:id" component={ConferencesDetails} exact />
              <Route path="/register" render={() => (store.isAuthenticated ? <Redirect to="/" /> : <RegisterPage />)} exact />
              <Route path="/login" render={() => (store.isAuthenticated ? <Redirect to="/" /> : <LoginPage />)} exact />
              <Route path="/feedback" component={FeedbackPage} exact />
              <Redirect to="/" />
            </Switch> */
