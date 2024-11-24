import { Divider } from 'antd';
import React from 'react';
import TableMergeFields from '../../../components/TableMergeFields';

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
    title: '发票信息',
    dataIndex: 'code',
    render: (val, record) => {
      return <TableMergeFields fieldInfos={[
        { label: '发票代码', value: val },
        { label: '发票号码', value: record.num },
        { label: '开票日期', value: record.date },
        { label: '校验码', value: record.checkNum },
      ]} />
    }
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
