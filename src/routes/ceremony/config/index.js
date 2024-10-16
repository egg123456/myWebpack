
import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

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
}) => {
  return [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'addr',
      dataIndex: 'addr',
      key: 'addr',
    },
    // {
    //   title: 'relationShip',
    //   dataIndex: 'relationShip',
    //   key: 'relationShip',
    // },
    {
      title: 'ceremonyMoney',
      dataIndex: 'ceremonyMoney',
      key: 'ceremonyMoney',
    },
    {
      title: 'remark',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: 'operate',
      dataIndex: 'operate',
      key: 'operate',
      render: (val, record) => {
        return (
          <>
            <EditOutlined onClick={() => handleEditClick(record)} />
            <Divider type="vertical" />
            <DeleteOutlined onClick={() => handleDeleteClick(record)} />
          </>
        );
      },
    },
  ];
};

