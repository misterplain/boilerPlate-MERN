const axios = require("axios");
const schedule = require("node-schedule");
const nodeCron = require("node-cron");
const nodemailEmail = require("../utils/nodemailerEmail");

function keepServerActive() {
  nodeCron.schedule("*/10 * * * *", function logUpdateToServer() {
    try {
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `SUCCESS Keep Active - Cron Job Every 10 Minutes`,
        html: `<h3>Keep Active Email</h3><p>Keep your application active.</p>`,
      };
      // axios.post("https://e-commerce-mern-api.onrender.com/keepActive");
      nodemailEmail(mailOptions);
    } catch (error) {
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `FAILED Keep Active - Cron Job Every 10 Minutes`,
        html: `<h3>Keep Active Email</h3><p>Keep your application active.</p>`,
      };

      nodemailEmail(mailOptions);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  });
}

module.exports = keepServerActive;
