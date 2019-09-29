const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: {
    id: { type: String },
    name: { type: String } 
  }
}, {
  timestamps: true,
});

const Projects = mongoose.model('Projects', projectsSchema);

module.exports = Projects;