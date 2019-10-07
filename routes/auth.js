const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


const jwtSecret = process.env.JWT_SECRET;

// User Model
let User = require('../models/user.model');

router.route('/').post((req, res) => {
  const { email, password } = req.body;
  // Simple validation
  if(!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
    }
 // Check for existing user
    User.findOne({ email })
      .then(user => {
      if(!user) return res.status(400).json({ msg: 'User Does not exist' });
      // Validate password
      bcrypt.compare(password, user.password)
      .then(isMatch => {
      if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
      
        jwt.sign(
          { id: user.id },
          jwtSecret,
          { expiresIn: 3600 },
          (err, token) => {
          if(err) throw err;
          res.json({
          token,
          user: {
          id: user.id,
          name: user.name,
          email: user.email
          }
        });
        }
      )
              })
              .catch(err => res.status(400).json('Error: ' + err));
              })
            })

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user))
      .catch(err => res.status(400).json(`Erreur d'authentification` + err));
  });
  


module.exports = router;