import React, { useContext, useEffect, useState } from 'react';
import withFunctionalCall from '../../../../hocs/withFunctionalCall';
import { Modal, Form, DatePicker, Select, Button, Row, Col, message, Input } from 'antd';
import FormGrid from '../../../../components/FormGrid';
import { addPlanApi, editPlanApi, fetchPlanDetail } from '../../services/plan';
import { dateTimeFormat, ENV_LIST } from '../../config/planList';
import dayjs from 'dayjs';
import { dealDateTimeToDayjs } from '../../../../utils/FormatUtils';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


const EditPlanModal = ({ 
  visible, onCancel, operateType = 'add', record = {}, onOk,
}) => {
  const [form] = Form.useForm();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    if (operateType === 'add') return;
    fetchPlanDetail(record).then((res) => {
      setDetail(dealDateTimeToDayjs(res?.result));
    })
  }, [])

  const handleOk = () => {
    form.validateFields().then((values) => {
      const { submitTest, publishTime, publishedEnv = [] } = values;
      console.log(values, 'values');
      (operateType === 'edit' ? editPlanApi : addPlanApi)({
        id: record.id,
        ...values, 
        submitTest: submitTest ? submitTest.format(dateTimeFormat) : undefined,
        publishTime: publishTime ? publishTime.format(dateTimeFormat) : undefined, 
        eventTimeList: values.eventTimeList?.map(el => (
          { 
            ...el, 
            beginTime: el.beginTime?.format(dateTimeFormat), 
            endTime: el.endTime?.format(dateTimeFormat)
          }
        )),
        publishedEnv: JSON.stringify(publishedEnv),
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
            { label: '名称', field: 'name', rules: [{ required: true, message: '请输入' }] },
            { label: 'test', field: 'submitTest', render: () => 
              <DatePicker showTime={{ defaultValue: dayjs('18:00:00', 'HH:mm:ss') }} />
            },
            { label: 'publish', field: 'publishTime', render: () => 
              <DatePicker showTime={{ defaultValue: dayjs('19:00:00', 'HH:mm:ss') }} />
            },
            { label: '类型', field: 'planType', initialValue: 'demand', render: () => (
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
            { label: '子事项', field: 'eventIds' },
            { label: 'link', field: 'link' },
            { label: '备注', field: 'remark' },
            // { label: '执行人', field: 'implementor', initialValue: operateType === 'add' ? record.implementor : undefined },
          ],
          initialValues: detail,
        }} 
      />
       <Form form={form} initialValues={detail}>
        <Form.List name="publishedEnv">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => {
                return (
                  <Row gutter={10} key={field.key}>
                    <Col span={4} >
                    <Form.Item 
                      {...field}
                      label="类型"
                      name={[field.name, 'env']}
                      key={field.key + 'env'}
                      initialValue="yun"
                    >
                      <Select
                        style={{ width: 120 }}
                        loading
                        options={ENV_LIST}
                      />
                    </Form.Item>
                    </Col>

                    <Col span={9} >
                    <Form.Item 
                      {...field}
                      label="发布时间"
                      name={[field.name, 'publishTime']}
                      key={field.key + 'publishTime'}
                    >
                      <DatePicker showTime={{ defaultValue: dayjs('20:00:00', 'HH:mm:ss') }} />
                    </Form.Item>
                    </Col>

                    <Col span={9} >
                    <Form.Item 
                      {...field}
                      label="link"
                      name={[field.name, 'link']}
                      key={field.key + 'link'}
                    >
                      <Input />
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

export default withFunctionalCall(EditPlanModal);
