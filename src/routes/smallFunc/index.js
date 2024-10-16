import React from 'react';
import { Tabs } from 'antd';
import RMBInCapital from './components/RMBInCapital';
import GenerateQRcode from './components/GenerateQRcode';
import ExportCsv from './components/ExportCsv';
import DealData from './components/DealData';
import OCR from './components/OCR';


const SmallFunc = () => {
  const onChange = (key) => {
    console.log(key);
  };
  
  const items = [
    {
      key: '1',
      label: `RMB in capital`,
      children: <RMBInCapital />,
    },
    {
      key: '2',
      label: `GenerateQRcode`,
      children: <GenerateQRcode />,
    },
    {
      key: '3',
      label: `export csv`,
      children: <ExportCsv />,
    },
    {
      key: '4',
      label: `deal data`,
      children: <DealData />,
    },
    {
      key: '5',
      label: `ocr`,
      children: <OCR />,
    },
  ];
  
  return <Tabs defaultActiveKey="4" items={items} onChange={onChange} />;
};

export default SmallFunc;
