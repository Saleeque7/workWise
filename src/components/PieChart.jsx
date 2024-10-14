
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import randomColor from 'randomcolor';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Tasks Overview',
        data: data,
        backgroundColor: data.map(() => randomColor()), 
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tasks Overview',
      },
    },
  };

  return (
    <div style={{ height: '400px' }}> 
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
