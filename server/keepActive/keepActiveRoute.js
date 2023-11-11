const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/", (req, res) => {
    console.log("Keep Active triggered post request within routes")
  const smtpTransporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `Keep Active - Cron Job Every 10 Minutes`,
    html: `<h3>Keep Active Email</h3><p>Keep your application active.</p>`,
  };

  smtpTransporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    console.log("Success: Email sent");
    res.status(200).json({ message: "Message sent successfully" });
  });
});

module.exports = router;
