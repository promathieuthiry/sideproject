const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require("path")

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const db = process.env.ATLAS_URI;
const db = process.env.MONGODB_URI;
// Connect to Mongo
mongoose
  .connect(process.env.MONGODB_URI || db, { 
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

// Serve static assests if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});