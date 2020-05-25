import React from 'react';
import {
  Button,
  Modal,
  Dropdown,
  ButtonGroup,
  DropdownButton
} from 'react-bootstrap';
import axios from 'axios';
import host from '../config';

class Task extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      show: false,
      tasks: [],
      taskDescription: this.props.tasks.description,
      actualColumnId: this.props.tasks.columnId,
      actualColumn: this.props.availableColumns.find((item)=>item._id===this.props.tasks.columnId).name
    };
    this.tasks = [];
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  handleSubmit(e){
    e.preventDefault();
    const config = {
      method: 'POST',
      url: `${host}/updateTask/`,
      data: {
        id: this.props.tasks._id,
        columnId: this.state.actualColumnId,
        newDescription: this.state.taskDescription,
      },
    };
    axios(config).then(res =>{
      const newState = {
        columns: res.data,
        show: false,
      }
      this.setState(newState);
      this.props.updateTask(e);
      this.setState({show:false});
    });
  }
  showModal(){
    this.setState({show:true});
  };
  hideModal(e){
    this.setState({show:false});
  };
  handleChange(e) {

    this.setState({ taskDescription: e.target.value });
  };
  render(){
    return(
      <div key={this.props.tasks._id} className="task">
        <Button variant="dark" className="task-description" onClick={this.showModal}>{this.props.tasks.description}</Button>
        <Modal centered show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.handleSubmit}>
            <Modal.Body>
              <label>
                <div className="input-label">Description:</div>
                <input type="text"
                  name="taskDescription"
                  value={this.state.taskDescription}
                  onChange={this.handleChange}
                  className="textBox"
                />
              </label>
              <label>
                <div className="input-label">Column:</div>
                <DropdownButton
                  as={ButtonGroup}
                  variant="secondary"
                  title={this.state.actualColumn}
                  className="column-dropdown"
                >
                  {
                    this.props.availableColumns.map((elem)=>
                      <Dropdown.Item
                        key={elem._id}
                        onClick={()=>this.setState({actualColumnId:elem._id ,actualColumn:elem.name})}
                      >
                      {elem.name}
                      </Dropdown.Item>
                    )
                  }
                </DropdownButton>
              </label>
            </Modal.Body>
            <Modal.Footer>
              <input type="submit" value="Submit" className="btn btn-light"/>
            </Modal.Footer>
          </form>
        </Modal>
        <div className="buttonContainer">
          <Button variant="danger" className="close-btn" onClick={() => this.props.delTask(this.props.tasks._id,
                                                                    this.props.columnId,
                                                                     this.props.board)}>
          ⨯
          </Button>
        </div>
      </div>
    );
  }
}

export default Task;
