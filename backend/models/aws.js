const winston = require("winston");
const {
  CloudWatchClient,
  GetMetricStatisticsCommand,
  ListMetricsCommand,
} = require("@aws-sdk/client-cloudwatch");
const config = require("config");

const region = config.get("region");

const cwClient = new CloudWatchClient({ region: region });

const getCPUUtilization = async (ip, timePeriod, interval) => {
  if (ip === null && timePeriod === null && interval === null) {
    ip = "172.31.74.202";
    timePeriod = 1;
    interval = 3600;
  }
  let today = new Date();
  let dateToStart = new Date();
  let dateOffset = 24 * 60 * 60 * 1000 * timePeriod;
  dateToStart.setTime(today.getTime() - dateOffset);
  const params = {
    Dimensions: [
      {
        Name: "InstanceId",
        Value: `i-0a86544205999b1cf`,
      },
    ],
    Namespace: `AWS/EC2`,
    // NamespaceIp: ip,
    MetricName: "CPUUtilization",
    Period: interval,
    Unit: "Percent",
    StartTime: dateToStart,
    EndTime: today,
    Statistics: ["Maximum", "Minimum", "Average"],
  };
  try {
    return await cwClient.send(new GetMetricStatisticsCommand(params));
  } catch (err) {
    console.log(err);
  }
};
module.exports = getCPUUtilization;
