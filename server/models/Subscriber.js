const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Subscriber = new Schema({
  env_id: {
    type: Schema.Types.ObjectId, ref: 'Environment'
  },
  env: {
    type: String
  },
  app: {
    type: String
  },
  email: {
    type: String
  }
}, {
  collection: 'subscriber'
});

module.exports = mongoose.model('Subscriber', Subscriber);