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
    title: '事项名称',
    dataIndex: 'name',
  },
  {
    title: '里程碑',
    dataIndex: 'startTime',
    render: (v, { endTime }) => {
      return (
        <>
          <div>开始时间: {v}</div>
          <div>结束时间: {endTime}</div>
        </>
      )
    },
  },
  {
    title: '类型',
    dataIndex: 'type',
    render: (v) => v === 'festival' ? '休假' : '补班',
  },
  {
    title: '备注',
    dataIndex: 'remark',
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
