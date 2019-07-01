const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NotificationReceivers = new Schema({
  email_list: {
    type: String
  }
},{
    collection: 'notificationReceivers'
});

module.exports = mongoose.model('NotificationReceivers', NotificationReceivers);