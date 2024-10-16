import React from 'react';
import dayjs from 'dayjs';

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
    render: (val, { link }) => link ? <a href={link}>{val}</a> : val,
  },
  {
    title: '里程碑',
    dataIndex: 'submitTest',
    width: 240,
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
    title: '同步情况',
    dataIndex: 'publishedEnv',
    width: 240,
    render: (v, { publishedEnv = '[]' }) => {
      if (publishedEnv === '[]') return '-';
      return JSON.parse(publishedEnv)?.map?.(({ env, publishTime, link }) => {
        const content = ENV_LIST.find(item => item.value === env)?.label + ': ' + (publishTime ? dayjs().format(dateTimeFormat) : '-');
        return link ? <a href={link}>{content}</a> : <div>{content}</div>
      });
    },
  },
  {
    title: '类型',
    dataIndex: 'planType',
  },
  {
    title: '子事项',
    dataIndex: 'eventIds',
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

export const ENV_LIST = [
  { value: 'yun', label: '云平台' },
  { value: 'shanXi', label: '山西' },
  { value: 'wuXi', label: '无锡' },
  { value: 'anHui', label: '安徽' },
  { value: 'guiZhou', label: '贵州' },
  { value: 'daLian', label: '大连' },
  { value: 'shangHai', label: '山海' },
];
