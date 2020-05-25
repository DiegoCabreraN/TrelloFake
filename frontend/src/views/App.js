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
  return (
    <BoardAdmin history = { props.history } session = {props.match.params.Session}/>
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
