const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EmailNotification = new Schema({
  createdAt: {
    type: Date, default: Date.now
  },
  from: {
    type: String
  },
  to: {
    type: String
  },
  subject: {
    type: String
  },
  html: {
    type: String
  },
  body: {
    type: String
  }
},{
    collection: 'emailNotification'
});

module.exports = mongoose.model('EmailNotification', EmailNotification);