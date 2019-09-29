import React, { Component } from 'react';
import axios from 'axios';

import NavbarComponent from './navbar.component'

export default class EditProjects extends Component {

  state = {
    title: '',
    description: '',
    users: []
    }

  componentDidMount() {
    axios.get('http://localhost:5000/projects/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeTitle = e => {
    this.setState({
        title: e.target.value
    })
}

onChangeDescription = (e) => {
    this.setState({
        description: e.target.value
    })
}

  onSubmit = e => {
    e.preventDefault()
    const { title, description } = this.state
    const project = {
        title: title, description: description }
    axios.post('http://localhost:5000/projects/update/' + this.props.match.params.id, project)
      .then(res => console.log(res.data));
    window.location = '/';
  }

  render() {
    return (
    <div>
      <NavbarComponent />

      <h3>Edit Project</h3>
      <form onSubmit={this.onSubmit}>
        <input
        onChange={(e) => this.onChangeTitle(e)}
        value={this.state.title}
        placeholder="Title"
        ></input>

      <input
        onChange={this.onChangeDescription}
        placeholder="Description"
        value={this.state.description}
        ></input>

        <button type="submit" >Create</button>
      </form>
    </div>
    )
  }
}