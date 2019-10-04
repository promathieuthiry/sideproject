import React, { Component } from 'react';

import axios from 'axios';
import './login.css';

import { Modal, Alert, Icon, Divider, Button, Container,
  Form, FormGroup, FormControl, ControlLabel} from 'rsuite';

// Config
import { configHeader } from '../helpers/auth'

export default class Login extends Component {
  state = {
    formValue: {
      name: '',
      email: '',
      password: '',
    },
      register: false,
      show: false
    };
  
  // handleInputChange = (event) => {
  //   this.setState({ [event.target.name]: event.target.value });
  // }

  close = () => { this.setState({ show: false })}

  open = () => { this.setState({ show: true })}

  getRegistration = () => { this.setState({register: true}) }

  getRegistrationOff = () => { this.setState({register: false}) }

  handleChange = (value) => { this.setState({ formValue: value })}

//   Login
  onLogin = async (event) => {
    event.preventDefault();
    const {email, password} = this.state.formValue
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post('http://localhost:5000/auth/', body, configHeader)
      const payload = res.data
      this.props.updateStateLogin(payload)
      localStorage.setItem('token', payload.token);
      this.setState({ redirection: true })
      this.close()
      } catch (error) {
        const { failure } = this.props
        failure()
        Alert.error(error.response.data.msg, 5000)
      }
    }

  //   Register
  onRegister = async (event) => {
    event.preventDefault();
    const {name, email, password} = this.state.formValue
    const body = JSON.stringify({ name, email, password })
    try {
      const res = await axios.post('http://localhost:5000/users/', body, configHeader)
      const payload = res.data
      this.props.updateStateLogin(payload)
      localStorage.setItem('token', payload.token)
      this.close()
      } catch(error) {
        const { failure } = this.props
        failure()
        Alert.error(error.response.data.msg, 5000)
      }
    }
    
//   logout
  // logout = () => {
  //   const { failure } = this.props
  //   failure()
  //   document.location.reload(true)}

  render() {
      const {register, formValue, show} = this.state
    return (
        <div>
          
{/* Register */}
{register ? <div> 
<Modal show={show} onHide={this.close} size="xs">
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              fluid
              onChange={this.handleChange}
              formValue={formValue}
            >
              <FormGroup>
                <ControlLabel>Username</ControlLabel>
                <FormControl name="name" />
              </FormGroup>
          <FormGroup>
                  <ControlLabel>email address</ControlLabel>
                  <FormControl name="email" type="email" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl name="password" type="password" />
                </FormGroup>
            </Form>
            <br />
          <Button onClick={this.onRegister} block appearance="primary">
          SignUp
        </Button>
      <Divider></Divider>
      <Button onClick={this.getRegistrationOff} block appearance="link">
          <Icon icon='hand-o-left' />&nbsp;Retour à la connexion
            </Button> 
          </Modal.Body>
        </Modal></div>
      : <div>
      <Modal show={show} onHide={this.close} size="xs">
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              fluid
              onChange={this.handleChange}
              formValue={formValue}
            >
          <FormGroup>
                  <ControlLabel>email address</ControlLabel>
                  <FormControl name="email" type="email" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl name="password" type="password" />
                </FormGroup>
            </Form>
            <br />
              <Button onClick={this.onLogin} block appearance="primary">
              Login
            </Button>
          <Divider>Don't have an account?</Divider>
          <Button onClick={this.getRegistration} block appearance="ghost">
              Sign Up
            </Button>
          </Modal.Body>
        </Modal>
        </div>
        }

        {/* Présentation home */}
        <Container>
            <div >
     </div>
     <div class="container">
  <nav class="navbar">
      <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><button className="loginButton" onClick={this.open}>LOGIN</button></li>
        </ul>
      </nav>
  <section id="home">
    <h1>Welcome To <span className="yellow">SideProjectJS</span></h1>
    <p class="lead">YOUR LATEST IDEA COULD BE HUGE <span role="img" aria-label="Rocket">🚀</span></p>
    <p class="lead">USE OUR SERVICES SO YOU WON’T FORGET IT</p>
    <div class="button_cont" align="center"><a className="buttonDiscover" 
    href="#about" rel="nofollow noopener">DISCOVER</a></div>
  </section>
  <section id="about">
     <h3>
     If you don't write it down, you will forget </h3>
      {/* <p class="leadAbout">It’s quite frustrating when you have a great idea — but you don’t write it down.  Then later, when you actually have time to think about it, you can’t remember what it was.</p> */}
  </section>
  <section id="service">
      <h1>WRITE IT DOWN!</h1>
      <p class="lead">Use our amazing interface to keep tracks of your best ideas!</p>
  </section>
</div>
<footer className="footerHome">Made by <a href="https://github.com/promathieuthiry" 
target="_blank" rel="noopener noreferrer">Mathieu T</a></footer>
        </Container>
      </div>
    );
  }
}


