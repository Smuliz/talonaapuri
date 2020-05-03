import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Login from './views/Login';
import Logout from './views/Logout';
import Profile from './views/Profile';
import AdminIlmoitukset from './views/AdminIlmoitukset';
import UploadIlmoitus from './views/UploadIlmoitus';
import { MediaProvider } from './contexts/MediaContext';
import { Container } from '@material-ui/core';

const App = () => {
  return (
    // eslint-disable-next-line no-undef
    <Router basename={process.env.PUBLIC_URL}>
      <MediaProvider>
        <Container maxWidth="md">
          <main>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/logout" component={Logout} />
            <Route path="/admin" component={AdminIlmoitukset} />
            <Route path="/uploadilmoitus" component={UploadIlmoitus} />
          </Switch>
          </main>
        </Container>
      </MediaProvider>
    </Router>
  );
};

export default App;
