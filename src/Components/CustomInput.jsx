import React from "react";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;

const CommonInput = ({
  label,
  name,
  type,
  placeholder,
  validation,
  options,
}) => {
  const rules = validation
    ?.map((rule) => {
      switch (rule.type) {
        case "required":
          return { required: true, message: rule.message };
        case "maxLength":
          return { max: parseInt(rule.value, 10), message: rule.message };
        default:
          return null;
      }
    })
    .filter(Boolean);
  switch (type) {
    case "text":
    case "email":
    case "file":
    case "number":
    case "date":
      return (
        <Form.Item label={label} name={name} rules={rules}>
          <Input type={type} placeholder={placeholder} />
        </Form.Item>
      );
    case "password":
      return (
        <Form.Item label={label} name={name} rules={rules}>
          <Input.Password type={type} placeholder={placeholder} />
        </Form.Item>
      );

    case "select":
      return (
        <Form.Item label={label} name={name} rules={rules}>
          <Select placeholder={placeholder}>
            {options?.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );
    case "button":
      return (
        <Form.Item>
          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            id={name}
          >
            {label}
          </Button>
        </Form.Item>
      );

    default:
      return null;
  }
};

export default CommonInput;
