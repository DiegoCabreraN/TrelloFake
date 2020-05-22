import React from 'react';
import {
  Nav,
  NavDropdown,
  Button,
} from 'react-bootstrap';
import '../styles/dashboard.scss';

const handleSelect = (eventKey) => alert(`selected ${eventKey}`);


class BoardAdmin extends React.Component {
  constructor(props){
    super(props);
    this.boards = this.props.boards.filter(board => board.sessions.includes(parseInt(this.props.session)))
  }
  setSelectedBoard(e){
    const board = this.props.boards.find(board => board.id === parseInt(e.target.value));
    console.log(board)
    this.props.history.push({
      pathname: `/Boards/${this.props.session}/${e.target.value}`,
      state: {
        board: board,
      },
    });
  };

  render(){
    return (
      <div className="dashboard">
        <Nav className="justify-content-end top-bar" onSelect={handleSelect}>
          <NavDropdown title="Options" id="nav-dropdown">
            <NavDropdown.Item eventKey="LogOut" href="/Login">Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Button variant="secondary" className="add-button">+</Button>
        <div className="board-deck">
          {
            this.boards.map((element) =>
              <div className="board" key={element.id}>
                <div>
                  <p>{element.name}</p>
                  <Button
                    variant="secondary"
                    value={element.id}
                    onClick={this.setSelectedBoard.bind(this)}>
                    Open
                  </Button>
                  <Button variant="danger">🗑</Button>
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
