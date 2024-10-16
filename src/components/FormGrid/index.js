import React from 'react';
import { Row, Col, Input } from 'antd';
import { Form } from 'antd';

const FormGrid = ({ form, items = [], column = 2, initialValues }) => {
  return (
    <Form form={form} initialValues={initialValues} labelCol={{ xs: 6 }} wrapperCol={{ xs: 18 }} >
    <Row gutter={15}>
      {items.map(item => {
        const { field, render, ...rest } = item;
        return (
          <Col span={24 / column} key={field}>
            <Form.Item
              name={field}
              {...rest}
            >
              {typeof render === 'function' ? render() : <Input />}
              {/* <Input /> */}
            </Form.Item>
          </Col>
        );
      })}
    </Row>
    </Form>
  );
}

export default FormGrid;
