import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const MonthlyTaskPerformanceChart = ({ data }) => {
  return (
    <div className="chart-box">
      <h2>Monthly Task Performance</h2>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#00C49F" name="Completed Tasks" />
        <Bar dataKey="pending" fill="#FFBB28" name="Pending Tasks" />
      </BarChart>
    </div>
  );
};

export default MonthlyTaskPerformanceChart;
