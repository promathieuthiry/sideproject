const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userID: { type: String, required: true },
  userName: { type: String, required: true } 
}, {
  timestamps: true,
});

const Projects = mongoose.model('Projects', projectsSchema);

module.exports = Projects;