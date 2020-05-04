import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import {MediaProvider} from './contexts/MediaContext';
import {Container} from '@material-ui/core';
import Upload from './views/Upload';
import UploadNewFeed from './views/UploadNewFeed';
import MyFiles from './views/MyFiles';
import MyFeeds from './views/MyFeeds';
import Home from './views/Home';
import Login from './views/Login';
import Logout from './views/Logout';
import Modify from './views/Modify';
import Single from './views/Single';
import NaapurustoFeed from './views/NaapurustoFeed';

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
              <Route path="/myfeeds" component={MyFeeds}/>
              <Route path="/naapurustofeed" component={NaapurustoFeed}/>
              <Route path="/upload" component={Upload} />
              <Route path="/uploadnewfeed" component={UploadNewFeed}/>
              <Route path="/modify/:id" component={Modify} />
            </Switch>
          </main>
        </Container>
      </MediaProvider>
    </Router>
  );
};

export default App;

