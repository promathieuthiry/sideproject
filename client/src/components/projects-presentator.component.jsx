import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FlexboxGrid, IconButton, Icon, Container } from 'rsuite';
import './create-project.css'

export default class ProjectPresentator extends Component {

  render() {
    const {projects, deleteProject} = this.props
    return (
<div>
  <Container>
  <div id="mslist">
  <fieldset id={projects.title}>
  <FlexboxGrid justify="space-between">
      <FlexboxGrid.Item colspan={18}><h2 class="fs-title">{projects.title}</h2></FlexboxGrid.Item>
      <Link to={"/edit/"+projects._id}> <FlexboxGrid.Item colspan={2}><IconButton icon={<Icon icon="edit"/>} circle size="sm" />
      </FlexboxGrid.Item></Link> 
      <FlexboxGrid.Item colspan={2}><IconButton icon={<Icon icon="trash2"/>} circle size="sm" 
      onClick={() => deleteProject(projects._id)}/></FlexboxGrid.Item>
    </FlexboxGrid>
    <h3 class="fs-subtitle">{projects.description}</h3>
  </fieldset>
</div>
</Container>
</div>
    );
  }
}