import React from 'react';
import '../styles/App.css';
import BoardAdmin from './BoardAdmin';
import Login from './Login';
import SignUp from './SignUp';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/Login">
            <Login />
          </Route>
          <Route path="/SignUp">
            <SignUp />
          </Route>
          <Route path="/Dashboard">
            <BoardAdmin />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
