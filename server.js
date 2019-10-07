const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path')
const helmet = require('helmet')


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(helmet())
// app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
// app.use(helmet.featurePolicy({features: { notifications: ["'none'"]}}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// const db = process.env.ATLAS_URI;
const dbMlab =process.env.MONGODB_URI
// Connect to Mongo
mongoose
  .connect( dbMlab, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
const projectsRouter = require('./routes/projects');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
app.use('/projects', projectsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {  app.use(express.static(path.join(__dirname, 'client/build')));  
app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'client/build/index.html'));  })}

//build mode
app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html'));})



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});