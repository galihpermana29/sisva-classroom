import { useModal } from "@/app/classroom/(main)/teacher/class/[classId]/create-rpp/view/container/Provider/ModalProvider";
import { useGetDetailTeachingMaterial } from "@/app/classroom/(main)/teacher/teaching-material/usecase/use-get-detail-material";
import SisvaInputFile from "@/app/classroom/shared/presentation/Input/InputFile";
import { Col, Form, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import SisvaButton from "../Button/GlobalButton";
import { SisvaSelect } from "../Input/SelectField";
import { SisvaInput } from "../Input/SisvaInputField";

const CreateTeachingMaterialModal = ({
  open,
  handleClose,
  handleOk,
  title = "Tambah bahan ajar",
  initialData,
  handleFileUpload,
  isLoading,
  setFileURI,
  isRpp,
}) => {
  const [fileList, setFileList] = useState(null);
  const { modalState } = useModal();
  const {
    form,
    handleGetDetailTeachingMaterial,
    isLoadingGetDetail,
    dropDownData,
    handleChangeCurriculum,
    handleChangeStudyProgram,
    initialDropdownData,
    setDropdownData,
    handleGetPreFieldTeachingMaterial,
  } = useGetDetailTeachingMaterial(initialData);

  const handleCloseModal = () => {
    form.resetFields();
    handleClose();
  };

  useEffect(() => {
    const getDetail = async () => {
      await handleGetDetailTeachingMaterial(modalState?.data?.id);
    };
    const getPrefield = async () => {
      await handleGetPreFieldTeachingMaterial();
    };
    if (modalState?.type === "edit-teaching-material") {
      getDetail();
    } else if (modalState?.type === "create-teaching-material" && !isRpp) {
      setDropdownData(initialDropdownData);
    } else if (modalState?.type === "create-teaching-material" && isRpp) {
      getPrefield();
    }
    setFileList(
      modalState?.data?.attachment_file_uri
        ? [modalState?.data?.attachment_file_uri]
        : null
    );
    setFileURI(
      modalState?.data?.attachment_file_uri
        ? modalState?.data?.attachment_file_uri
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
        <Row gutter={[16, 1]}>
          <Col xs={24} sm={12}>
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
                onChange={handleChangeCurriculum}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
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
                onChange={handleChangeStudyProgram}
                disabled={dropDownData.studyProgramDropdown.length === 0}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
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
          <Col xs={24} sm={12}>
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
                disabled={dropDownData.subjectDropdown.length === 0}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Title"
          rules={[{ required: true, message: "Title must be filled" }]}
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
