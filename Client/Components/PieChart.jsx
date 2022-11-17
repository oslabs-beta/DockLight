import * as React from 'react';
const { useEffect, useState } = React;
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

export default function PieChart(props) {
  const { data, title } = props;
  
  const [chartData, setChartData] = useState({
    labels: ['Average Usage', 'Free Space'],
    datasets: [{
      data: [data, (100 - data)],
      backgroundColor: [
        'rgb(255, 99, 500)',
        'rgb(54, 162, 235)',
      ]
    }],
  });
    
  useEffect(() => {
    console.log('heres data', data);
    const newData = data.reduce((acc, curr) => acc + curr) / data.length;
    setChartData({
      labels: ['Usage', 'Free space'],
      datasets: [{
  
        data: [newData, (100 - newData)],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ]
      }],
    });
  }, [data]);

  function getAverage(array, prop) {
    let avg;
    if (!array) {
      return 0;
    } else {
      avg = (array
        .map(container => container[prop])
        .reduce((acc, curr) => acc + curr)) / array.length;
      return avg;
    }
  }
  
  return (
    <div>
      <Pie 
        data={chartData}
        options={{
          plugins: {            
            title: {
              display: true,
              text: title,
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          },
        }}
      />
    </div>
  );
}