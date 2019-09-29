const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = process.env.ATLAS_URI;

// Connect to Mongo
mongoose
  .connect(db, { 
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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});