import React from 'react';
import axios from 'axios';
import {
  Nav,
  NavDropdown,
  Button,
  Modal,
} from 'react-bootstrap';
import { Column } from '../components'
import '../styles/board.scss';
import host from '../config';

const handleSelect = (eventKey) => alert(`selected ${eventKey}`);


async function addColumn(name, boardId, session){
  const config = {
    method: 'POST',
    url: `${host}/createColumn/`,
    data: {
      name: name,
      boardId: boardId,
      session: session,
    },
  };
  const creationState = await axios(config);
  return creationState.data;
}

class Board extends React.Component {
  constructor(props){
    super(props);

    if(this.props.history.location.state){
      /*
      this.tasks = [{
        description: "Start",
        columnId: 0,
        taskId: 0,
        boardId: 0,
        sessions: [1],
      },{
        description: "asd",
        columnId: 0,
        taskId: 1,
        boardId: 0,
        sessions: [1],
      }]*/
      this.state = {
        show: false,
        columns: [],
      };
      this.columns = [];
      this.tasks = [];
      this.BoardId = this.props.match.params.BoardId;
      this.Session = this.props.match.params.session;
      this.showModal = this.showModal.bind(this);
      this.hideModal = this.hideModal.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  };
  handleSubmit(e){
    e.preventDefault();
    addColumn(this.state.columnName, this.BoardId, this.Session).then(()=>{
      const config = {
        method: 'POST',
        url: `${host}/getColumns/`,
        data: {
          session: this.Session,
          boardId: this.BoardId,
        },
      };
      axios(config).then(res =>{
        const newState = {
          columns: res.data,
          show: false,
        }
        this.setState(newState);
      });
    });
  };
  async updateTask(){
    const config = {
      method: 'POST',
      url: `${host}/getColumns/`,
      data: {
        session: this.Session,
        boardId: this.BoardId,
      },
    };
    axios(config).then(res=>{
      this.setState({columns: res.data});
    });
    window.location.reload();
  }
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
      url: `${host}/getColumns/`,
      data: {
        session: this.Session,
        boardId: this.BoardId,
      },
    };
    axios(config).then(res =>{
      this.setState({columns: res.data});
    });

  };
  returnToAdmin(){
    this.props.history.push(`/Dashboard/${this.props.match.params.session}`);
  };
  async delColumn(id, session, boardId){
    const config = {
      method: 'POST',
      url: `${host}/deleteColumn/`,
      data: {
        session: session,
        boardId: boardId,
        id: id,
      },
    };
    const deleteState = await axios(config);
    this.setState({columns:deleteState.data});
    return deleteState.data;
  }
  searchColumns(columns, tasks){
    if(!columns || columns.length === 0){
      return (
        <div className="col-not-found">
          There are no Columns
        </div>
      );
    }
    const arr = columns.map((column) =>
      <Column
        key={column._id}
        name = {column.name}
        id = {column._id}
        session = {this.Session}
        board = {this.BoardId}
        delColumn = {this.delColumn.bind(this)}
        availableColumns = {this.state.columns}
        updateTask = {this.updateTask.bind(this)}
        tasks = {tasks.filter((task) => task.columnId === column.id)}/>
    )
    return arr;
  };


  validate(){
    if(this.props.history.location.state){
      return (
        <div className="board">
          <Nav className="justify-content-end top-bar" onSelect={handleSelect}>
            <Nav.Item className="return-button">
              <Button onClick={this.returnToAdmin.bind(this)}>{'<'}</Button>
            </Nav.Item>
            <NavDropdown title="Options" id="nav-dropdown">
              <NavDropdown.Item eventKey="LogOut" href="/Login">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button variant="dark" className="add-button" onClick={this.showModal}>+</Button>
          <Modal centered show={this.state.show} onHide={this.hideModal}>
            <Modal.Header closeButton>
              <Modal.Title>Create Column</Modal.Title>
            </Modal.Header>
            <form onSubmit={this.handleSubmit}>
              <Modal.Body>
                <label>
                  <div className="input-label">Column Name:</div>
                  <input type="text"
                    name="columnName"
                    value={this.newColumnName}
                    onChange={this.handleChange}
                    className="textBox"
                  />
                </label>
              </Modal.Body>
              <Modal.Footer>
                <input type="submit" value="Submit" className="btn btn-light"/>
              </Modal.Footer>
            </form>
          </Modal>
          <div className="column-deck">
            {
              this.searchColumns(this.state.columns, this.tasks)
            }
          </div>
        </div>
      );
    }
    else{
      console.log(this.props)
      return(
        <div className="error-screen">There's been a mistake, please check your Session</div>
      );
    }
  }
  render(){
    return this.validate();
  }
}

export default Board;

