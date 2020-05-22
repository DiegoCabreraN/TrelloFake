import React from 'react';
import '../styles/App.css';
import {
  BoardAdmin,
  Board,
  Login,
  SignUp,
} from './index';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function Dashboard(props) {
  const boards = [{
    name: "Board1",
    id: 0,
    sessions: [1],
  },{
    name: "Board2",
    id: 1,
    sessions: [1],
  },{
    name: "Board3",
    id: 2,
    sessions: [1],
  },{
    name: "Board4",
    id: 3,
    sessions: [2],
  }];
  return (
    <BoardAdmin boards = { boards } history = { props.history } session = {props.match.params.Session}/>
  );
}
class App extends React.Component{
  render(){
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/Boards/:session/:BoardId" component={ Board }/>
            <Route path="/Dashboard/:Session" component={ Dashboard }/>
            <Route path="/SignUp" component={SignUp}/>
            <Route path="/" component={ Login }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
