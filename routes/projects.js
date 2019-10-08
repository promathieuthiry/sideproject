const router = require('express').Router();
const auth = require('../middleware/auth');

// Project Model
let Projects = require('../models/projects.model');

router.route('/').get((req, res) => {
  Projects.find()
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post( (req, res) => {
  const {title, description, userID, userName} = req.body

  const newProjects = new Projects({
    title,
    description,
    userID, 
    userName
  });

  newProjects.save()
  .then(() => res.json('Projects added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Projects.findById(req.params.id)
      .then(item => res.json(item))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete(auth, (req, res) => {
    Projects.findByIdAndDelete(req.params.id)
      .then(() => res.json('Projects deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').put(auth, (req, res) => {
    Projects.findById(req.params.id)
      .then(item => {
        item.title = req.body.title;
        item.description = req.body.description;
        item.userID = req.body.userID;
        item.userName = req.body.userName
  
        item.save()
          .then(() => res.json('Project updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;