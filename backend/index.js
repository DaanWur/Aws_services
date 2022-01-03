const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/config")();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  winston.info(`Listening on port ${port}...`);
  console.log(`Listening on port ${port}...`);
});
