const express = require('express'),
    app = express(),
    nodeMailer = require('nodemailer'),
    emailNotificationRoutes = express.Router(),
    config = require('./../configuration/server-config');

let EmailNotification = require('../models/EmailNotification');
let Subscriber = require('../models/Subscriber');
let NotificationReceivers = require('../models/NotificationReceivers');

// SMTP config
let from_email_address = config.SMTP_FROM_ADDRESS;
let transporter = nodeMailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: false
});

var mailOptions;

emailNotificationRoutes.route('/send-email-and-add').post(function (req, res) {
    // send to all the subscribers -- general notifications
    if (req.body.general === 'yes') {
        NotificationReceivers.find(function (err, notificationreceivers) {
            if (err) {
                console.log(err);
            } else {
                if (notificationreceivers.length > 0) {
                    var resData = JSON.stringify(notificationreceivers);
                    var obj = JSON.parse(resData);
                    var keys = Object.keys(obj);

                    console.log("========General Notifications=============");
                    let email_distribution = obj[keys[0]]["email_list"];
                    // overwrite distribution list if explicitly passed in req body
                    if (req.body.to) {
                        email_distribution = req.body.to;
                    }
                    console.log(email_distribution);
                    console.log("========General Notifications=============");

                    var bodyArray = req.body.body.split("\n")
                    var bodyHtml = bodyArray.join('<br />');

                    mailOptions = {
                        from: from_email_address,
                        to: email_distribution,
                        subject: req.body.subject,
                        html: bodyHtml,
                        body: req.body.body
                    };
                    //sendmail invocation
                    transporter.sendMail(mailOptions, (err, info) => {
                        console.log("sending email using the following mailOptions \n" + "email_distribution:" + mailOptions.to + "\n" +
                            "subject:" + mailOptions.subject + "\n" + "body:" + mailOptions.html);

                        if (err) {
                            return console.log(err);
                        } else {
                            let emailnotification = new EmailNotification(mailOptions);

                            emailnotification.save(function (err) {
                                if (err) {
                                    console.log("error saving emailnotification");
                                    throw err;
                                }
                                console.log('saved emailnotification');
                            });

                            console.log('Message %s sent: %s', info.messageId, info.response);
                            res.render('index');
                        }
                    });
                } else {
                    console.log("No Notifiers found to notify!!");
                }
            }
        });
    } else {
        // Send only env-app related updates to subscribers
        if (req.body.env != null) {
            Subscriber.find({
                "env_id": req.body.env_id
            }, {
                email: 1
            }, function (err, subscribers) {
                if (err) {
                    console.log(err);
                } else {
                    if (subscribers.length > 0) {
                        var resData = JSON.stringify(subscribers);
                        var obj = JSON.parse(resData);
                        var keys = Object.keys(obj);

                        let email_distribution;

                        console.log("========ENV-APP Notifications=============");
                        for (var position in obj) {
                            email = obj[keys[position]]["email"];
                            email_distribution = email_distribution + ";" + email;
                        }
                        email_distribution = email_distribution.replace("null;", "").replace("undefined;", "");
                        console.log(email_distribution);
                        console.log("========ENV-APP Notifications=============");
                        res.json(subscribers);

                        mailOptions = {
                            from: from_email_address,
                            to: email_distribution,
                            subject: req.body.sub,
                            html: "<table border=10><tr><th>Environment</th><th>Application</th><th>Current Version</th><th>Status</th><th>Install Date</th><th>Comments</th></tr><tr><td>" +
                                req.body.env + "</td><td>" +
                                req.body.app + "</td><td>" +
                                req.body.current_version + "</td><td>" +
                                req.body.status + "</td><td>" +
                                req.body.install_date + "</td><td>" +
                                req.body.comments + "</td></tr><tbody></table>"
                        };

                        //sendmail invocation
                        transporter.sendMail(mailOptions, (err, info) => {
                            console.log("sending email using the following mailOptions \n" + "email_distribution:" + mailOptions.to + "\n" +
                                "subject:" + mailOptions.subject + "\n" + "body:" + mailOptions.html);

                            if (err) {
                                return console.log(err);
                            } else {
                                let emailnotification = new EmailNotification(mailOptions);

                                emailnotification.save(function (err) {
                                    if (err) {
                                        console.log("error saving emailnotification");
                                        throw err;
                                    }
                                    console.log('saved emailnotification');
                                });

                                console.log('Message %s sent: %s', info.messageId, info.response);
                                res.render('index');
                            }
                        });
                    } else {
                        console.log("No Subscribers found to notify!!");
                    }
                }
            });
        }
    }
});

emailNotificationRoutes.route('/').get(function (req, res) {
    EmailNotification.find(function (err, emailNotification) {
        if (err) {
            console.log(err);
        } else {
            res.json(emailNotification);
        }
    });
});

emailNotificationRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    EmailNotification.findById(id, function (err, emailNotification) {
        res.json(emailNotification);
    });
});

emailNotificationRoutes.route('/update/:id').post(function (req, res) {
    EmailNotification.findById(req.params.id, function (err, emailNotification) {
        if (!emailNotification)
            return next(new Error('Could not load Document'));
        else {
            emailNotification.env = req.body.env;
            emailNotification.email = req.body.email;

            emailNotification.save().then(emailNotification => {
                    res.json({
                        'status': '200',
                        'emailNotification': 'Update complete'
                    });
                })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

emailNotificationRoutes.route('/delete/:id').get(function (req, res) {
    EmailNotification.findByIdAndRemove({
        _id: req.params.id
    }, function (err, emailNotification) {
        if (err) res.json(err);
        else {
            res.json('Successfully removed');
        }
    });
});

module.exports = emailNotificationRoutes;