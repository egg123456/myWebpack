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
    title: '题目',
    dataIndex: 'title',
  },
  {
    title: '题目描述',
    dataIndex: 'titleDesc',
  },
  {
    title: '输入描述',
    dataIndex: 'inputDesc',
  },
  {
    title: '输出描述',
    dataIndex: 'outputDesc',
  },
  {
    title: '用例',
    dataIndex: 'useCase',
  },
  {
    title: 'code',
    dataIndex: 'code',
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
