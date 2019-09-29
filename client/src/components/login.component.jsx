import React, { Component } from 'react';

import axios from 'axios';

import { Modal, Alert, Icon, Divider, Button, 
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
        <Button onClick={this.open}>Discover</Button>

{/* <Container>
  <Content>
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={12}>
        <Panel header={<h3>SignUp</h3>} bordered>
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
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </Content>
</Container> */}

  {/* <div className="login-page">
    <Container>
      <Content>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel header={<h3>Login</h3>} bordered>
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
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  </div> */}

      </div>
    );
  }
}


