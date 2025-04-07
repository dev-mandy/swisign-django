import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { blue, green, orange } from '@mui/material/colors';

const getLast12Months = () => {
  const months = [];
  const today = new Date();
  for (let i = 0; i < 12; i++) {
    const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const year = month.getFullYear().toString().slice(-2);
    const monthName = month.toLocaleDateString('ko-KR', { month: '2-digit' });
    months.unshift(`${year}년 ${monthName}`);
  }
  return months;
}

const Chart = () => {
  const data = getLast12Months();
  const colorPalette = [
    blue[500], // 매매 컬러
    green[500], // 전세 컬러
    orange[500], // 월세 컬러
  ];
  return (
    <LineChart
      colors={colorPalette}
      xAxis={[
        {
          scaleType: 'point',
          data,
          tickInterval: 1,
        },
      ]}
      series={[
        {
          id: 'sale',
          label: '매매',
          showMark: false,
          curve: 'linear',
          stack: 'total',
          area: true,
          stackOrder: 'ascending',
          data: [5200, 4300, 3100, 2800, 2300, 4000, 5000, 4600, 4100, 4400, 4200, 9000],
        },
        {
          id: 'charter',
          label: '전세',
          showMark: false,
          curve: 'linear',
          stack: 'total',
          area: true,
          stackOrder: 'ascending',
          data: [4200, 3300, 2100, 1800, 1300, 3000, 4000, 3600, 3100, 3400, 3200, 8000],
        },
        {
          id: 'rent',
          label: '월세',
          showMark: false,
          curve: 'linear',
          stack: 'total',
          stackOrder: 'ascending',
          data: [500, 700, 100, 300, 1300, 1500, 1700, 1200, 2100, 2300, 2500, 4000],
          area: true,
        },
      ]}
      height={250}
      margin={{ left: 40, right: 10, top: 20, bottom: 20 }}
      grid={{ horizontal: true }}
      sx={{
        '& .MuiAreaElement-series-rent': {
          fill: "url('#rent')",
        },
        '& .MuiAreaElement-series-charter': {
          fill: "url('#charter')",
        },
        '& .MuiAreaElement-series-sale': {
          fill: "url('#sale')",
        },
        mb: 3,
      }}
      slotProps={{
        legend: {
          hidden: true,
        },
      }}
    >
    </LineChart>
  )
};

export default Chart;