import React from 'react';
import { Button, Card, Tabs } from 'antd';
import RMBInCapital from './components/RMBInCapital';
import GenerateQRcode from './components/GenerateQRcode';
import ExportCsv from './components/ExportCsv';
import DealData from './components/DealData';
import OCR from './components/OCR';
import Code from './components/Code';
import QrCodeScanner from '../../components/QrCodeScanner';
import { createDatabaseTableApi, deleteDatabaseTableApi } from '../overview/services';


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
    {
      key: '6',
      label: `code`,
      children: <Code />,
    },
  ];

  const handleAdd = () => {
    const payload = {
      tableName: 'invoiceInfo',
      fields: [
        { name: 'id', dataType: 'int', dataLength: 10, notNull: true, AUTO_INCREMENT: true },
        { name: 'code', dataType: 'varchar', dataLength: 30 },
        { name: 'num', dataType: 'varchar', dataLength: 30, notNull: true, },
        { name: 'date', dataType: 'varchar', dataLength: 30, notNull: true, },
        { name: 'checkNum', dataType: 'varchar', dataLength: 30 },
        { name: 'money', dataType: 'varchar', dataLength: 30, notNull: true, other: ', PRIMARY KEY (id)' },
        // { name: 'age', dataType: 'int', dataLength: 10, notNull: true, defaultValue: 18, other: ', PRIMARY KEY (id)' },
      ]
    };

    createDatabaseTableApi(payload).then((res) => {
      console.log(res, 'res');
    })

  }

  const handleDelete = () => {
    const tableName = prompt('请输入');

    deleteDatabaseTableApi({ tableName }).then((res) => {
      console.log(res, 'res');
    })
  }
  
  return (
    <div>
      <Card title="databaseTable" extra={<a href="#">More</a>} style={{ width: 300 }}>
        <p><Button onClick={handleAdd}>add</Button></p>
        <p><Button onClick={handleDelete}>delete</Button></p>
      </Card>
      <Button onClick={() => QrCodeScanner.show()} >sao</Button>
      <Tabs defaultActiveKey="6" items={items} onChange={onChange} />
    </div>
  );
};

export default SmallFunc;
