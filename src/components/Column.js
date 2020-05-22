import React from 'react';
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
    <div className="column">
      <div>
        <p>{this.props.name}</p>
        {
          searchTasks(this.props)
        }
        <Button className="new-task-btn">New Task</Button>
      </div>
    </div>);
  }
}

export default Column;
