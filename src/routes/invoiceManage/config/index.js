import { Divider } from 'antd';
import React from 'react';

export const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

export const getCustomItem = () => {
  return [
    {
      label: 'year',
      field: 'year',
    },
  ]
}

export const getColumns = ({
  handleEditClick,
  handleDeleteClick,
}) => [
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '发票代码',
    dataIndex: 'code',
  },
  {
    title: '发票号码',
    dataIndex: 'num',
  },  
  {
    title: '开票日期',
    dataIndex: 'date',
  },
  {
    title: '校验码',
    dataIndex: 'checkNum',
  },
  {
    title: '金额',
    dataIndex: 'money',
  },
  {
    title: '操作',
    dataIndex: 'id',
    render: (val, record) => {
      return (
        <>
          <a onClick={() => handleEditClick(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => handleDeleteClick(record)}>删除</a>
        </>
      );
    }
  },
];
