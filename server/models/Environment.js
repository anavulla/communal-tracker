const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Environment = new Schema({
  env: {
    type: String
  },
  app: {
    type: String
  },
  current_version: {
    type: String
  },
  status: {
    type: String
  },
  install_date: {
    type: Date
  },
  comments: {
    type: String
  }
},{
    collection: 'environment'
});

module.exports = mongoose.model('Environment', Environment);