import { Table } from "antd";
import React, { useState } from "react";

const CustomRppTable = ({ columns, data, ...props }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      scroll={{ x: "max-content" }}
      rowKey="id"
      {...props}
    />
  );
};

export default CustomRppTable;
