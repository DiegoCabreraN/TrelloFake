import React from 'react';
import {
  Button,
  Modal,
  Dropdown,
  ButtonGroup,
  DropdownButton,
} from 'react-bootstrap';
import axios from 'axios';
import host from '../config';

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

class Task extends React.Component {
  constructor(props) {
    super(props);
    const { tasks, availableColumns } = this.props;
    this.state = {
      show: false,
      Description: tasks.description,
      actualColumnId: tasks.columnId,
      actualColumn: availableColumns.find((item) => item._id === tasks.columnId).name,
    };
    this.tasks = [];
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { tasks, updateTask } = this.props;
    const { actualColumnId, Description } = this.state;
    const config = {
      method: 'POST',
      url: `${host}/updateTask/`,
      data: {
        id: tasks._id,
        columnId: actualColumnId,
        newDescription: Description,
      },
    };
    axios(config).then((res) => {
      const newState = {
        columns: res.data,
        show: false,
      };
      this.setState(newState);
      updateTask(e);
      this.setState({ show: false });
    });
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  handleChange(e) {
    this.setState({ Description: e.target.value });
  }

  render() {
    const {
      tasks,
      availableColumns,
      columnId,
      board,
      removeTask,
    } = this.props;
    const { show, Description, actualColumn } = this.state;
    return (
      <div key={tasks._id} className="task">
        <Button variant="dark" className="task-description" onClick={this.showModal}>{tasks.description}</Button>
        <Modal centered show={show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.handleSubmit}>
            <Modal.Body>
              <label htmlFor="description">
                <div className="input-label">Description:</div>
                <input
                  id="description"
                  type="text"
                  name="Description"
                  value={Description}
                  onChange={this.handleChange}
                  className="textBox"
                />
              </label>
              <label htmlFor="column">
                <div className="input-label">Column:</div>
                <DropdownButton
                  id="column"
                  as={ButtonGroup}
                  variant="secondary"
                  title={actualColumn}
                  className="column-dropdown"
                >
                  {
                    availableColumns.map((elem) => (
                      <Dropdown.Item
                        key={elem._id}
                        onClick={() => this.setState({
                          actualColumnId: elem._id,
                          actualColumn: elem.name,
                        })}
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
        <div className="buttonContainer">
          <Button
            variant="danger"
            className="close-btn"
            onClick={() => removeTask(tasks._id, columnId, board)}
          >
            ⨯
          </Button>
        </div>
      </div>
    );
  }
}

export default Task;
