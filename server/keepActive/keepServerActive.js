const axios = require("axios");
const schedule = require("node-schedule");
const nodeCron = require("node-cron");
const nodemailEmail = require("../utils/nodemailerEmail");

function keepServerActive() {
  nodeCron.schedule("*/10 * * * *", function logUpdateToServer() {
    try {
      axios.post("https://e-commerce-mern-api.onrender.com/keepActive");
      // axios.post("http://localhost:5000/keepActive");
    } catch (error) {
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
