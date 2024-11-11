import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";
import { SisvaSelect } from "@/app/classroom/shared/presentation/Input/SelectField";
import { SisvaInputSearch } from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import React, { useState } from "react";

import { FilterFunnel01 } from "@untitled-ui/icons-react";
import { Modal } from "antd";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
      <SisvaSelect
        customSize="md"
        placeholder="Kurikulum"
        customClassName="w-full mb-2 sm:mb-0"
        options={dropDownData.curriculumDropdown}
        onChange={(e) => generalHandleFilter("curriculum", e)}
        value={queryFilter.curriculum === "" ? null : queryFilter.curriculum}
        allowClear
      />
      <SisvaSelect
        customSize="md"
        placeholder="Program Studi"
        customClassName="w-full mb-2 sm:mb-0"
        options={dropDownData.studyProgramDropdown}
        onChange={handleStudyProgramFilter}
        disabled={dropDownData.studyProgramDropdown.length === 0}
        value={
          queryFilter.study_program === "" ? null : queryFilter.study_program
        }
        allowClear
      />
      <SisvaSelect
        customSize="md"
        placeholder="Mata Pelajaran"
        customClassName="w-full mb-2 sm:mb-0"
        options={dropDownData.subjectDropdown}
        onChange={(e) => generalHandleFilter("subject", e)}
        value={queryFilter.subject === "" ? null : queryFilter.subject}
        allowClear
      />
      <SisvaSelect
        customSize="md"
        placeholder="Tingkatan"
        customClassName="w-full mb-2 sm:mb-0"
        options={dropDownData.gradeDropdown}
        onChange={(e) => generalHandleFilter("grade", e)}
        value={queryFilter.grade === "" ? null : queryFilter.grade}
        disabled={dropDownData.gradeDropdown.length === 0}
        allowClear
      />
      <SisvaSelect
        customSize="md"
        placeholder="Guru"
        customClassName="w-full mb-2 sm:mb-0"
        options={dropDownData.teacherDropdwon}
        onChange={(e) => generalHandleFilter("teacher", e)}
        value={queryFilter.teacher === "" ? null : queryFilter.teacher}
        allowClear
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <SisvaInputSearch
          customSize="md"
          placeholder="Search"
          onChange={(e) => generalHandleFilter("search", e.target.value)}
          value={queryFilter.search === "" ? null : queryFilter.search}
        />

        <div className="lg:hidden">
          <SisvaButton
            btn_size="md"
            btn_type="secondary"
            onClick={showModal}
            icon={<FilterFunnel01 width={20} height={20} />}
          >
            Filters
          </SisvaButton>
        </div>
      </div>
      <div className="hidden lg:block">
        <FilterContent />
        <div className="mt-4 flex justify-end">
          <SisvaButton
            btn_type="secondary"
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
            onClick={handleCancel}
          >
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
