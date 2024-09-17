import React, { useState } from "react";
import { Form, message, Typography } from "antd";
import CustomInput from "./CustomInput";
import { employeeData } from "../JSON/employeeData";
import DynamicTable from "./DynamicTable";

const { Title } = Typography;

const DynamicForm = () => {
  const [tableData, setTableData] = useState([]);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    let existingData = JSON.parse(localStorage.getItem("employeeData")) || [];
    const updatedData = [...existingData, values];
    localStorage.setItem("employeeData", JSON.stringify(updatedData));
    message.success("Form data saved successfully to localStorage!");
    setTableData(updatedData);
    console.log(updatedData, "table");
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please complete all required fields!");
  };
  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          maxWidth: "600px",
          margin: "auto",
          padding: "20px",
          backgroundColor: "#f0f2f5",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {employeeData.map((section) => (
          <div key={section.id}>
            <Title>{section.label}</Title>
            {section.fields.map((properties) => (
              <CustomInput
                key={properties.id}
                label={properties.label}
                name={properties.id}
                type={properties.type}
                options={properties.options}
                placeholder={properties.placeholder}
                validation={properties.validation}
              />
            ))}
          </div>
        ))}
      </Form>

      <DynamicTable tableData={tableData} setTableData={setTableData} />
    </>
  );
};

export default DynamicForm;
