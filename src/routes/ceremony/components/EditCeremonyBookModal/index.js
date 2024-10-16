import React, { useCallback, useEffect, useState } from 'react';
import withFunctionalCall from '../../../../hocs/withFunctionalCall';
import { Modal, Form, DatePicker, Select, Button, Row, Col, message } from 'antd';
import FormGrid from '../../../../components/FormGrid';
import { addCeremonyBookApi, editCeremonyBookApi, fetchCeremonyBookDetail } from '../../services';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { dateTimeFormat, dealDateTimeToDayjs, toDayJs } from '../../../../utils/FormatUtils';
import solarLunar from 'solarLunar';

const EditCeremonyBookModal = ({ 
  visible, onCancel, operateType = 'add', record = {}, onOk,
}) => {
  const [form] = Form.useForm();
  const [detail, setDetail] = useState({ eventTimeList: [] });
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    if (operateType === 'add') return;
    fetchCeremonyBookDetail(record).then((res) => {
      setDetail(dealDateTimeToDayjs(res?.result));
    })
  }, [])

  const handleOk = () => {
    form.validateFields().then((values) => {
      const { gregorianCalendar } = values;
      console.log(values, 'values');
      const payload = {
        id: record.id,
        ...values, 
        gregorianCalendar: gregorianCalendar ? gregorianCalendar.format(dateTimeFormat) : undefined,
      };
      (operateType === 'edit' ? editCeremonyBookApi : addCeremonyBookApi)(payload).then(() => {
        message.info('操作成功');
        onCancel();
        onOk && onOk();
      })
    })
  }

  const handleGregorianCalendarChange = (val) => {
    const solar = val.format('YYYY-MM-DD').split('-');
    const lunarCalendar = solarLunar.solar2lunar(solar[0], solar[1], solar[2]);
    console.log(lunarCalendar, 'lunarCalendar')
    form.setFieldsValue({ 
      lunarCalendar: `${lunarCalendar.yearCn + lunarCalendar.monthCn + lunarCalendar.dayCn}`
    })
  }

  return (!detail?.id && operateType === 'edit') ? null : (
    <Modal
      open={visible}
      title={operateType}
      width={800}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <FormGrid 
        {...{ 
          form, 
          items: [
            { label: '名称', field: 'name', rules: [{ required: true, message: '请输入' }] },
            { label: '日期', field: 'gregorianCalendar', render: () => 
              <DatePicker 
                showTime={{ defaultValue: dayjs('18:00:00', 'HH:mm:ss') }} 
                onChange={handleGregorianCalendarChange} 
              />
            },
            { label: '农历日期', field: 'lunarCalendar' },
            { label: '所属人电话', field: 'belongTo', initialValue: operateType === 'add' ? record.belongTo : undefined },
          ],
          initialValues: detail,
        }} 
      />
    </Modal>
  );
};

export default withFunctionalCall(EditCeremonyBookModal);
