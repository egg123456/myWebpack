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
            { label: '名称', field: 'name', rules: [{ required: true, message: '请输入' }] },
            { label: '所属年份', field: 'year', initialValue: 2024, render: () => (
              <Select
                // showSearch
                // labelInValue
                filterOption={false}
                // onSearch={(v) => { handlePlanSearch(v) }}
                style={{ width: '100%' }}
                // options={plans}
                // onSelect={handleVersionSelect}
              >
                {[+currYear + 1, currYear, currYear - 1, currYear - 2].map((v) => {
                  return <Select.Option value={v} key={v}>{v}</Select.Option>
                })}
              </Select>
            ) 
            },
            { label: '开始时间', field: 'startTime', render: () => 
              <DatePicker showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }} />
            },
            { label: '结束时间', field: 'endTime', render: () => 
              <DatePicker showTime={{ defaultValue: dayjs('23:59:59', 'HH:mm:ss') }} />
            },
            { label: '类型', field: 'type', initialValue: 'festival', render: () => (
              <Select
                style={{ width: 120 }}
                loading
                options={[
                  { value: 'festival', label: '休假' },
                  { value: 'patch', label: '补班' }
                ]}
              />
            )
            },
            { label: '备注', field: 'remark' },
          ],
          initialValues: detail,
        }} 
      />
    </Modal>
  );
};

export default withFunctionalCall(EditEventModal);
