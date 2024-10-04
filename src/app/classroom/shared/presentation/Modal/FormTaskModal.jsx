import { Checkbox, DatePicker, Form, Modal, Radio, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import SisvaRichText from "../Input/RichText";
import SisvaInputFile from "../Input/InputFile";
import { SisvaInput } from "../Input/SisvaInputField";
import SisvaButton from "../Button/GlobalButton";

const FormTaskModal = ({ open, handleClose, handleOk, title }) => {
  const [form] = useForm();
  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleClose}
      title={title}
      width={940}
      footer={null}
      className="max-w-[calc(100vw-32px)]"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* left column */}
        <div className="w-full md:flex-[2]">
          <Form form={form} layout="vertical">
            <Form.Item name="title" label="Title">
              <SisvaInput placeholder="Text field" customSize="md" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <SisvaRichText />
            </Form.Item>

            <Form.Item name="displayDescription" valuePropName="checked">
              <div
                className="p-3 rounded-md"
                style={{ border: "1px solid #D0D5DD" }}
              >
                <Checkbox>Display description on page</Checkbox>
              </div>
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
              <SisvaInputFile text="Upload file here" />
            </Form.Item>
          </Form>
        </div>

        {/* right column */}
        <div
          className="w-full md:flex-1 bg-white rounded-md p-3"
          style={{
            border: "1px solid #D0D5DD",
          }}
        >
          <Form form={form} layout="vertical">
            <Form.Item name="deadline" label="Deadline">
              <DatePicker
                className="w-full h-[44px]"
                placeholder="Pilih tanggal"
              />
            </Form.Item>

            <Form.Item
              name="allowSubmission"
              label={
                <span className="text-[#1D2939] font-semibold">
                  Allow Submission
                </span>
              }
              className="mb-6"
            >
              <Radio.Group className="w-full">
                <Space direction="vertical" className="w-full">
                  <Radio value="1" className="w-full">
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
                  <Radio value="2" className="w-full">
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
              name="allowOverdueSubmission"
              label={
                <span className="text-[#1D2939] font-semibold">
                  Allow overdue submission
                </span>
              }
              className="mb-6"
            >
              <Radio.Group className="w-full">
                <Space direction="vertical" className="w-full">
                  <Radio value="1" className="w-full">
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
                  <Radio value="2" className="w-full">
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
          </Form>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-end w-full gap-3 mt-6">
        <SisvaButton
          btn_type="secondary"
          btn_size="md"
          onClick={handleClose}
          className="w-full md:w-auto"
        >
          Batal
        </SisvaButton>
        <SisvaButton
          btn_type="primary"
          btn_size="md"
          className="w-full md:w-auto"
        >
          Simpan
        </SisvaButton>
      </div>
    </Modal>
  );
};

export default FormTaskModal;
