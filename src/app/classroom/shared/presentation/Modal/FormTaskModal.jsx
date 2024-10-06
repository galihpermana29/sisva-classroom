import { DatePicker, Form, Modal, Radio, Space } from "antd";
import React, { useEffect, useState } from "react";
import SisvaRichText from "../Input/RichText";
import SisvaInputFile from "../Input/InputFile";
import { SisvaInput } from "../Input/SisvaInputField";
import SisvaButton from "../Button/GlobalButton";
import { useModal } from "@/app/classroom/(main)/teacher/class/[slug]/create-rpp/view/container/Provider/ModalProvider";
import { useGetDetailTask } from "@/app/classroom/(main)/teacher/class/[slug]/create-rpp/usecase/task/use-get-detail-task";
import dayjs from "dayjs";
import { useWatch } from "antd/es/form/Form";

const FormTaskModal = ({
  open,
  handleClose,
  handleOk,
  title = "Tambah Tugas",
  handleFileUpload,
  isLoading,
}) => {
  const [fileList, setFileList] = useState(null);
  const { modalState } = useModal();
  const { form, handleGetDetailTask, isLoadingGetDetail } = useGetDetailTask();

  const handleCloseModal = () => {
    form.resetFields();
    handleClose();
  };

  useEffect(() => {
    const getDetail = async () => {
      await handleGetDetailTask(modalState?.data?.id);
    };
    if (modalState?.type === "edit-task") {
      getDetail();
    }
    setFileList(
      modalState?.data?.attachment_file_uri
        ? [modalState?.data?.attachment_file_uri]
        : null
    );
  }, [modalState]);

  const handleOkModal = (value) => {
    handleOk(value);
    form.resetFields();
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={handleCloseModal}
      width={940}
      footer={null}
      className="max-w-[calc(100vw-32px)]"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleOkModal}
        disabled={isLoading || isLoadingGetDetail}
        requiredMark={false}
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* left column */}
          <div className="w-full md:flex-[2]">
            <Form.Item
              name="name"
              label="Title"
              rules={[{ required: true, message: "Title must be filled" }]}
            >
              <SisvaInput placeholder="Text field" customSize="md" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <SisvaRichText />
            </Form.Item>

            <Form.Item
              name="attachment"
              label={
                <span className="flex items-center gap-2">
                  Attachment{" "}
                  <span className="text-[#98A2B3] text-xs">(Max size 2GB)</span>
                </span>
              }
              className="mb-6"
            >
              <SisvaInputFile
                onFileSelect={handleFileUpload}
                fileList={fileList}
                setFileList={setFileList}
                text="Upload file here"
              />
            </Form.Item>
          </div>

          {/* right column */}
          <div
            className="w-full md:flex-1 bg-white rounded-md p-3"
            style={{
              border: "1px solid #D0D5DD",
            }}
          >
            <Form.Item name="deadline" label="Deadline">
              <DatePicker
                className="w-full h-[44px]"
                placeholder="Pilih tanggal"
              />
            </Form.Item>

            <Form.Item
              name="allow_submission"
              label={
                <span className="text-[#1D2939] font-semibold">
                  Allow Submission
                </span>
              }
              className="mb-6"
            >
              <Radio.Group className="w-full">
                <Space direction="vertical" className="w-full">
                  <Radio value={true} className="w-full">
                    <div className="flex flex-col">
                      <span className="text-[#1D2939] font-semibold">
                        Option 1
                      </span>
                      <span className="text-[#98A2B3] text-xs mt-1 break-words">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </span>
                    </div>
                  </Radio>
                  <Radio value={false} className="w-full">
                    <div className="flex flex-col">
                      <span className="text-[#1D2939] font-semibold">
                        Option 2
                      </span>
                      <span className="text-[#98A2B3] text-xs mt-1 break-words">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </span>
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="allow_overdue_submission"
              label={
                <span className="text-[#1D2939] font-semibold">
                  Allow overdue submission
                </span>
              }
              className="mb-6"
            >
              <Radio.Group className="w-full">
                <Space direction="vertical" className="w-full">
                  <Radio value={true} className="w-full">
                    <div className="flex flex-col">
                      <span className="text-[#1D2939] font-semibold">
                        Option 1
                      </span>
                      <span className="text-[#98A2B3] text-xs mt-1 break-words">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </span>
                    </div>
                  </Radio>
                  <Radio value={false} className="w-full">
                    <div className="flex flex-col">
                      <span className="text-[#1D2939] font-semibold">
                        Option 2
                      </span>
                      <span className="text-[#98A2B3] text-xs mt-1 break-words">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </span>
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-end w-full gap-3 mt-6">
          <SisvaButton
            btn_type="secondary"
            btn_size="md"
            onClick={handleCloseModal}
            className="w-full md:w-auto"
          >
            Batal
          </SisvaButton>
          <SisvaButton
            btn_type="primary"
            btn_size="md"
            className="w-full md:w-auto"
            htmlType="submit"
            loading={isLoading || isLoadingGetDetail}
          >
            Simpan
          </SisvaButton>
        </div>
      </Form>
    </Modal>
  );
};

export default FormTaskModal;
