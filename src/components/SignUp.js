import React from 'react';

import { Link } from "react-router-dom";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
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

  handleSubmit(e){
    //Implement the User creation here!!
    console.log(this.state);
    e.preventDefault();
  }

  render(){
    return (
        <div>
            <h2>SignUp</h2>
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
              <label>
                First Name:
                <input type="text"
                  name="fName"
                  value={this.state.fName}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Last Name:
                <input type="text"
                  name="lName"
                  value={this.state.lName}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Bithday:
                <input type="date"
                  name="birthday"
                  value={this.state.birthday}
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

export default SignUp;
