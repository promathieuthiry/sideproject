import React, { Component } from 'react';
import axios from 'axios';

import NavbarComponent from './navbar.component'
import Login from './login.component';
import ProjectPresentator from './projects-presentator.component'
import CreateProjects from './create-projects.component'

import authHelper from '../helpers/auth'
import { Container, Header, Footer, Sidebar, Content } from 'rsuite';
import './login.css';



export default class ProjectsList extends Component {

  state = {
    projects: [],
    loading: true,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: '',
    isCreateProjectOpened: false
  }

  componentDidMount() {
    this.getProjectfromMongoDB()
    this.authentificate()

  }

  deleteProject = async id => {
    const { token } = this.state
    try {
    const config = authHelper.tokenConfig(token)
    await axios.delete('http://localhost:5000/projects/'+id, config)
    this.setState({
      projects: this.state.projects.filter(el => el._id !== id)
    })
  } catch (error) {
    console.log(error)
  }
}

  projectList = () => {
    return this.state.projects.map((item) => {
      return <ProjectPresentator projects={item} deleteProject={this.deleteProject} 
      key={item._id} />;
    })
  }

  render() {
    const {isAuthenticated, isLoading, user, projects, isCreateProjectOpened} = this.state
    return (
    <div className="dashboard">
      {isAuthenticated ?
      <div>
        <Container>
         <Header> <NavbarComponent logout={this.logout} user={user} displayAddProject={this.displayAddProject}/> </Header>
          <Container>
            <br />
            <br />
      {isCreateProjectOpened && <CreateProjects user={user} projects={projects} 
      updateProjects={this.updateProjects} closeAddProject={this.closeAddProject}/>}
      </Container>
      <h1 className="projectListName">Project List</h1>
      {this.projectList()}
      <Footer>Footer</Footer>
      </Container>
      </div> 
      : 
      <div>
        <Login updateStateLogin={this.updateStateLogin} isAuthenticated={isAuthenticated}
      isLoading={isLoading} user={user} authentificate={this.authentificate} failure={this.failure} />
      </div>
    }
    </div>
    );
  }

   /* **********************  */
   /*    Event Handler        */
   /* **********************  */

   updateProjects = (newProject) => {
     this.setState({projects: newProject})
   }
   /* ********************** */
   /*    Authentification    */
   /* ********************** */

  updateStateLogin = (payload) => {
    this.setState({isAuthenticated: true,
      isLoading: false,
      token: payload.token,
      user: payload.user
    })
  }

  displayAddProject = () => {
    this.setState({isCreateProjectOpened: true})
  }

  closeAddProject = () => {
    this.setState({isCreateProjectOpened: false})
  }

  // Authentification => Check token & load user
  authentificate = async () => {
    const { token } = this.state
    try {
    const config = authHelper.tokenConfig(token)
    const res =  await axios.get('http://localhost:5000/auth/user', config)
    const user= res.data
    this.setState({isAuthenticated: true, isLoading: false, user })
    } catch(error) {
      console.error(error);
      this.failure()
    }
  }

  failure = () => {
    localStorage.removeItem('token')
    this.setState({
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: false
  })}

    // logout
  logout = () => {
    this.failure()
    document.location.reload(true)}

  
   /* *************** */
   /*    FETCH        */
   /* *************** */

    getProjectfromMongoDB = async () => {
      // const id = response.data[0].user.id
      // debugger
      // const a = response.data.filter(item => item.user.id == id)
      // console.log(a)
      try {
        const response = await axios.get('http://localhost:5000/projects/')
        this.setState({ projects: response.data, loading: false })
        console.log(this.state.projects)
      } 
      catch (error) {
        this.setState({ loading: false })
        console.log(error);
      }
    }

}