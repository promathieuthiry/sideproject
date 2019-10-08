import React, { Component } from 'react';
import axios from 'axios';

import { Container } from 'rsuite';
// Helpers
import authHelper from '../helpers/auth'

export default class EditProjects extends Component {

  state = {
    title: '',
    description: '',
    userID: '',
    userName: ''
  }

  componentDidMount() {
    axios.get('http://localhost:5000/projects/'+this.props.match.params.id)
      .then(response => {
        console.log(response.data)
        this.setState({
          title: response.data.title,
          description: response.data.description,
          userID: response.data.userID,
          userName: response.data.userName
         
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = async e => {
    e.preventDefault()
    const { title, description, userID, userName} = this.state
    try {
      const token  = localStorage.getItem('token')
      const config = authHelper.tokenConfig(token)
      const project = {
        title: title, 
        description: description, 
        userID: userID,
        userName: userName
       }
       await axios.put('http://localhost:5000/projects/update/'+this.props.match.params.id, project, config)
      window.location = '/';
    } catch(error){
      console.error(error);
      window.location = '/';
    }
   
  }

  render() {
    const {title, description} = this.state
    return (
    <div className="editProjetContainer">
      <Container>
  <form id="msform">
  {/* <!-- fieldsets --> */}
  <fieldset>
    <h2 className="fs-title">EDIT PROJECT: {title}</h2>
    <label className="labelEditProject">Title
      <input type="text" name="title" placeholder="Title" value={title} onChange={this.handleInputChange}/>
      </label>
      <label className="labelEditProject">Description
    <input type="text" name="description" placeholder="Description" value={description} onChange={this.handleInputChange}/>
    </label>
    <input type="button" name="next" class="next action-button" value="UPDATE" onClick={this.onSubmit}/>
  </fieldset>
  
</form>
</Container>
    </div>
    )
  }
}