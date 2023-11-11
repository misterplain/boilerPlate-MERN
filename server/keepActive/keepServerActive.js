const axios = require("axios");
const schedule = require("node-schedule");
const nodeCron = require("node-cron");

function keepServerActive() {
  nodeCron.schedule("*/1 * * * *", function logUpdateToServer() {
    try {
      axios.post("https://activeserver.onrender.com/keepActive");
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