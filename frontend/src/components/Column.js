import React from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import Task from './Task';
import host from '../config';

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

class Column extends React.Component {
  constructor(props) {
    super(props);
    const { name } = this.props;
    this.state = {
      show: false,
      tasks: [],
      columnName: name,
    };
    this.tasks = [];
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.delTask = this.delTask.bind(this);
  }

  componentDidMount() {
    const { id, board } = this.props;
    const config = {
      method: 'POST',
      url: `${host}/get/task/`,
      data: {
        columnId: id,
        boardId: board,
      },
    };
    axios(config).then((res) => {
      this.setState({ tasks: res.data });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { columnName, taskDescription } = this.state;
    const { board, session, id } = this.props;
    const createConfig = {
      method: 'POST',
      url: `${host}/create/task/`,
      data: {
        description: taskDescription,
        colName: columnName,
        boardId: board,
        session,
      },
    };
    axios(createConfig).then(() => {
      const config = {
        method: 'POST',
        url: `${host}/get/task/`,
        data: {
          columnId: id,
          boardId: board,
        },
      };
      axios(config).then((res) => {
        const newState = {
          tasks: res.data,
          show: false,
        };
        this.setState(newState);
        window.location.reload();
      });
    });
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  searchTasks() {
    const { tasks } = this.state;
    const {
      board,
      id,
      availableColumns,
      updateTask,
    } = this.props;
    if (!tasks || tasks.length === 0) {
      return (
        <div className="task-not-found">
          There are no Tasks
        </div>
      );
    }
    const arr = tasks.map((task) => (
      <Task
        key={task._id}
        delTask={this.delTask}
        board={board}
        columnId={id}
        availableColumns={availableColumns}
        updateTask={updateTask}
        tasks={task}
      />
    ));
    return arr;
  }

  async delTask(id, columnId, board) {
    const config = {
      method: 'POST',
      url: `${host}/delete/task/`,
      data: {
        columnId,
        boardId: board,
        id,
      },
    };
    axios(config).then((res) => {
      this.setState({ tasks: res.data });
    });
  }

  render() {
    const {
      name,
      id,
      session,
      board,
      delColumn,
      availableColumns,
    } = this.props;
    const { show, columnName } = this.state;
    return (
      <div className="column-container">
        <div className="column">
          <div className="title">
            <p>{name}</p>
            <Button variant="danger" onClick={() => delColumn(id, session, board)}>🗑</Button>
          </div>
          <div className="tasks">
            {
              this.searchTasks()
            }
          </div>
          <div className="footer">
            <Button variant="primary" className="new-task-btn" onClick={this.showModal}>+</Button>
            <Modal centered show={show} onHide={this.hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>Create Task</Modal.Title>
              </Modal.Header>
              <form onSubmit={this.handleSubmit}>
                <Modal.Body>
                  <label htmlFor="task-name">
                    <div className="input-label">Task:</div>
                    <input
                      id="task-name"
                      type="text"
                      name="taskDescription"
                      value={this.taskDescription}
                      onChange={this.handleChange}
                      className="textBox"
                    />
                  </label>
                  <label htmlFor="column-name">
                    <div className="input-label">Column:</div>
                    <DropdownButton
                      id="column-name"
                      as={ButtonGroup}
                      variant="secondary"
                      title={columnName}
                      className="column-dropdown"
                    >
                      {
                        availableColumns.map((elem) => (
                          <Dropdown.Item
                            key={elem._id}
                            onClick={() => this.setState({ columnName: elem.name })}
                          >
                            {elem.name}
                          </Dropdown.Item>
                        ))
                      }
                    </DropdownButton>
                  </label>
                </Modal.Body>
                <Modal.Footer>
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-light"
                  />
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Column;
