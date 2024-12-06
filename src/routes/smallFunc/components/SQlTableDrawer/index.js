import { Button, Drawer } from 'antd';
import React, { useState } from 'react';
import withFunctionalCall from '../../../../hocs/withFunctionalCall';
import EditableTable from '../../../../components/EditableTable';

// columns 
const columns = [
  {
    title: 'fieldCode',
    dataIndex: 'name',
    width: '25%',
    editable: true,
    inputType: 'text'
  },
  {
    title: 'dataType',
    dataIndex: 'dataType',
    width: '20%',
    editable: true,
    inputType: 'select',
    formItemProps: {
      options: [
        { label: 'varchar', value: 'varchar' },
        { label: 'int', value: 'int' },
      ]
    }
  },
  {
    title: 'dataLength',
    dataIndex: 'dataLength',
    width: '15%',
    editable: true,
    inputType: 'number',
  },
  {
    title: 'not null',
    dataIndex: 'notNull',
    width: '15%',
    editable: true,
    inputType: 'select',
    formItemProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ]
    }  },
  {
    title: 'PRIMARY KEY',
    dataIndex: 'other',
    width: '15%',
    editable: true,
    inputType: 'select',
    formItemProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ]
    }
  },
];

const SQlTableDrawer = ({ onCancel, visible, onOk }) => {
  const [tableData, setTableData] = useState([]);

  const handleSubmit = () => {
    console.log(tableData,'sda')
    onOk?.(tableData);
    onCancel();
  }

  return (
    <Drawer
      open={visible}
      width={800}
      title={(
        <div>
          编辑
          <Button style={{ float: 'right' }} onClick={handleSubmit}>提交</Button>
        </div>
      )}
      onClose={oncancel}
    >
      <EditableTable
        columns={columns}
        // dataSource={[]}
        onChange={setTableData}
      />
    </Drawer>
  )
}

export default withFunctionalCall(SQlTableDrawer);
