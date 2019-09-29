import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { PanelGroup, Panel, FlexboxGrid, IconButton, Icon } from 'rsuite';

export default class ProjectPresentator extends Component {

  render() {
    const {projects, deleteProject} = this.props
    return (
<div>
<FlexboxGrid justify="center">
  <FlexboxGrid.Item colspan={12}>
<PanelGroup accordion bordered>
    <Panel header={projects.title} >
      <p>{projects.description}</p>
      <Link to={"/edit/"+projects._id}>edit</Link> 

      <IconButton icon={<Icon icon="trash2" />} circle size="md" 
      onClick={() => deleteProject(projects._id)}/>
    </Panel>
  </PanelGroup>
  <br />
  <br />
  </FlexboxGrid.Item>
  </FlexboxGrid>
</div>
    );
  }
}