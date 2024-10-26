import SisvaButton from '@/app/classroom/shared/presentation/Button/GlobalButton';
import { SisvaSelect } from '@/app/classroom/shared/presentation/Input/SelectField';
import { SisvaInputSearch } from '@/app/classroom/shared/presentation/Input/SisvaInputField';
import React, { useState } from 'react';

import { FilterFunnel01 } from '@untitled-ui/icons-react';
import { Modal } from 'antd';

const ListFilter = ({
  dropDownData,
  dropdownHandler,
  generalHandleFilter,
  queryFilter,
  handleResetFilter,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const FilterContent = () => (
    <>
      <SisvaSelect
        customSize="md"
        placeholder="Periode"
        customClassName="min-w-full lg:min-w-40 mb-2 lg:mb-0"
        options={dropDownData.periodData}
        onChange={dropdownHandler.handlePeriodFilter}
        value={queryFilter.period === '' ? null : queryFilter.period}
      />
      <SisvaSelect
        customSize="md"
        placeholder="Prodi"
        customClassName="min-w-full lg:min-w-40 mb-2 lg:mb-0"
        options={dropDownData.studyProgramDropdown}
        onChange={dropdownHandler.handleStudyProgramFilter}
        disabled={dropDownData.studyProgramDropdown.length === 0}
        value={
          queryFilter.study_program === '' ? null : queryFilter.study_program
        }
      />
      <SisvaSelect
        customSize="md"
        placeholder="Tingkatan"
        customClassName="min-w-full lg:min-w-40 mb-2 lg:mb-0"
        options={dropDownData.gradeDropdown}
        onChange={(e) => generalHandleFilter('grade', e)}
        disabled={dropDownData.gradeDropdown.length === 0}
        value={queryFilter.grade === '' ? null : queryFilter.grade}
      />
      <SisvaSelect
        customSize="md"
        placeholder="Kelas"
        customClassName="min-w-full lg:min-w-40 mb-2 lg:mb-0"
        options={dropDownData.classroomDropdown}
        onChange={(e) => generalHandleFilter('classroom', e)}
        value={queryFilter.classroom === '' ? null : queryFilter.classroom}
      />
    </>
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <SisvaInputSearch
          customSize="md"
          placeholder="Search"
          onChange={(e) => generalHandleFilter('search', e.target.value)}
          value={queryFilter.search === '' ? null : queryFilter.search}
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
        <div className="hidden lg:flex gap-2 flex-wrap items-center justify-center">
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
            key="reset"
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
            key="apply"
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

export default ListFilter;
