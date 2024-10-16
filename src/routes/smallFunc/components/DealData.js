import React, { useState } from 'react';
import FormGrid from '../../../components/FormGrid';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import dealDataConf from './dealDataConf';

const dealMethods = [
  { label: 'del html tag', value: 'handleDelHtmlTag', key: 'handleDelHtmlTag' },
  { label: 'previewHtml', value: 'previewHtml', key: 'previewHtml' },
  { label: 'trim', value: 'trim', key: 'trim' },
  { label: 'JSON Format', value: 'JSONFormat', key: 'JSONFormat' },
  { label: 'filterHtmlTag', value: 'filterHtmlTag', key: 'filterHtmlTag' },
  { label: 'filterSpace', value: 'filterSpace', key: 'filterSpace' },
  { label: 'filterReturn', value: 'filterReturn', key: 'filterReturn' },
  
]

const DealData = () => {
  const [form] = Form.useForm();  

  const handleSelectChange = (val) => {
    const oData = form.getFieldValue('originData');
    console.log(val, oData, 'oData');

    if (!val || !oData) return;
    form.setFieldValue('resultData', dealDataConf[val]?.(oData) || '');
  }

  const [num, setNum] = useState();

  const handleChange = (e) => {
    const val = e.target.value;
    console.log(val, 12, val === '-')
    if (val === '-') {
      setNum(val);
      return;
    }
    if (isNaN(val) || val.indexOf('.') > -1) {
      setNum(num);
      return;
    }
    setNum(val);
  }

  return (
    <>
    <FormGrid
      form={form}
      items={[
        { label: 'originData', field: 'originData', render: () => <Input.TextArea /> },
        { label: 'method', render: () => <Select options={dealMethods} onChange={handleSelectChange} /> },
        { label: 'resultData', field: 'resultData', render: () => <Input.TextArea rows={10} /> },
      ]}
      initialValues={{ lowerCaseMoney: 1688.99 }}
      column={1}
    />
      {/* <div>
        <input value={num} onChange={handleChange} />
        <Button onClick={() => setNum(+(num || 0) + 1)}>+</Button>
        <Button onClick={() => setNum(+(num || 0) - 1)}>-</Button>
      </div> */}
    </>
  );
};

export default DealData;