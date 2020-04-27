import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import {MediaProvider} from './contexts/MediaContext';
import {Container} from '@material-ui/core';
import Upload from './views/Upload';
import MyFiles from './views/MyFiles';
import Home from './views/Home';
import Login from './views/Login';
import Logout from './views/Logout';
import Modify from './views/Modify';
import Single from './views/Single';

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
              <Route path="/single/:id" component={Single} />
              <Route path="/logout" component={Logout} />
              <Route path="/myfiles" component={MyFiles}/>
              <Route path="/upload" component={Upload} />
              <Route path="/modify/:id" component={Modify} />
            </Switch>
          </main>
        </Container>
      </MediaProvider>
    </Router>
  );
};

export default App;

