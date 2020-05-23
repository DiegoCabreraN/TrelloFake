import React from 'react';
import { Button } from 'react-bootstrap';

class Task extends React.Component{
  render(){
    return(
      <div key={this.props.element.taskId.toString()} className="Task">
        <p>{this.props.element.description}</p>
        <div className="buttonContainer">
          <Button>✎</Button>
          <Button variant="danger">🗑</Button>
        </div>
      </div>
    );
  }
}

export default Task;
