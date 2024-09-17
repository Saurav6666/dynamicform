import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { employeeData } from "../JSON/employeeData";

const DynamicTable = ({ tableData, setTableData }) => {
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    const savedData = localStorage.getItem("employeeData");
    if (savedData) {
      setTableData(JSON.parse(savedData));
    }
    const dynamicColumns = employeeData.flatMap((section) =>
      section.fields
        .filter((field) => field.label !== "Save")
        .map((field) => ({
          title: field.label,
          dataIndex: field.id,
          key: field.id,
        }))
    );

    setColumns(dynamicColumns);
  }, []);
  return (
    <Table
      columns={columns}
      dataSource={tableData}
      rowKey={(record) => record.employeeid || record.id || "key"}
      pagination={false}
      style={{ marginTop: 20 }}
    />
  );
};

export default DynamicTable;
