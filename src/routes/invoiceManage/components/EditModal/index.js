import React, { useCallback, useEffect, useState } from 'react';
import withFunctionalCall from '../../../../hocs/withFunctionalCall';
import { Modal, Form, DatePicker, Select, Button, Row, Col, message } from 'antd';
import FormGrid from '../../../../components/FormGrid';
import { addApi, editApi } from '../../services';
import { dateTimeFormat } from '../../config';
import dayjs from 'dayjs';

const currYear = dayjs().format('YYYY');


const EditEventModal = ({ 
  visible, onCancel, operateType = 'add', record = {}, onOk,
}) => {
  const [form] = Form.useForm();
  const [detail, setDetail] = useState(record);

  // useEffect(() => {
  //   if (operateType === 'add') return;
  //   fetchEventDetail(record).then((res) => {
  //     setDetail(dealDateTimeToDayjs(res?.result));
  //   })
  // }, [])

  const handleOk = () => {
    form.validateFields().then((values) => {
      const { startTime, endTime } = values;
      console.log(values, 'values');
      const payload = {
        id: record.id,
        ...values, 
        startTime: startTime ? startTime.format(dateTimeFormat) : undefined,
        endTime: endTime ? endTime.format(dateTimeFormat) : undefined, 
      };
      (operateType === 'edit' ? editApi : addApi)(payload).then(() => {
        message.info('操作成功');
        onCancel();
        onOk && onOk();
      })
    })
  }

  return (!detail?.id && operateType === 'edit') ? null : (
    <Modal
      open={visible}
      title="festival"
      width={800}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <FormGrid 
        {...{ 
          form, 
          items: [
            { label: '发票代码', field: 'code' },
            { label: '发票号码', field: 'num', rules: [{ required: true, message: '请输入' }] },
            { label: '开票日期', field: 'date', rules: [{ required: true, message: '请输入' }] },
            { label: '校验码', field: 'checkNum', },
            { label: '金额', field: 'money', rules: [{ required: true, message: '请输入' }] },
            { label: '备注', field: 'remark' },
          ],
          initialValues: detail,
        }} 
      />
    </Modal>
  );
};

export default withFunctionalCall(EditEventModal);
