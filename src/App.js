import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Login from './views/Login';
import Logout from './views/Logout';
import { MediaProvider } from './contexts/MediaContext';
import { Container } from '@material-ui/core';

const App = () => {
  return (
    // eslint-disable-next-line no-undef
    <Router basename={process.env.PUBLIC_URL}>
      <MediaProvider>
        <Container>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </Container>
      </MediaProvider>
    </Router>
  );
};

export default App;
