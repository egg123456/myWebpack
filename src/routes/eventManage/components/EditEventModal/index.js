import React, { useCallback, useEffect, useState } from 'react';
import withFunctionalCall from '../../../../hocs/withFunctionalCall';
import { Modal, Form, DatePicker, Select, Button, Row, Col, message } from 'antd';
import FormGrid from '../../../../components/FormGrid';
import { addEventApi, editEventApi, fetchEventDetail } from '../../services';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { dateTimeFormat } from '../../config';
import dayjs from 'dayjs';
import { dealDateTimeToDayjs, toDayJs } from '../../../../utils/FormatUtils';
import { fetchPlanList } from '../../services/plan';
import { debounce} from 'lodash';


const EditEventModal = ({ 
  visible, onCancel, operateType = 'add', record = {}, onOk,
}) => {
  const [form] = Form.useForm();
  const [detail, setDetail] = useState({ eventTimeList: [] });
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    if (operateType === 'add') return;
    fetchEventDetail(record).then((res) => {
      setDetail(dealDateTimeToDayjs(res?.result));
    })
  }, [])

  const handleOk = () => {
    form.validateFields().then((values) => {
      const { submitTest, publishTime } = values;
      console.log(values, 'values');
      const payload = {
        id: record.id,
        ...values, 
        belongToVersion: values.belongToVersion ? values.belongToVersion?.key : undefined,
        submitTest: submitTest ? submitTest.format(dateTimeFormat) : undefined,
        publishTime: publishTime ? publishTime.format(dateTimeFormat) : undefined, 
        eventTimeList: values.eventTimeList?.map(el => (
          { 
            beginTime: el.beginTime?.format(dateTimeFormat), 
            endTime: el.endTime?.format(dateTimeFormat),
            timeType: el.timeType,
            implementor: values.implementor,
          }
        ))
      };
      (operateType === 'edit' ? editEventApi : addEventApi)(payload).then(() => {
        message.info('操作成功');
        onCancel();
        onOk && onOk();
      })
    })
  }

  /**
   * @description: 计划搜索
   * @param {*} value
   * @return {*}
   */  
  const handlePlanSearch = useCallback(debounce((value) => {
    console.log('search:', value);
    setPlans([]);
    fetchPlanList({ name: value }).then((res) => {
      console.log(res?.result?.data, 'res');
      setPlans(res?.result?.data?.map?.((item, i) => {
        const { name, id, ...rest } = item;
        return { ...rest, value: id, label: name };
      }) || []);
    })
  }, 300), []);

  const handleVersionSelect = (labelInValue, { item } = {}) => {
    form.setFieldsValue({ submitTest: toDayJs(item.submitTest), publishTime: toDayJs(item.publishTime) })
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
            { label: '名称', field: 'name', rules: [{ required: true, message: '请输入' }] },
            { label: '所属计划', field: 'belongToVersion', render: () => (
              <Select
                showSearch
                labelInValue
                filterOption={false}
                onSearch={(v) => { handlePlanSearch(v) }}
                style={{ width: '100%' }}
                // options={plans}
                onSelect={handleVersionSelect}
              >
                {plans.map((item) => {
                  return <Select.Option value={item.value} key={item.value} item={item}>{item.label}</Select.Option>
                })}
              </Select>
            ) 
            },
            { label: 'test', field: 'submitTest', render: () => 
              <DatePicker showTime={{ defaultValue: dayjs('18:00:00', 'HH:mm:ss') }} />
            },
            { label: 'publish', field: 'publishTime', render: () => 
              <DatePicker showTime={{ defaultValue: dayjs('19:00:00', 'HH:mm:ss') }} />
            },
            { label: '类型', field: 'eventType', initialValue: 'demand', render: () => (
              <Select
                style={{ width: 120 }}
                loading
                options={[
                  { value: 'demand', label: '需求' },
                  { value: 'other', label: 'other' }
                ]}
              />
            )
            },
            { label: '子事项', field: 'childEventIds' },
            { label: '链接', field: 'link' },            
            { label: '执行人', field: 'implementor', initialValue: operateType === 'add' ? record.implementor : undefined },
          ],
          initialValues: detail,
        }} 
      />
      <Form form={form} initialValues={detail}>
        <Form.List name="eventTimeList">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => {
                return (
                  <Row gutter={10} key={field.key}>
                    <Col span={4} >
                    <Form.Item 
                      {...field}
                      label="类型"
                      name={[field.name, 'timeType']}
                      key={field.key + 'timeType'}
                      initialValue="dev"
                    >
                      <Select
                        style={{ width: 120 }}
                        loading
                        options={[
                          { value: 'dev', label: 'dev' },
                          { value: 'coordinate', label: 'coordinate' },
                          { value: 'extra', label: 'extra' },
                        ]}
                      />
                    </Form.Item>
                    </Col>

                    <Col span={9} >
                    <Form.Item 
                      {...field}
                      label="开始时间"
                      name={[field.name, 'beginTime']}
                      key={field.key + 'beginTime'}
                    >
                      <DatePicker showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }} />
                    </Form.Item>
                    </Col>

                    <Col span={9} >
                    <Form.Item 
                      {...field}
                      label="结束时间"
                      name={[field.name, 'endTime']}
                      key={field.key + 'endTime'}
                    >
                      <DatePicker showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }} />
                    </Form.Item>
                    </Col>

                    <Col span={2}>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Col>

                  </Row>
                );
              })}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add sights
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default withFunctionalCall(EditEventModal);
