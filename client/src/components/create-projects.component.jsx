import React, { Component } from 'react';
import axios from 'axios';

import { Panel, Container, Button, FlexboxGrid, 
  Form, FormGroup, FormControl, ControlLabel} from 'rsuite';

// Helpers
import authHelper from '../helpers/auth'


export default class CreateProjects extends Component {

  state = {
    formValue: {
      title: '',
      description: '',
      }
    }
    handleChange = (value) => { this.setState({ formValue: value })}

    redirectToTarget = () => {
      this.props.history.push("/")
        }

    onSubmit = async (e) => {
        e.preventDefault()
        const { user, projects, updateProjects } = this.props
        try {
          const token  = localStorage.getItem('token')
          const config = authHelper.tokenConfig(token)
          const { title, description } = this.state.formValue
          const project = { title: title, description: description, 
            user: {
              id: user._id, 
              name: user.name
           } }
           await axios.post('http://localhost:5000/projects/add', project, config)
           projects.push(project)
           updateProjects(projects)
        } catch (error) {
        console.error(error);
      }
    }

  render() {
      const {formValue} = this.state
    return (
<div>
  <Container>
  <FlexboxGrid justify="center">
  <FlexboxGrid.Item colspan={12}>

  <Panel header="Add project" bordered>
            <Form
              fluid
              onChange={this.handleChange}
              formValue={formValue}
            >
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl name="title" type="text"/>
              </FormGroup>
              <FormGroup>
                <ControlLabel>description</ControlLabel>
                <FormControl name="description" rows={5}/>
              </FormGroup>
      </Form>
            <br />
          <Button onClick={this.onSubmit} appearance="primary">
          Ajouter
        </Button>
        <br />
<br />
<br />
<br /><br />
  </Panel>
  </FlexboxGrid.Item>
  </FlexboxGrid>
  </Container>
</div>
    );
  }
}
