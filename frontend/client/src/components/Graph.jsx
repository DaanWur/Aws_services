import React, { Component } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./Graph.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const { data: initData, options: initOptions } = require("./graphObj.json");
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

class Graph extends Component {
  state = {
    data: null,
    options: null,
    ipvar: "172.31.74.202",
    timePeriod: 1,
    interval: 3600,
  };
  async componentDidMount() {
    await this.talkToBe();
  }

  talkToBe = async () => {
    await axios
      .get(
        `http://localhost:8080/api/cpuMetrics/ip/${this.state.ipvar}/timePeriod/${this.state.timePeriod}/interval/${this.state.interval}`
      )
      .then((result) => result.data)
      .then((res) => {
        this.setState({
          data: res.retData,
          options: res.retOptions,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (name, value) => {
    console.log("here", value);
    if (name === "TimePeriod") {
      console.log("here");
      this.setState({ timePeriod: value });
    } else if (name === "Period") {
      this.setState({ interval: value });
    } else {
      this.setState({ ipvar: value });
    }

    this.talkToBe();
  };

  handleSubmit = (e) => {
    console.log(this.state);
    e.preventDefault();
  };
  render() {
    return (
      <div>
        <div className="Form">
          <form onSubmit={this.handleSubmit}>
            <label>
              Days:
              <input
                className="TimePeriod"
                name="TimePeriod"
                type="text"
                value={this.state.timePeriod}
                onChange={(e) =>
                  this.handleChange(e.target.name, e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Period:
              <input
                className="Period"
                name="Period"
                type="number"
                value={this.state.interval}
                onChange={(e) =>
                  this.handleChange(e.target.name, e.target.value)
                }
              />
            </label>
            <br />
            <label>
              IP Address:
              <input
                className="IPAddress"
                name=" IPAddress"
                type="string"
                value={this.state.ipvar}
                onChange={(e) =>
                  this.handleChange(e.target.name, e.target.value)
                }
              />
            </label>
            <br />
          </form>
        </div>
        <div className="Graph">
          <h2>Home Assignment</h2>
          <Line
            options={this.state.options ? this.state.options : initOptions}
            data={this.state.data ? this.state.data : initData}
          />
        </div>
      </div>
    );
  }
}

export default Graph;
