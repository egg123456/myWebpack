import React from 'react';
import { Table, Form, Input, Button } from 'antd';

const List = ({ onSearch, customItem = [], table = {} }) => {
  const [form] = Form.useForm();

  const handleSearch = () => {
    const values = form.getFieldsValue();
    onSearch && onSearch(values);
  }

  return (
    <>
      <Form layout="inline" form={form} >
        {customItem.map(item => {
          const { field, label, render } = item;
          return (
            <Form.Item
              label={label}
              name={field}
              key={label}
            >
              {typeof render === 'function' ? render() : <Input />}
            </Form.Item>
          )
        })}
        {/* <Form.Item
          label="addr"
          name="addr"
          rules={[{ message: 'Please input your addr!' }]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" onClick={handleSearch}>
            search
          </Button>
        </Form.Item>
      </Form>
      <Table {...table} />
    </>
  );
};

export default List;
