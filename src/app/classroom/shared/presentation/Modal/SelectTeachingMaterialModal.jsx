import { Modal } from "antd";
import React, { useState } from "react";
import { SisvaInputSearch } from "../Input/SisvaInputField";
import { SisvaSelect } from "../Input/SelectField";
import TeachingMaterialTable from "../../../(main)/teacher/class/[classId]/create-rpp/view/presentation/Table/TeachingMaterialTable";
import SisvaButton from "../Button/GlobalButton";
import { FilterFunnel01 } from "@untitled-ui/icons-react";
import { useTeachingMaterial } from "@/app/classroom/(main)/teacher/teaching-material/usecase/use-teaching-material";

const SelectTeachingMaterialModal = ({
  open,
  handleClose,
  handleOk,
  title,
  initialData,
}) => {
  /**
   * Modal for mobile filter
   */
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    dropDownData,
    handleStudyProgramFilter,
    handleCurriculumFilter,
    generalHandleFilter,
    handleResetFilter,
    queryFilter,
    rawStructureMaterialData,
    isLoading,
  } = useTeachingMaterial(initialData);

  /**
   *  Selecting existing teaching material
   */
  const [selectedState, setSelectedState] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const getRecord = rawStructureMaterialData.filter((item) =>
      newSelectedRowKeys.includes(item.id)
    );
    setSelectedState(getRecord);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleCloseModal = () => {
    handleClose();
    setSelectedState([]);
    setSelectedRowKeys([]);
  };

  const handleOkModal = () => {
    handleOk(selectedState);
    setSelectedState([]);
    setSelectedRowKeys([]);
  };

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const FilterContent = () => (
    <>
      <SisvaSelect
        customSize="md"
        placeholder="Kurikulum"
        customClassName="w-full md:w-fit mb-2 md:mb-0"
        options={dropDownData.curriculumDropdown}
        onChange={handleCurriculumFilter}
        value={queryFilter.curriculum === "" ? null : queryFilter.curriculum}
      />
      <SisvaSelect
        customSize="md"
        placeholder="Program Studi"
        customClassName="w-full md:w-fit mb-2 md:mb-0"
        options={dropDownData.studyProgramDropdown}
        onChange={handleStudyProgramFilter}
        disabled={dropDownData.studyProgramDropdown.length === 0}
        value={
          queryFilter.study_program === "" ? null : queryFilter.study_program
        }
      />
      <SisvaSelect
        customSize="md"
        placeholder="Mata Pelajaran"
        customClassName="w-full md:w-fit mb-2 md:mb-0"
        options={dropDownData.subjectDropdown}
        onChange={(e) => generalHandleFilter("subject", e)}
        value={queryFilter.subject === "" ? null : queryFilter.subject}
      />
      <SisvaSelect
        customSize="md"
        placeholder="Tingkatan"
        customClassName="w-full md:w-fit mb-2 md:mb-0"
        options={dropDownData.gradeDropdown}
        onChange={(e) => generalHandleFilter("grade", e)}
        value={queryFilter.grade === "" ? null : queryFilter.grade}
        disabled={dropDownData.gradeDropdown.length === 0}
      />
      <SisvaSelect
        customSize="md"
        placeholder="Guru"
        customClassName="w-full md:w-fit mb-2 md:mb-0"
        options={dropDownData.teacherDropdwon}
        onChange={(e) => generalHandleFilter("teacher", e)}
        value={queryFilter.teacher === "" ? null : queryFilter.teacher}
      />
    </>
  );
  return (
    <Modal
      open={open}
      onOk={handleOkModal}
      onCancel={handleCloseModal}
      title={title}
      width={940}
      footer={
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
            onClick={handleOkModal}
            disabled={selectedState.length === 0}
          >
            Simpan
          </SisvaButton>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <SisvaInputSearch
            customSize="md"
            placeholder="Search"
            onChange={(e) => generalHandleFilter("search", e.target.value)}
            value={queryFilter.search === "" ? null : queryFilter.search}
          />
          <div className="lg:hidden">
            <SisvaButton
              btn_size="md"
              btn_type="primary"
              onClick={showModal}
              icon={<FilterFunnel01 width={20} height={20} />}
            >
              Filters
            </SisvaButton>
          </div>
          <div className="hidden lg:flex gap-2">
            <FilterContent />
            <SisvaButton
              btn_type="primary"
              btn_size="md"
              onClick={handleResetFilter}
            >
              Reset Filter
            </SisvaButton>
          </div>
        </div>

        <Modal
          title="Filter"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <SisvaButton
              btn_type="secondary"
              btn_size="md"
              onClick={handleResetFilter}
            >
              Reset Filter
            </SisvaButton>,
            <SisvaButton
              btn_type="primary"
              btn_size="md"
              onClick={handleCancel}
            >
              Apply
            </SisvaButton>,
          ]}
        >
          <FilterContent />
        </Modal>

        <TeachingMaterialTable
          dataSource={rawStructureMaterialData}
          isLoading={isLoading}
          rowSelection={rowSelection}
        />
      </div>
    </Modal>
  );
};

export default SelectTeachingMaterialModal;
