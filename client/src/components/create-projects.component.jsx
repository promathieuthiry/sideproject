import React, { Component } from 'react';
import axios from 'axios';

import { Container, IconButton, Icon, FlexboxGrid  } from 'rsuite';

// Helpers
import authHelper from '../helpers/auth'
import './create-project.css'

export default class CreateProjects extends Component {

  state = {
      title: '',
      description: ''
    }

    handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

    onSubmit = async (e) => {
        e.preventDefault()
        const { user, projects, updateProjects } = this.props
        try {
          const token  = localStorage.getItem('token')
          const config = authHelper.tokenConfig(token)
          const { title, description } = this.state
          const project = { title: title, description: description, 
            user: {
              id: user._id, 
              name: user.name
           } }
           await axios.post('http://localhost:5000/projects/add', project, config)
           projects.push(project)
           updateProjects(projects)
           const element = document.getElementById(`${title}`);
           element.scrollIntoView({behavior: "smooth"})
           this.setState({title: '', description: ''})
           

        } catch (error) {
        console.error(error);
      }
    }

  render() {
      const {title, description} = this.state
      const {closeAddProject} = this.props
    return (
<div>
  
<Container>
  <form id="msform">
  {/* <!-- fieldsets --> */}
  <fieldset>
  <FlexboxGrid justify="space-around">
  <FlexboxGrid.Item colspan={23}> <h2 class="fs-title">Add a Project</h2></FlexboxGrid.Item>
  <FlexboxGrid.Item colspan={1}><IconButton icon={<Icon icon="close"/>} circle size="sm" onClick={closeAddProject}/></FlexboxGrid.Item>
  </FlexboxGrid>
    <input type="text" name="title" placeholder="Title" value={title} onChange={this.handleInputChange}/>
    <input type="text" name="description" placeholder="Description" value={description} onChange={this.handleInputChange}/>
    <input type="button" name="next" class="next action-button" value="ADD" onClick={this.onSubmit}/>
  </fieldset>
  
</form>
</Container>
</div>
    );
  }
}
