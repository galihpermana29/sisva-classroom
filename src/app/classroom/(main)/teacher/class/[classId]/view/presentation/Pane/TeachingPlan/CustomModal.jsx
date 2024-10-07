import { ConfigProvider, Modal } from "antd";
import React from "react";

const CustomModal = ({ ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          modal: {
            titleColor: "#F96756",
          },
        },
      }}
    >
      <Modal {...props} />
    </ConfigProvider>
  );
};

export default CustomModal;
