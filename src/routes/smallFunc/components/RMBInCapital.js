import React from 'react';
import FormGrid from '../../../components/FormGrid';
import { Form, Button } from 'antd';
import { getAmountChinese } from '../../../utils/convertRMB';

const RMBInCapital = () => {
  const [form] = Form.useForm();

  const handleConvertCase = () => {
    const { lowerCaseMoney } = form.getFieldsValue();
    const ans = getAmountChinese(lowerCaseMoney);
    form.setFieldsValue({ upperCaseMoney: ans });
  }

  return (
    <div style={{ margin: '0 100px' }}>
    <FormGrid
      form={form}
      items={[
        { label: '小写金额', field: 'lowerCaseMoney' },
        { field: 'btn', render: () => <Button style={{ float: 'right' }} onClick={() => handleConvertCase()}>转换为大写</Button> },
        { label: '大写金额', field: 'upperCaseMoney' },
      ]}
      initialValues={{ lowerCaseMoney: 1688.99 }}
      column={1}
    />
    </div>
  );
};

export default RMBInCapital;