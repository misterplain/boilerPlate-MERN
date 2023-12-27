const router = require("express").Router();
const nodemailer = require("nodemailer");
const nodemailEmail = require("../utils/nodemailerEmail");

router.post("/", (req, res) => {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `SUCCESS Keep Active - Cron Job Every 10 Minutes`,
      html: `<h3>Keep Active Email</h3><p>Keep your application active.</p>`,
    };
    nodemailEmail(mailOptions);
  } catch (error) {
    console.log("error from route" + error.message)

  }
});

module.exports = router;
