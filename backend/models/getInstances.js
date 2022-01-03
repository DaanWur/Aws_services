// 
const winston = require('winston');
const { CloudWatchClient, GetMetricStatisticsCommand, ListMetricsCommand } = require("@aws-sdk/client-cloudwatch");
const config = require('config');

const region = config.get('region');
const cwClient = new CloudWatchClient({ region: region });
const getCPUUtilizationList = async (ip, timePeriod, interval) => {

    const region = config.get('region');
    // Set the parameters
    const params = {
    MetricName: "CPUUtilization",
    };

    try {
        let a = await cwClient.send(new ListMetricsCommand(params));
        
        return a;
          
        } catch (err) {
          
            console.log(err);
        }
};

module.exports = getCPUUtilizationList;


  
  
  