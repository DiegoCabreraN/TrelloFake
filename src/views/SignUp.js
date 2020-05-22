import React from 'react';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/forms.scss'

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
        <div className="forceCentered">
          <Card bg="dark" text="white" style={{ width: '18rem'}}>
            <Card.Body>
              <Card.Title>SignUp</Card.Title>
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
                <label>
                  First Name:
                  <input type="text"
                    name="fName"
                    value={this.state.fName}
                    onChange={this.handleChange}
                    className="textBox"
                  />
                </label>
                <label>
                  Last Name:
                  <input type="text"
                    name="lName"
                    value={this.state.lName}
                    onChange={this.handleChange}
                    className="textBox"
                  />
                </label>
                <label>
                  Bithday:
                  <input type="date"
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.handleChange}
                    className="birthBox"
                  />
                </label>
                <input type="submit" value="Submit" className="btn btn-primary"/>
              </form>
              <Button variant="secondary" href="/Login">Login</Button>
            </Card.Body>
          </Card>
        </div>);
  }
}

export default SignUp;
