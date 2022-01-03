let data = {
  labels: [],
  datasets: [
    {
      label: "AVG CPU USAGE",
      data: [],
      borderColor: "#85b0bd",
      fill: true,
      backgroundColor: "#2e4355",
      pointBorderColor: "#8884d8",
      pointBorderWidth: 2,
      pointRadius: 10,
      tension: 0.8,
    },
  ],
};

let options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Avg cpu usage of AWS instance",
    },
    legend: {
      display: true,
    },
  },
  layout: { padding: { bottom: 1 } },
  scales: {
    y: {
      display: true,
      title: {
        display: true,
        text: "Percentage",
        padding: 20,
        font: {
          size: 16,
        },
      },
      ticks: {
        padding: 20,
        color: "white",
        font: {
          size: 16,
        },
      },
      grid: {
        color: "#53666c",
      },
    },
    x: {
      display: true,
      title: {
        display: true,
        text: "Hour",
        padding: 175,

        font: {
          size: 16,
        },
      },

      ticks: {
        max: 100,
        beginAtZero: true,
        padding: 20,
        min: 1,
        color: "white",
        font: {
          size: 18,
        },
      },
    },
  },
};

module.exports = { options, data };
