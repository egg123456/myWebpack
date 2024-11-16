import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import Interval from './components/Interval';
import Line from './components/Line';
import Pie from './components/Pie';
import Map from './components/Map';

const AntV = () => {

  const items = [
    {
      key: 'interval',
      label: `柱状`,
      children: <Interval />,
    },
    {
      key: 'line',
      label: `折线`,
      children: <Line />,
    },
    {
      key: 'pie',
      label: `饼图`,
      children: <Pie />,
    },
    {
      key: 'map',
      label: `地图`,
      children: <Map />,
    },
    {
      key: '5',
      label: `ocr`,
      // children: <OCR />,
    },
  ];
  
  return (
    <div>
      <Tabs defaultActiveKey="interval" items={items} />
    </div>
  );
}

export default AntV;
