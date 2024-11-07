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
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  const [isMoreFiltersVisible, setIsMoreFiltersVisible] = useState(false);

  const {
    dropDownData,
    handleStudyProgramFilter,
    generalHandleFilter,
    handleResetFilter,
    queryFilter,
    rawStructureMaterialData,
    isLoading,
  } = useTeachingMaterial(initialData);

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

  const MainFilters = () => (
    <>
      <SisvaSelect
        customSize="md"
        placeholder="Kurikulum"
        customClassName="w-full lg:w-[200px] mb-2 lg:mb-0"
        options={dropDownData.curriculumDropdown}
        onChange={(e) => generalHandleFilter("curriculum", e)}
        value={queryFilter.curriculum === "" ? null : queryFilter.curriculum}
        allowClear
      />
      <SisvaSelect
        customSize="md"
        placeholder="Program Studi"
        customClassName="w-full lg:w-[200px] mb-2 lg:mb-0"
        options={dropDownData.studyProgramDropdown}
        onChange={handleStudyProgramFilter}
        disabled={dropDownData.studyProgramDropdown.length === 0}
        value={
          queryFilter.study_program === "" ? null : queryFilter.study_program
        }
        allowClear
      />
    </>
  );

  const MoreFilters = () => (
    <div className="flex flex-col gap-3">
      <SisvaSelect
        customSize="md"
        placeholder="Mata Pelajaran"
        customClassName="w-full"
        options={dropDownData.subjectDropdown}
        onChange={(e) => generalHandleFilter("subject", e)}
        value={queryFilter.subject === "" ? null : queryFilter.subject}
        allowClear
      />
      <SisvaSelect
        customSize="md"
        placeholder="Tingkatan"
        customClassName="w-full"
        options={dropDownData.gradeDropdown}
        onChange={(e) => generalHandleFilter("grade", e)}
        value={queryFilter.grade === "" ? null : queryFilter.grade}
        disabled={dropDownData.gradeDropdown.length === 0}
        allowClear
      />
      <SisvaSelect
        customSize="md"
        placeholder="Guru"
        customClassName="w-full"
        options={dropDownData.teacherDropdwon}
        onChange={(e) => generalHandleFilter("teacher", e)}
        value={queryFilter.teacher === "" ? null : queryFilter.teacher}
        allowClear
      />
    </div>
  );

  const AllFilters = () => (
    <div className="flex flex-col gap-3">
      <MainFilters />
      <MoreFilters />
    </div>
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
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <SisvaButton
              btn_size="md"
              btn_type="primary"
              onClick={() => setIsMobileFilterVisible(true)}
              icon={<FilterFunnel01 width={20} height={20} />}
            >
              Filters
            </SisvaButton>
          </div>
          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center gap-2">
            <MainFilters />
            <SisvaButton
              btn_type="secondary"
              btn_size="md"
              onClick={() => setIsMoreFiltersVisible(true)}
            >
              More Filters
            </SisvaButton>
            <SisvaButton
              btn_type="primary"
              btn_size="md"
              onClick={handleResetFilter}
            >
              Reset Filter
            </SisvaButton>
          </div>
        </div>

        {/* Mobile Filters Modal */}
        <Modal
          title="Filter"
          open={isMobileFilterVisible}
          onCancel={() => setIsMobileFilterVisible(false)}
          footer={[
            <SisvaButton
              key="reset"
              btn_type="secondary"
              btn_size="md"
              onClick={handleResetFilter}
            >
              Reset Filter
            </SisvaButton>,
            <SisvaButton
              key="apply"
              btn_type="primary"
              btn_size="md"
              onClick={() => setIsMobileFilterVisible(false)}
            >
              Apply
            </SisvaButton>,
          ]}
        >
          <AllFilters />
        </Modal>

        {/* Desktop More Filters Modal */}
        <Modal
          title="More Filters"
          open={isMoreFiltersVisible}
          onCancel={() => setIsMoreFiltersVisible(false)}
          footer={[
            <SisvaButton
              key="reset"
              btn_type="secondary"
              btn_size="md"
              onClick={handleResetFilter}
            >
              Reset Filter
            </SisvaButton>,
            <SisvaButton
              key="apply"
              btn_type="primary"
              btn_size="md"
              onClick={() => setIsMoreFiltersVisible(false)}
            >
              Apply
            </SisvaButton>,
          ]}
        >
          <MoreFilters />
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
