import React from 'react';

import { Link } from "react-router-dom";

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
    //Implement the User verification here!!
    console.log(this.state);
    e.preventDefault();
  }

  render() {
    return (
    <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password:
            <input type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <ul>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/SignUp">SignUp</Link>
          </li>
        </ul>
    </div>);
  }

}



export default Login;
