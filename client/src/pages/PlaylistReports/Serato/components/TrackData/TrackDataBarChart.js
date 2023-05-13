import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./trackdatabarchart.css";

const BarChart = (props) => {
  const { data, startTime, endTime } = props;
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && chartRef.current) {
      d3.select(chartRef.current).selectAll("*").remove();

      // Convert MM:SS time format to seconds
      const dataInSeconds = data.map((timeStr) => {
        const [minutes, seconds] = timeStr.split(":");
        return parseInt(minutes) * 60 + parseInt(seconds);
      });

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 600 - margin.left - margin.right;
      const height = 200 - margin.top - margin.bottom;

      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
      const y = d3.scaleLinear().rangeRound([height, 0]);

      const svg = d3
        .select(chartRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      x.domain(dataInSeconds.map((d, i) => i));
      y.domain([0, d3.max(dataInSeconds, (d) => d)]);

      svg
        .append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0, ${height})`);
      // .call(d3.axisBottom(x))

      // x-axis label
      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .text("track lengths over this set");

      // start time label
      svg
        .append("text")
        .attr("text-anchor", "start")
        .attr("class", "x-axis-start-time")
        .attr("x", 0)
        .attr("y", height + margin.bottom - 10)
        .attr("fill", "white")
        .style("font-size", "calc(1em - 5px)")
        .text(startTime + " PM");

      // end time label
      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("class", "x-axis-end-time")
        .attr("x", width)
        .attr("y", height + margin.bottom - 10)
        .attr("fill", "white")
        .style("font-size", "calc(1em - 5px)")
        .text(endTime + " PM");

      // y-axis label
      svg
        .append("g")
        .attr("class", "axis axis--y")
        .call(
          d3
            .axisLeft(y)
            .ticks(10)
            .tickFormat((d) => {
              const minutes = Math.floor(d / 60);
              const seconds = d % 60;
              return `${minutes}:${seconds.toString().padStart(2, "0")}`;
            })
        )
        .append("text")
        .attr("fill", "white")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Track Length");

      // bar chart properties
      svg
        .selectAll(".bar")
        .data(dataInSeconds)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => x(i))
        .attr("y", (d) => y(d))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d))
        .attr("fill", "purple");
    }
  }, [data]);

  return <svg ref={chartRef} />;
};

export default BarChart;
