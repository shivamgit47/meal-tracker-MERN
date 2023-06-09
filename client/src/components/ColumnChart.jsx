import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const ColumnChart = ({data}) => {
  console.log(data);
  const nut1 = data.meal1;
  const nut2 = data.meal2;
  const nut3 = data.meal3;
  const nut4 = data.meal4;
  const series = [
    {
      name: 'Protein',
      data: [nut1.protein, nut2.protein, nut3.protein, nut4.protein]
    },
    {
      name: 'Carbs',
      data: [nut1.carb, nut2.carb, nut3.carb, nut4.carb]
    },
    {
      name: 'Fat',
      data: [nut1.fat, nut2.fat, nut3.fat, nut4.fat]
    }
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Meal 1', 'Meal 2', 'Meal 3', 'Meal 4',]
    },
    yaxis: {
      title: {
        text: 'grams'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return ' ' + val + ' grams';
        }
      }
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};
