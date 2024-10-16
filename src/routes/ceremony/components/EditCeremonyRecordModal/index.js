import React, { useEffect, useState } from 'react';
import withFunctionalCall from '../../../../hocs/withFunctionalCall';
import { Modal, Form, message } from 'antd';
import FormGrid from '../../../../components/FormGrid';
import { dealDateTimeToDayjs } from '../../../../utils/FormatUtils';
import { addCeremonyRecordApi, editCeremonyRecordApi, fetchCeremonyRecordDetail } from '../../services/ceremonyRecord';


const EditCeremonyRecordModal = ({ 
  visible, onCancel, operateType = 'add', record = {}, onOk,
}) => {
  const [form] = Form.useForm();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    if (operateType === 'add') return;
    fetchCeremonyRecordDetail(record).then((res) => {
      setDetail(dealDateTimeToDayjs(res?.result));
    })
  }, [])

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(values, 'values');
      (operateType === 'edit' ? editCeremonyRecordApi : addCeremonyRecordApi)({
        id: record.id,
        belongTo: record.belongTo,
        ...values, 
      }).then(() => {
        message.info('操作成功');
        onCancel();
        onOk && onOk();
      })
    })
  }

  return (!detail?.id && operateType === 'edit') ? null : (
    <Modal
      open={visible}
      title="投标文件下载"
      width={800}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <FormGrid 
        {...{ 
          form, 
          items: [
            { label: 'name', field: 'name', rules: [{ required: true, message: '请输入' }] },
            { label: 'addr', field: 'addr' },
            { label: 'ceremonyMoney', field: 'ceremonyMoney' },
            // { label: 'belongToCB', field: 'belongTo', initialValue: operateType === 'add' ? record.belongTo : undefined },
            { label: 'remark', field: 'remark' },
          ],
          initialValues: detail,
        }} 
      />
    </Modal>
  );
};

export default withFunctionalCall(EditCeremonyRecordModal);
