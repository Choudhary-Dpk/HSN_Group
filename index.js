require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 1080;

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 587,
  secure: false,
  auth: {
    user: "info@ksngroup.co.in",
    pass: "Kiaan@1234",
  },
});

app.post('/send-email', (req, res) => {
  console.log(28888, req.body)
  const {formType, name, email, message, designation, location, mobile, organization, service } = req.body;
  let mailOptions = {}
if (formType == 'query') {
  mailOptions = {
    from: email,
    to: "info@ksngroup.co.in",
    subject: 'Query Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nDesignation: ${designation}\nLocation: ${location}\nMobile: ${mobile}\nOrganization: ${organization}\nMessage: ${message}`,
  };
} else {
  mailOptions = {
    from: email,
    to: "info@ksngroup.co.in",
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`,
  };
}

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(39, error);
      return res.status(500).send(error.toString());
    }
    console.log(42, info);
    res.send('Email sent: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
