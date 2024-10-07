import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";
import { SisvaSelect } from "@/app/classroom/shared/presentation/Input/SelectField";
import { SisvaInputSearch } from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import { FilterFunnel01 } from "@untitled-ui/icons-react";
import { Modal } from "antd";
import React, { useState } from "react";

const ListFilter = ({
  filter,
  dropdownFilterData,
  handleFilterChange,
  handleClearFilter,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <div className="flex items-center gap-3 mt-3 md:mt-6">
      <SisvaInputSearch
        customSize="md"
        placeholder="Search"
        value={filter.search === "" ? null : filter.search}
        onChange={(e) => handleFilterChange("search", e.target.value)}
      />

      <div className="hidden lg:flex">
        <FilterContent
          filter={filter}
          dropdownFilterData={dropdownFilterData}
          handleFilterChange={handleFilterChange}
        />

        <SisvaButton onClick={handleClearFilter}>Reset Filter</SisvaButton>
      </div>

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

      <Modal
        title="Filter"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <SisvaButton
            btn_type="secondary"
            btn_size="md"
            onClick={handleClearFilter}
          >
            Reset Filter
          </SisvaButton>,
          <SisvaButton btn_type="primary" btn_size="md" onClick={handleCancel}>
            Apply
          </SisvaButton>,
        ]}
      >
        <FilterContent
          filter={filter}
          dropdownFilterData={dropdownFilterData}
          handleFilterChange={handleFilterChange}
        />
      </Modal>
    </div>
  );
};

export default ListFilter;

const FilterContent = ({ filter, dropdownFilterData, handleFilterChange }) => {
  return (
    <>
      <SisvaSelect
        customSize="md"
        placeholder="Mata Pelajaran"
        customClassName="min-w-full lg:min-w-40 mb-2 lg:mb-0"
        options={dropdownFilterData?.subject || []}
        value={filter.subject || ""}
        onChange={(value) => handleFilterChange("subject", value)}
      />
      <SisvaSelect
        customSize="md"
        placeholder="Guru"
        customClassName="min-w-full lg:min-w-40 mb-2 lg:mb-0"
        options={dropdownFilterData?.teacherName || []}
        value={filter.teacherName || ""}
        onChange={(value) => handleFilterChange("teacherName", value)}
      />
    </>
  );
};
