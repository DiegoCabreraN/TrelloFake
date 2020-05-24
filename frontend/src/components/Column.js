import React from 'react';
import axios from 'axios';
import Task from './Task';
import { Button } from 'react-bootstrap';

function searchTasks(props){
  if(props.tasks.length === 0){
    return (
      <div className="task-not-found">
        There are no Tasks
      </div>
    );
  }
  const arr = props.tasks.map((task) =>
    <Task key={task.taskId.toString()} element={ task }/>
  )
  return arr;
}

class Column extends React.Component{

  render(){
    return(
    <div className="column-container">
      <div className="column">
        <div className="title">
          <p>{this.props.name}</p>
          <Button variant="danger" onClick={()=>this.props.delColumn(this.props.id, this.props.session, this.props.board)}>🗑</Button>
        </div>
        {
          searchTasks(this.props)
        }
        <Button className="new-task-btn">New Task</Button>
      </div>
    </div>);
  }
}

export default Column;
