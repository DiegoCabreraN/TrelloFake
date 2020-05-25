import React from 'react';
import axios from 'axios';
import {
  Nav,
  NavDropdown,
  Button,
  Modal,
} from 'react-bootstrap';
import { Column } from '../components';
import '../styles/board.scss';
import host from '../config';

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const close = (session) => alert(`Closing Session ${session}`);


async function createColumn(name, boardId, session) {
  const config = {
    method: 'POST',
    url: `${host}/create/column/`,
    data: {
      name,
      boardId,
      session,
    },
  };
  const creationState = await axios(config);
  return creationState.data;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    const { history, match } = this.props;

    if (history.location.state) {
      this.state = {
        show: false,
        columnList: [],
      };
      this.columnList = [];
      this.taskList = [];
      this.BoardId = match.params.BoardId;
      this.Session = match.params.session;
      this.showModal = this.showModal.bind(this);
      this.hideModal = this.hideModal.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.removeColumn = this.removeColumn.bind(this);
      this.updateTask = this.updateTask.bind(this);
      this.returnToAdmin = this.returnToAdmin.bind(this);
    }
  }

  componentDidMount() {
    const config = {
      method: 'POST',
      url: `${host}/get/column/`,
      data: {
        session: this.Session,
        boardId: this.BoardId,
      },
    };
    axios(config).then((res) => {
      this.setState({ columnList: res.data });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { columnName } = this.state;
    createColumn(columnName, this.BoardId, this.Session).then(() => {
      const config = {
        method: 'POST',
        url: `${host}/get/column/`,
        data: {
          session: this.Session,
          boardId: this.BoardId,
        },
      };
      axios(config).then((res) => {
        const newState = {
          columnList: res.data,
          show: false,
        };
        this.setState(newState);
      });
    });
  }

  async updateTask() {
    const config = {
      method: 'POST',
      url: `${host}/get/column/`,
      data: {
        session: this.Session,
        boardId: this.BoardId,
      },
    };
    axios(config).then((res) => {
      this.setState({ columnList: res.data });
    });
    window.location.reload();
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

  returnToAdmin() {
    const { history, match } = this.props;
    history.push(`/Dashboard/${match.params.session}`);
  }

  async removeColumn(id, session, boardId) {
    const config = {
      method: 'POST',
      url: `${host}/delete/column/`,
      data: {
        session,
        boardId,
        id,
      },
    };
    const deleteState = await axios(config);
    this.setState({ columnList: deleteState.data });
    return deleteState.data;
  }

  searchColumns(columnsFound, tasks) {
    if (!columnsFound || columnsFound.length === 0) {
      return (
        <div className="col-not-found">
          There are no Columns
        </div>
      );
    }
    const arr = columnsFound.map((column) => {
      const { columnList } = this.state;
      return (
        <Column
          key={column._id}
          name={column.name}
          id={column._id}
          session={this.Session}
          board={this.BoardId}
          delColumn={this.removeColumn}
          availableColumns={columnList}
          updateTask={this.updateTask}
          tasks={tasks.filter((task) => task.columnId === column.id)}
        />
      );
    });
    return arr;
  }

  render() {
    const { history } = this.props;
    const { show, columnList } = this.state;
    if (history.location.state) {
      return (
        <div className="board">
          <Nav className="justify-content-end top-bar" onSelect={() => close(this.Session)}>
            <Nav.Item className="return-button">
              <Button onClick={this.returnToAdmin}>{'<'}</Button>
            </Nav.Item>
            <NavDropdown title="Options" id="nav-dropdown">
              <NavDropdown.Item eventKey="LogOut" href="/Login">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button variant="dark" className="add-button" onClick={this.showModal}>+</Button>
          <Modal centered show={show} onHide={this.hideModal}>
            <Modal.Header closeButton>
              <Modal.Title>Create Column</Modal.Title>
            </Modal.Header>
            <form onSubmit={this.handleSubmit}>
              <Modal.Body>
                <label htmlFor="column-name">
                  <div className="input-label">Column Name:</div>
                  <input
                    type="text"
                    id="column-name"
                    name="columnName"
                    value={this.newColumnName}
                    onChange={this.handleChange}
                    className="textBox"
                  />
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
          <div className="column-deck">
            {
              this.searchColumns(columnList, this.taskList)
            }
          </div>
        </div>
      );
    }
    return (
      <div className="error-screen">There`&apos;`s been a mistake, please check your Session</div>
    );
  }
}

export default Board;
