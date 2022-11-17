import * as React from 'react';
const { useEffect, useState } = React;
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

export default function StatChart(props) {
  let { data } = props;


  const [chartData, setChartData] = useState({
    labels: ['Usage', 'Free Space'],
    datasets: [{
      data: [data, (100 - data)],
      backgroundColor: [
        'rgb(255, 99, 500)',
        'rgb(54, 162, 235)',
      ]
    }],
  });
  
  useEffect(() => {
    data = parseFloat(data) * 10;
    setChartData({
      labels: ['Usage', 'Free space'],
      datasets: [{

        data: [data, (100 - data)],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ]
      }],
    });
  }, [data]);

  return (
    <div>
      <Doughnut 
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            }
          },
          maintainAspectRatio: false
        }}
        //width={'50%'}
      />
    </div>
  );
}