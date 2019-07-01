const express = require('express');
const app = express();
const nodeMailer = require('nodemailer');
const subscriberRoutes = express.Router();

let Subscriber = require('../models/Subscriber');

subscriberRoutes.route('/add').post(function (req, res) {
  let subscriber = new Subscriber(req.body);
  subscriber.save()
    .then(subscriber => {
      res.status(200).json({'status': '200','subscriber': 'subscriber added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

subscriberRoutes.route('/').get(function (req, res) {
      Subscriber.find(function (err, subscribers){
        if(err){
          console.log(err);
        }
        else {
          res.json(subscribers);
        }
      });
});

subscriberRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Subscriber.findById(id, function (err, subscriber){
      res.json(subscriber);
  });
});

subscriberRoutes.route('/update/:id').post(function (req, res) {
    Subscriber.findById(req.params.id, function(err, subscriber) {
    if (!subscriber)
      return next(new Error('Could not load Document'));
    else {
        subscriber.env = req.body.env;
        subscriber.email = req.body.email;

        subscriber.save().then(subscriber => {
          res.json({'status': '200', 'subscriber':'Update complete'});
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

subscriberRoutes.route('/delete/:id').get(function (req, res) {
    Subscriber.findByIdAndRemove({_id: req.params.id}, function(err, subscriber){
        if(err) res.json(err);
        else {
            res.json('Successfully removed');
        }
    });
});



module.exports = subscriberRoutes;