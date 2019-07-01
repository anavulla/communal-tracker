const express = require('express'),
      app = express(),
      environmentRoutes = express.Router(),
      config = require('./../configuration/server-config');

let Environment = require('../models/Environment');

environmentRoutes.route('/add').post(function (req, res) {
  let environment = new Environment(req.body);
  environment.save()
    .then(environment => {
      res.status(200).json({'status': '200','environment': 'environment added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

environmentRoutes.route('/').get(function (req, res) {
    Environment.find(function (err, environments){
    if(err){
      console.log(err);
    }
    else {
      res.json(environments);
    }
  });
});

environmentRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Environment.findById(id, function (err, environment){
      res.json(environment);
  });
});

environmentRoutes.route('/update/:id').post(function (req, res) {
    Environment.findById(req.params.id, function(err, environment) {
    if (!environment)
      return next(new Error('Could not load Document'));
    else {
        environment.env = req.body.env;
        environment.app = req.body.app;
        environment.current_version = req.body.current_version;
        environment.status = req.body.status;
        environment.install_date = req.body.install_date;
        environment.comments = req.body.comments;

        environment.save().then(environment => {
          res.json({'status': '200', 'environment':'Update complete'});
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

environmentRoutes.route('/delete/:id').get(function (req, res) {
    Environment.findByIdAndRemove({_id: req.params.id}, function(err, environment){
        if(err) res.json(err);
        else {
            res.json('Successfully removed');
        }
    });
});

module.exports = environmentRoutes;