const express = require("express");
const metrics = require("../routes/cpuMetrics");
const error = require("../middleware/error");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

module.exports = function (app) {
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use("/api/cpuMetrics", metrics);
  app.use(error);
};
