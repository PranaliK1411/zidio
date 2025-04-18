import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const TaskOverviewChart = ({ data }) => {
  const COLORS = ["#00C49F", "#FFBB28", "#FF4444"]; // Colors for Completed, Pending, and Overdue

  return (
    <div className="chart-box">
      <h2>Task Overview</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default TaskOverviewChart;
