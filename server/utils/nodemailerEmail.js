const nodemailer = require("nodemailer");

const nodemailEmail = (mailOptions) => {
  const smtpTransporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  smtpTransporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      const errorMailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `nodemail ERROR - origin: BoilerPlate`,
        html: `<h3>Keep Active Email</h3><p>Keep your application active.</p>`,
      };
      nodemailEmail(errorMailOptions);
    }
  });
};

module.exports = nodemailEmail;
