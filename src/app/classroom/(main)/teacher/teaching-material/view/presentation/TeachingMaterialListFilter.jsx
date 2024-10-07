import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";
import { SisvaSelect } from "@/app/classroom/shared/presentation/Input/SelectField";
import { SisvaInputSearch } from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import React, { useState } from "react";

import { Modal } from "antd";
import { FilterFunnel01 } from "@untitled-ui/icons-react";

const TeachingMaterialListFilter = ({
  dropDownData,
  generalHandleFilter,
  handleResetFilter,
  handleStudyProgramFilter,
  isLoading,
  queryFilter,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const FilterContent = () => (
    <>
      <SisvaSelect
        customSize="md"
        placeholder="Kurikulum"
        customClassName="min-w-full lg:min-w-40 lg:max-w-40 mb-2 lg:mb-0"
        options={dropDownData.curriculumDropdown}
        onChange={(e) => generalHandleFilter("curriculum", e)}
        value={queryFilter.curriculum === "" ? null : queryFilter.curriculum}
      />
      <SisvaSelect
        customSize="md"
        placeholder="Program Studi"
        customClassName="min-w-full lg:min-w-40 lg:max-w-40 mb-2 lg:mb-0"
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
        customClassName="min-w-full lg:min-w-40 lg:max-w-40 mb-2 lg:mb-0"
        options={dropDownData.subjectDropdown}
        onChange={(e) => generalHandleFilter("subject", e)}
        value={queryFilter.subject === "" ? null : queryFilter.subject}
      />
      <SisvaSelect
        customSize="md"
        placeholder="Tingkatan"
        customClassName="min-w-full lg:min-w-40 lg:max-w-40 mb-2 lg:mb-0"
        options={dropDownData.gradeDropdown}
        onChange={(e) => generalHandleFilter("grade", e)}
        value={queryFilter.grade === "" ? null : queryFilter.grade}
        disabled={dropDownData.gradeDropdown.length === 0}
      />
      <SisvaSelect
        customSize="md"
        placeholder="Guru"
        customClassName="min-w-full lg:min-w-40 lg:max-w-40 mb-2 lg:mb-0"
        options={dropDownData.teacherDropdwon}
        onChange={(e) => generalHandleFilter("teacher", e)}
        value={queryFilter.teacher === "" ? null : queryFilter.teacher}
      />
    </>
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap justify-between items-center gap-3">
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
          <SisvaButton btn_type="primary" btn_size="md" onClick={handleCancel}>
            Apply
          </SisvaButton>,
        ]}
      >
        <FilterContent />
      </Modal>
    </div>
  );
};

export default TeachingMaterialListFilter;
