import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/forms.scss';
import axios from 'axios';
import host from '../config';

async function getData(params){
  const config = {
    method: 'POST',
    url: `${host}/getUser/`,
    data: params,
  };
  const creationState = await axios(config);
  return creationState.data;
}


class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
    getData(this.state).then((session)=>{
      this.props.history.push("/Dashboard/" + session);
    });
  }

  render() {
    return (
    <div className="forceCentered">
      <Card bg="dark" text="white" style={{ width: '18rem'}}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <form onSubmit={this.handleSubmit}>
            <label>
              Username:
              <input type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                className="textBox"
              />
            </label>
            <label>
              Password:
              <input type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                className="textBox"
              />
            </label>
            <input type="submit" value="Submit" className="btn btn-light"/>
          </form>
          <Button variant="dark" href="/SignUp">SignUp</Button>
        </Card.Body>
      </Card>
    </div>);
  }

}



export default Login;
