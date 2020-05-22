import React from 'react';
import {
  Nav,
  NavDropdown,
  Button,
} from 'react-bootstrap';
import { Column } from '../components'
import '../styles/board.scss';

const handleSelect = (eventKey) => alert(`selected ${eventKey}`);


class Board extends React.Component {
  constructor(props){
    super(props);

    if(this.props.history.location.state){
      this.columns = [{
        name: 'Pending',
        tasks: [],
        id: 0,
        boardId: 0,
        sessions: [1],
      },{
        name: 'Working On',
        tasks: [],
        id: 1,
        boardId: 0,
        sessions: [1],
      },{
        name: 'Done',
        tasks: [],
        id: 2,
        boardId: 0,
        sessions: [1],
      }]
      this.tasks = [{
        description: "Start",
        columnId: 0,
        taskId: 0,
        boardId: 0,
        sessions: [1],
      },{
        description: "asd",
        columnId: 0,
        taskId: 1,
        boardId: 0,
        sessions: [1],
      }]
      this.state = this.props.history.location.state;
      this.columns = this.columns.filter((column) => column.boardId === parseInt(this.state.board.id));
      this.tasks = this.tasks.filter((task) => task.boardId === parseInt(this.state.board.id));
    }
  }
  returnToAdmin(){
    this.props.history.push(`/Dashboard/${this.props.match.params.session}`);
  };
  searchColumns(columns, tasks){
    if(columns.length === 0){
      return (
        <p className="col-not-found">
          There are no Columns
        </p>
      );
    }
    const arr = columns.map((column) =>
      <Column key={column.id} name = {column.name} id = {column.id} tasks = {tasks.filter((task) => task.columnId === column.id)}/>
    )
    return arr;
  };
  validate(){
    if(this.state && this.state.board.sessions.includes(parseInt(this.props.match.params.session))){
      return (
        <div className="board">
          <Nav className="justify-content-end top-bar" onSelect={handleSelect}>
            <Nav.Item className="return-button">
              <Button onClick={this.returnToAdmin.bind(this)}>{'<'}</Button>
            </Nav.Item>
            <NavDropdown title="Options" id="nav-dropdown">
              <NavDropdown.Item eventKey="LogOut" href="/Login">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button variant="secondary" className="add-button">+</Button>
          <div className="column-deck">
            {
              this.searchColumns(this.columns, this.tasks)
            }
          </div>
        </div>
      );
    }
    else{
      console.log(this.props)
      return(
        <div className="error-screen">There's been a mistake, please check your Session</div>
      );
    }
  }
  render(){
    return this.validate();
  }
}

export default Board;

