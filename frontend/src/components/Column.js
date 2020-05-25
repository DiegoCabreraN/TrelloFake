import React from 'react';
import axios from 'axios';
import Task from './Task';
import {
  Button,
  Modal,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import host from '../config';

class Column extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      show: false,
      tasks: [],
      columnName: this.props.name,
    };
    this.tasks = [];
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  handleSubmit(e){
    e.preventDefault();
    const createConfig = {
      method: 'POST',
      url: `${host}/createTask/`,
      data: {
        description: this.state.taskDescription,
        colName: this.state.columnName,
        boardId: this.props.board,
        session: this.props.session,
      },
    };
    axios(createConfig).then(()=>{
      const config = {
        method: 'POST',
        url: `${host}/getTasks/`,
        data: {
          columnId: this.props.id,
          boardId: this.props.board,
        },
      };
      axios(config).then(res =>{
        const newState = {
          tasks: res.data,
          show: false,
        }
        this.setState(newState);
        window.location.reload();
      });
    });
  };
  showModal(){
    this.setState({show:true});
  };
  hideModal(e){
    this.setState({show:false});
  };
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount(){
    const config = {
      method: 'POST',
      url: `${host}/getTasks/`,
      data: {
        columnId: this.props.id,
        boardId: this.props.board,
      },
    };
    axios(config).then(res =>{
      this.setState({tasks: res.data});
    });
  };
  searchTasks(){
    if(!this.state.tasks || this.state.tasks.length === 0){
      return (
        <div className="task-not-found">
          There are no Tasks
        </div>
      );
    }
    const arr = this.state.tasks.map((task) =>
      <Task
        key={task._id}
        delTask={this.delTask.bind(this)}
        board={this.props.board}
        columnId={this.props.id}
        availableColumns = {this.props.availableColumns}
        updateTask = {this.props.updateTask}
        tasks={ task }
      />
    )
    return arr;
  }
  async delTask(id, columnId, board){
    const config = {
      method: 'POST',
      url: `${host}/deleteTask/`,
      data: {
        columnId: columnId,
        boardId: board,
        id: id,
      },
    };
    axios(config).then((res)=>{
      console.log(res);
      this.setState({tasks: res.data});
    });
  }

  render(){
    return(
    <div className="column-container">
      <div className="column">
        <div className="title">
          <p>{this.props.name}</p>
          <Button variant="danger" onClick={()=>this.props.delColumn(this.props.id, this.props.session, this.props.board)}>🗑</Button>
        </div>
        <div className="tasks">
        {
          this.searchTasks()
        }
        </div>
        <div className="footer">
          <Button variant="primary" className="new-task-btn" onClick={this.showModal}>+</Button>
          <Modal centered show={this.state.show} onHide={this.hideModal}>
            <Modal.Header closeButton>
              <Modal.Title>Create Task</Modal.Title>
            </Modal.Header>
            <form onSubmit={this.handleSubmit}>
              <Modal.Body>
                <label>
                  <div className="input-label">Task:</div>
                  <input type="text"
                    name="taskDescription"
                    value={this.taskDescription}
                    onChange={this.handleChange}
                    className="textBox"
                  />
                </label>
                <label>
                  <div className="input-label">Column:</div>
                  <DropdownButton
                    as={ButtonGroup}
                    variant="secondary"
                    title={this.state.columnName}
                    className="column-dropdown"
                  >
                    {
                      this.props.availableColumns.map((elem)=>
                        <Dropdown.Item
                          key={elem._id}
                          onClick={()=>this.setState({columnName: elem.name})}
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
        </div>
      </div>
    </div>);
  }
}

export default Column;
