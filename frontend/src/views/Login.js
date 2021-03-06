import React from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import host from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/forms.scss';


async function getData(params) {
  const config = {
    method: 'POST',
    url: `${host}/get/user/`,
    data: params,
  };
  const creationState = await axios(config);
  return creationState.data;
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      password: '',
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
    getData(this.state).then((session) => {
      history.push(`/Dashboard/${session}`);
    });
  }

  render() {
    const { mail, password } = this.state;
    return (
      <div className="forceCentered">
        <Card bg="dark" text="white" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Login</Card.Title>
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
              <input
                type="submit"
                value="Submit"
                className="btn btn-light"
              />
            </form>
            <Button variant="dark" href="/SignUp">SignUp</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Login;
