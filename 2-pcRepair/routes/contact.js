const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer"); //import nodemailer module

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', 
    { 
      title: 'Contact'
    });
});

//send email
router.post("/send", function(req, res, next)
{
    //setup transporter with service and auth
    var transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth: 
            {
                user: 'src_email@gmail.com',
                pass: 'src_password'
            }
        }
    )

    //setup email data options
    var mailOptions = 
    {
        from: '"Fake PC Repair" <src_email@gmail.com>',
        to: '"Support" <dest_email@gmail.com>',
        subject: "Nodemailer test - hello from fake PC repair",
        text: "You have a submission from... Name: " + req.body.name + " Email: " + req.body.email + " Message: " + req.body.message,
        html: "<p>You have a submission from...</p> <ul><li>Name: " + req.body.name + "</li> <li>Email: " + req.body.email + "</li> <li>Message: " + req.body.message + "</li></ul>",
    }

    // send the email
    transporter.sendMail(mailOptions, function(err, info)
    {
        if(err)
        {
            return console.log(error);
        }
        else
        {
            //info.response is last SMTP response message from server
            console.log("Message sent: " + info.response);
            //redirect to the home page after sending
            res.redirect("/");
        }
    });
});

module.exports = router; //to use this from another file need the export