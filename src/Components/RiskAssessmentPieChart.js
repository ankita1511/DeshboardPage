import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Connected', value: 50 },
  { name: 'Not Connected', value: 50 },

];

const COLORS = ['#20A7DB', '#cfecf7'];

function RiskAssessmentPieChart() {
  return (
    <PieChart width={200} height={250}>
      <Pie
        data={data}
        cx={100}
        cy={100}
        innerRadius={40}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default RiskAssessmentPieChart;
