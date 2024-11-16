import React, { useState } from 'react';
import { Input, Form, Button, Radio } from 'antd';
import './index.css';
import { loginApi, registerApi } from './services'
import { useNavigate } from "react-router-dom";
import { useForm } from 'antd/es/form/Form';
import docCookies from '../utils/docCookies';

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signIn');

  const onFinish = (values) => {
    (mode === 'signUp' ? registerApi : loginApi)(values).then(res => {
      alert(JSON.stringify(res), 'res');
      const { token, name, id, phone } = res;
      sessionStorage.setItem('token', token);
      document.cookie = `token=${token};`
      // docCookies.setItem('token', token, '/view')
      const defaultUrl = '/event/list';
      let url = localStorage.getItem('xxx_skipUrl');
      url = url ? url.replace(/.*\/view/, '') : defaultUrl;
      navigate(url);
    })
  };

  console.log('123', 'login')

  return (
    <div className="align-center-point">
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ width: 600, height:168 }}
      initialValues={{ phone: '18797819550', password: '123' }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="align-center-point_content"
    >
      <Form.Item>
        <Radio.Group
          options={ [
            { label: 'sign in', value: 'signIn' },
            { label: 'sign up', value: 'signUp' },
          ]}
          value={mode}
          optionType="button"
          buttonStyle="solid"
          onChange={e => { setMode(e.target.value) }}
        />
      </Form.Item>
      {mode === 'signUp' && (
      <Form.Item
        label="name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>)}
      <Form.Item
        label="phone"
        name="phone"
        rules={[{ required: true, message: 'Please input your phone!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
}

export default Login;