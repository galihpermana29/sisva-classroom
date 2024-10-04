import { Table } from "antd";
import React from "react";

const CustomRppTable = ({ columns, data, ...props }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      scroll={{ x: "max-content" }}
      pagination={false}
      {...props}
    />
  );
};

export default CustomRppTable;
