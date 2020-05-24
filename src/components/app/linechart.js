import React from 'react';
import Chart from 'chart.js';

export const LineChart = ({
  chartData
}) => {
  const {
    ids,
    points
  } = chartData;
  var ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ids,
      datasets: [{
        label: '# of Votes',
        data: points,
        pointBackgroundColor: 'rgba(65, 105, 225, 1)',
        backgroundColor: [
          'rgba(255, 255, 255, 0.2)'
        ],
        borderColor: [
          'rgba(65, 105, 225, 0.5)'
        ],
        borderWidth: 4
      }]
    },
    options: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Votes'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'ID'
          }
        }]
      }
    }
  });
  return <div id = "chartDiv"> </div>;
};