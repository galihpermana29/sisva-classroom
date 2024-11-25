import { Modal } from "antd";
import React from "react";

import SisvaButton from "../Button/GlobalButton";

const DeleteConfirmation = ({
  open,
  handleClose,
  handleOk,
  title = "Confirm Delete",
  loading,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={handleClose}
      width={430}
      footer={
        <div className="flex items-center gap-2 justify-end">
          <SisvaButton
            btn_type="secondary"
            btn_size="md"
            onClick={handleClose}
            disabled={loading}
          >
            Batal
          </SisvaButton>
          <SisvaButton
            btn_type="primary"
            btn_size="md"
            onClick={handleOk}
            loading={loading}
          >
            Confirm
          </SisvaButton>
        </div>
      }
    />
  );
};

export default DeleteConfirmation;
