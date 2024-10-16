import React from 'react';

export const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

export const getCustomItem = () => {
  return [
    {
      label: 'username',
      field: 'username',
    },
    {
      label: 'addr',
      field: 'addr',
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
    dataIndex: 'submitTest',
    render: (v, { publishTime }) => {
      return (
        <>
          <div>提測: {v}</div>
          <div>发布: {publishTime}</div>
        </>
      )
    },
  },
  {
    title: '类型',
    dataIndex: 'eventType',
  },
  {
    title: '子事项',
    dataIndex: 'eventIds',
  },
  {
    title: '执行人',
    dataIndex: 'implementor',
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
          <a onClick={() => handleDeleteClick(record)}>删除</a>
        </>
      );
    }
  },
];
