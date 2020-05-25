import React from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import host from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/forms.scss';

async function sendData(params) {
  const config = {
    method: 'POST',
    url: `${host}/create/user/`,
    data: params,
  };
  const creationState = await axios(config);
  return creationState.data;
}

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      password: '',
      fName: '',
      lName: '',
      birthday: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history } = this.props;
    sendData(this.state).then((session) => {
      history.push(`/Dashboard/${session}`);
    });
  }

  render() {
    const {
      mail,
      password,
      fName,
      lName,
      birthday,
    } = this.state;
    return (
      <div className="forceCentered">
        <Card bg="dark" text="white" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>SignUp</Card.Title>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="mail">
                Mail:
                <input
                  id="mail"
                  type="text"
                  name="mail"
                  value={mail}
                  onChange={this.handleChange}
                  className="textBox"
                />
              </label>
              <label htmlFor="password">
                Password:
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  className="textBox"
                />
              </label>
              <label htmlFor="fName">
                First Name:
                <input
                  id="fName"
                  type="text"
                  name="fName"
                  value={fName}
                  onChange={this.handleChange}
                  className="textBox"
                />
              </label>
              <label htmlFor="lName">
                Last Name:
                <input
                  id="lName"
                  type="text"
                  name="lName"
                  value={lName}
                  onChange={this.handleChange}
                  className="textBox"
                />
              </label>
              <label htmlFor="date">
                Bithday:
                <input
                  id="date"
                  type="date"
                  name="birthday"
                  value={birthday}
                  onChange={this.handleChange}
                  className="birthBox"
                />
              </label>
              <input
                type="submit"
                value="Submit"
                className="btn btn-light"
              />
            </form>
            <Button variant="dark" href="/Login">Login</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default SignUp;
