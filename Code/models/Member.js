const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'must provide name'],
    trim: true,
  },
  lastname: {
    type: String,
    // required: [true, 'must provide lastname'],
    trim: true,
  },
  number: {
    type: String,
  },
  filename: {
    type: String,
    required: true,
  },
  filepath: {
    type: String,
    required: true,
  }
  
})

module.exports = mongoose.model('Member', memberSchema)