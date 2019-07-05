const express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer');
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('./configuration/server-config');

const environmentRoute = require('./routes/environment.route');
const emailNotificationRoute = require('./routes/emailnotification.route');
const subscriberRoute = require('./routes/subscriber.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
const rootContext = config.rootContext || '/server';
app.use(cors());
app.use(bodyParser.json());
app.use(rootContext+'/environment', environmentRoute);
app.use(rootContext+'/emailNotification', emailNotificationRoute);
app.use(rootContext+'/subscriber', subscriberRoute);


const port = process.env.PORT || 3000;

const server = app.listen(port, "0.0.0.0", function(){
  console.log('backend server running on port ' + port);
});