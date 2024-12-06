import React, { useState } from 'react';
import { Button, Form, Popconfirm, Table, Typography } from 'antd';
import EditableCell from './EditableCell';

const DEFAULT_EDITING_KEY = '';

const EditableTable = ({ dataSource, columns, onChange }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(dataSource || []);
  const [editingKey, setEditingKey] = useState(DEFAULT_EDITING_KEY);
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey(DEFAULT_EDITING_KEY);
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey(DEFAULT_EDITING_KEY);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey(DEFAULT_EDITING_KEY);
      }
      onChange?.(newData);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleAdd = () => {
    const defaultRow = {
      key: new Date().getTime(),
    }

    setData([...data, defaultRow]);
    if (editingKey === DEFAULT_EDITING_KEY) {
      setEditingKey(defaultRow.key)
    }
  }

  const mergedColumns = [
    ...columns,
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ].map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        formItemProps: col.formItemProps,
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Button onClick={handleAdd}>add</Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default EditableTable;
