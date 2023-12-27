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
    res.status(200).json({ message: "Message sent successfully" })
  } catch (error) {
    console.log("error from route" + error.message)
    res.status(500).json({ message: "Internal Server Error" })

  }
});

module.exports = router;
