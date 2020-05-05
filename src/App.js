import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Login from './views/Login';
import Logout from './views/Logout';
import Profile from './views/Profile';
import Single from './views/Single';
import Modify from './views/Modify';
import Upload from './views/Upload';
import UploadNewFeed from './views/UploadNewFeed';
import MyFiles from './views/MyFiles';
import MyFeeds from './views/MyFeeds';
import NaapurustoFeed from './views/NaapurustoFeed';
import ModifyIlmoitus from './views/ModifyIlmoitus';
import ModifyNaapurusto from './views/ModifyNaapurusto';
import AdminIlmoitukset from './views/AdminIlmoitukset';
import UploadIlmoitus from './views/UploadIlmoitus';
import SingleNaapurusto from './views/SingleNaapurusto';
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
            <Route path="/single/:id" component={Single} />
            <Route path="/admin" component={AdminIlmoitukset} />
            <Route path="/uploadilmoitus" component={UploadIlmoitus} />
            <Route path="/modify/:id" component={Modify} />
            <Route path="/modifyilmoitus/:id" component={ModifyIlmoitus} />
            <Route path="/modifynaapurusto/:id" component={ModifyNaapurusto} />
            <Route path="/myfiles" component={MyFiles}/>
            <Route path="/myfeeds" component={MyFeeds}/>
            <Route path="/naapurustofeed" component={NaapurustoFeed}/>
            <Route path="/upload" component={Upload} />
            <Route path="/uploadnewfeed" component={UploadNewFeed}/>
            <Route path="/singlenaapurusto/:id" component={SingleNaapurusto} />
          </Switch>
          </main>
        </Container>
      </MediaProvider>
    </Router>
  );
};






export default App;
