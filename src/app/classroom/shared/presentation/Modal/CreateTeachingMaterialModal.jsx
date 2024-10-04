import React from "react";
import { Modal, Form, Row, Col } from "antd";
import { SisvaSelect } from "../Input/SelectField";
import SisvaButton from "../Button/GlobalButton";
import { useForm } from "antd/es/form/Form";
import { SisvaInput } from "../Input/SisvaInputField";
import SisvaInputFile from "@/app/classroom/shared/presentation/Input/InputFile";

const CreateTeachingMaterialModal = ({
  open,
  handleClose,
  handleOk,
  title = "Tambah bahan ajar",
}) => {
  const [form] = useForm();

  return (
    <Modal
      title={title}
      open={open}
      onCancel={handleClose}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        name="create-teaching-material"
        onFinish={handleOk}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="kurikulum" label="Kurikulum">
              <SisvaSelect
                placeholder="Pilih kurikulum"
                options={[]}
                customSize="md"
                shadow
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="programStudi" label="Program Studi">
              <SisvaSelect
                placeholder="Pilih program studi"
                options={[]}
                customSize="md"
                shadow
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="tingkatan" label="Tingkatan">
              <SisvaSelect
                placeholder="Pilih tingkatan"
                options={[]}
                customSize="md"
                shadow
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="mataPelajaran" label="Mata Pelajaran">
              <SisvaSelect
                placeholder="Pilih mata pelajaran"
                options={[]}
                customSize="md"
                shadow
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="title" label="Title">
          <SisvaInput placeholder="Masukan judul" customSize="md" shadow />
        </Form.Item>

        <Form.Item name="additionalFiles" label="Additional Files">
          <SisvaInputFile />
        </Form.Item>

        <div className="flex justify-end w-full gap-3">
          <SisvaButton btn_type="secondary" btn_size="md" onClick={handleClose}>
            Batal
          </SisvaButton>
          <SisvaButton btn_type="primary" btn_size="md" htmlType="submit">
            Simpan
          </SisvaButton>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateTeachingMaterialModal;
