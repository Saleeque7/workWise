
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import randomColor from 'randomcolor';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Task Counts',
        data: data,
        backgroundColor: data.map(() => randomColor()),
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
        text: 'Task Counts Overview',
      },
    },
  };

  return (
    <div style={{ height: '400px' }}> 
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
