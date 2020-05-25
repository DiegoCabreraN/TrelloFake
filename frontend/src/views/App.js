import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import BoardAdmin from './BoardAdmin';
import Login from './Login';
import SignUp from './SignUp';
import Board from './Board';
import '../styles/App.css';

function Session() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/Boards/:session/:BoardId" component={Board} />
          <Route path="/Dashboard/:Session" component={BoardAdmin} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default Session;
