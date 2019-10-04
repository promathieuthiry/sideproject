import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ProjectsList from "./components/projects-list.component";
import EditProjects from "./components/edit-projects.component";
import CreateProjects from "./components/create-projects.component";
import Login from './components/login.component';

function App() {
  return (
    <Router>
      <div className="container">
      <Route path="/" exact component={ProjectsList} />
      <Route path="/connection" component={Login} />
      <Route path="/edit/:id" component={EditProjects}/>
      <Route path="/create" component={CreateProjects} />

      </div>
    </Router>
  );
}

export default App;
