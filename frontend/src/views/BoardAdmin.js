import React, { useState } from 'react';
import axios from 'axios';
import {
  Nav,
  NavDropdown,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import '../styles/dashboard.scss';
import 'bootstrap/dist/css/bootstrap.min.css';



const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

async function addBoard(state, session){
  console.log(state.boardName, session);
  const config = {
    method: 'POST',
    url: 'http://localhost:5000/createBoard/',
    data: {
      name: state.boardName,
      session: session,
    },
  };
  const creationState = await axios(config);
  return creationState.data;
}



class BoardAdmin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      boardName: '',
      show: false,
      boards: [],
    }
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    addBoard(this.state, this.props.session);
    this.setState({show:false});
  }
  showModal(){
    this.setState({show:true});
  };
  hideModal(e){
    this.setState({show:false});
  };
  setSelectedBoard(e){
    const board = this.state.boards.find(board => board.id === parseInt(e.target.value));
    this.props.history.push({
      pathname: `/Boards/${this.props.session}/${e.target.value}`,
      state: {
        board: board,
      },
    });
  };
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount(){
    const session = this.props.session;
    const config = {
      method: 'POST',
      url: 'http://localhost:5000/getBoard/',
      data: {
        session: session,
      },
    };
    axios(config).then(res =>{
      this.setState({boards: res.data});
    });


  }
  async delBoard(id){
    const config = {
      method: 'POST',
      url: 'http://localhost:5000/deleteBoard/',
      data: {
        id: id,
      },
    };
    const deleteState = await axios(config);
    this.componentDidMount();
    return deleteState.data;
  }

  render(){
    return (
      <div className="dashboard">
        <Nav className="justify-content-end top-bar" onSelect={handleSelect}>
          <NavDropdown title="Options" id="nav-dropdown">
            <NavDropdown.Item eventKey="LogOut" href="/Login">Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Button variant="secondary" className="add-button" onClick={this.showModal}>+</Button>
        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Board</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.handleSubmit}>
            <Modal.Body>
              <label>
                Board Name:
                <input type="text"
                  name="boardName"
                  value={this.newBoardName}
                  onChange={this.handleChange}
                  className="textBox"
                />
              </label>
            </Modal.Body>
            <Modal.Footer>
              <input type="submit" value="Submit" className="btn btn-primary"/>
            </Modal.Footer>
          </form>
        </Modal>
        <div className="board-deck">
          {
            this.state.boards.map((element) =>
              <div className="board" key={element._id}>
                <div>
                  <p>{element.name}</p>
                  <Button
                    variant="secondary"
                    value={element._id}
                    onClick={this.setSelectedBoard.bind(this)}>
                    Open
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => this.delBoard(element._id)}>
                    🗑
                  </Button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default BoardAdmin;
