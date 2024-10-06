import React, { useEffect, useState } from "react";
import { Modal, Form, Row, Col } from "antd";
import { SisvaSelect } from "../Input/SelectField";
import SisvaButton from "../Button/GlobalButton";
import { SisvaInput } from "../Input/SisvaInputField";
import SisvaInputFile from "@/app/classroom/shared/presentation/Input/InputFile";
import { useModal } from "@/app/classroom/(main)/teacher/class/[slug]/create-rpp/view/container/Provider/ModalProvider";
import { useGetDetailTeachingMaterial } from "@/app/classroom/(main)/teacher/teaching-material/usecase/use-get-detail-material";
import { useGetTeachingMaterialDropdown } from "@/app/classroom/(main)/teacher/class/[slug]/create-rpp/usecase/teaching-material/use-get-teaching-material-dropdown";

const CreateTeachingMaterialModal = ({
  open,
  handleClose,
  handleOk,
  title = "Tambah bahan ajar",
  initialData,
  handleFileUpload,
  isLoading,
}) => {
  const [fileList, setFileList] = useState(null);
  const { dropDownData, handleGetGradeDropdown } =
    useGetTeachingMaterialDropdown(initialData);
  const { modalState } = useModal();
  const { form, handleGetDetailTeachingMaterial, isLoadingGetDetail } =
    useGetDetailTeachingMaterial();

  const handleCloseModal = () => {
    form.resetFields();
    handleClose();
  };

  useEffect(() => {
    const getDetail = async () => {
      await handleGetDetailTeachingMaterial(modalState?.data?.id);
    };
    if (modalState?.type === "edit-teaching-material") {
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
      footer={null}
      width={800}
    >
      <Form
        form={form}
        name="create-teaching-material"
        onFinish={handleOkModal}
        layout="vertical"
        disabled={isLoading || isLoadingGetDetail}
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="curriculum_id"
              label="Kurikulum"
              rules={[
                { required: true, message: "Kurikulum must be selected" },
              ]}
            >
              <SisvaSelect
                customSize="md"
                placeholder="Pilih kurikulum"
                options={dropDownData.curriculumDropdown}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="study_program_id"
              label="Program Studi"
              rules={[
                { required: true, message: "Program studi must be selected" },
              ]}
            >
              <SisvaSelect
                customSize="md"
                placeholder="Pilih program studi"
                options={dropDownData.studyProgramDropdown}
                onChange={handleGetGradeDropdown}
                disabled={dropDownData.studyProgramDropdown.length === 0}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="grade"
              label="Tingkatan"
              rules={[
                { required: true, message: "Tingkatan must be selected" },
              ]}
            >
              <SisvaSelect
                customSize="md"
                placeholder="Pilih tingkatan"
                options={dropDownData.gradeDropdown}
                disabled={dropDownData.gradeDropdown.length === 0}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="subject_id"
              label="Mata Pelajaran"
              rules={[
                { required: true, message: "Mata pelajaran must be selected" },
              ]}
            >
              <SisvaSelect
                customSize="md"
                placeholder="Pilih mata pelajaran"
                options={dropDownData.subjectDropdown}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Title"
          rules={[{ required: true, message: "Title must be selected" }]}
        >
          <SisvaInput placeholder="Masukan judul" customSize="md" shadow />
        </Form.Item>

        <Form.Item name="additionalFiles" label="Additional Files">
          <SisvaInputFile
            onFileSelect={handleFileUpload}
            fileList={fileList}
            setFileList={setFileList}
          />
        </Form.Item>

        <div className="flex justify-end w-full gap-3">
          <SisvaButton
            btn_type="secondary"
            btn_size="md"
            onClick={handleCloseModal}
          >
            Batal
          </SisvaButton>
          <SisvaButton
            btn_type="primary"
            btn_size="md"
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

export default CreateTeachingMaterialModal;
