import { Form, Input, InputNumber, Select } from "antd";
import { number } from "prop-types";
import React from "react";

const INPUT_NODE = {
  number: InputNumber,
  text: Input,
  select: Select,
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  formItemProps,
  record,
  index,
  children,
  ...restProps
}) => {
  console.log(formItemProps, 'formItemProps', dataIndex, children)
  const Comp = INPUT_NODE[inputType];

  const val = Array.isArray(children) ? children?.[1] : children;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: false,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Comp {...formItemProps} />
        </Form.Item>
      ) : (
        inputType === 'select' ? 
          formItemProps?.options?.find(item => item.value === val)?.label
          :
          val
      )}
    </td>
  );
};

export default EditableCell;
