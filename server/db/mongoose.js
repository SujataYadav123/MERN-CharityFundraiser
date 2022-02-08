const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.DB;

mongoose.connect(
  db,
  {
    useNewURLParser: true,
  },
  () => {
    console.log('Connected to database successfully!!');
  }
);
