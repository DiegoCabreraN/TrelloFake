import React from 'react';
import axios from 'axios';
import {
  Nav,
  NavDropdown,
  Button,
  Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../styles/dashboard.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import host from '../config';

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
/* eslint react/forbid-prop-types: 0 */

const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

async function addBoard(state, session) {
  const config = {
    method: 'POST',
    url: `${host}/create/board/`,
    data: {
      name: state.boardName,
      session,
    },
  };
  const creationState = await axios(config);
  return creationState.data;
}

class BoardAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardName: '',
      show: false,
      boards: [],
    };
    const { match } = this.props;
    this.session = match.params.Session;
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setSelectedBoard = this.setSelectedBoard.bind(this);
  }

  componentDidMount() {
    const config = {
      method: 'POST',
      url: `${host}/get/board/`,
      data: {
        session: this.session,
      },
    };
    axios(config).then((res) => {
      this.setState({ boards: res.data });
    });
  }

  setSelectedBoard(e) {
    const { boards } = this.state;
    const { history } = this.props;
    const board = boards.find((item) => item.id === parseInt(e.target.value, 10));
    history.push({
      pathname: `/Boards/${this.session}/${e.target.value}`,
      state: {
        board,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    addBoard(this.state, this.session);
    this.setState({ show: false });
    this.componentDidMount();
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

  async delBoard(id) {
    const config = {
      method: 'POST',
      url: `${host}/delete/board`,
      data: {
        id,
      },
    };
    const deleteState = await axios(config);
    this.componentDidMount();
    return deleteState.data;
  }

  searchBoards() {
    const { boards } = this.state;
    if (!boards || boards.length === 0) {
      return (
        <div className="board-not-found">
          There are no Boards
        </div>
      );
    }
    const arr = boards.map((element) => (
      <div className="board" key={element._id}>
        <div>
          <p>{element.name}</p>
          <Button
            variant="dark"
            value={element._id}
            onClick={this.setSelectedBoard}
          >
            Open
          </Button>
          <Button
            variant="danger"
            onClick={() => this.delBoard(element._id)}
          >
            🗑
          </Button>
        </div>
      </div>
    ));
    return arr;
  }

  render() {
    const { show } = this.state;
    return (
      <div className="dashboard">
        <Nav className="justify-content-end top-bar" onSelect={handleSelect}>
          <NavDropdown title="Options" id="nav-dropdown">
            <NavDropdown.Item eventKey="LogOut" href="/Login">Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Button variant="dark" className="add-button" onClick={this.showModal}>+</Button>
        <Modal centered show={show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Board</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.handleSubmit}>
            <Modal.Body>
              <label htmlFor="board-name">
                <div className="input-label">Board Name:</div>
                <input
                  type="text"
                  id="board-name"
                  name="boardName"
                  value={this.newBoardName}
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
        <div className="board-deck">
          {
            this.searchBoards()
          }
        </div>
      </div>
    );
  }
}


BoardAdmin.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default BoardAdmin;
