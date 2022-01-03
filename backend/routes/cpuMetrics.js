const express = require("express");
const router = express.Router();
const getCPUUtilization = require("../models/aws");
const getCPUUtilizationList = require("../models/getInstances");
let { options, data } = require("../models/graphData");

//GET CPU usage
router.get(
  "/ip/:ip/timePeriod/:timePeriod/interval/:interval",
  async (req, res) => {
    let a = await getCPUUtilization(
      req.params.ip,
      req.params.timePeriod,
      req.params.interval
    );
    let avgVals = a.Datapoints.map((tmpobj) => tmpobj.Average * 100);
    data.labels = range(req.params.timePeriod);
    data.datasets[0].data = avgVals;
    res.send({ retData: data, retOptions: options });
  }
);

router.get("/:ip", async (req, res) => {
  let a = await getCPUUtilizationList(
    req.params.ip,
    req.params.timePeriod,
    req.params.interval
  );
  res.send(a.Metrics[0].Dimensions);
});

range = (timePeriod) => {
  let arr = [];
  for (let i = 1; i < timePeriod * 24 + 1; i++) {
    if (i % 12 === 0) arr.push(12);
    else arr.push(i % 12);
  }
  return arr;
};
module.exports = router;
