import { SisvaSelect } from "@/app/classroom/shared/presentation/Input/SelectField";
import { SisvaInputSearch } from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import React from "react";

const ListFilter = ({ dropDownData, dropdownHandler, generalHandleFilter }) => {
  return (
    <div className="flex flex-wrap md:justify-between items-center gap-3">
      <SisvaInputSearch
        customSize="md"
        placeholder="Search"
        onChange={(e) => generalHandleFilter("search", e.target.value)}
      />
      <div className="flex gap-2 flex-wrap items-center">
        <SisvaSelect
          customSize="md"
          placeholder="Periode"
          customClassName="min-w-40"
          options={dropDownData.periodData}
          onChange={dropdownHandler.handlePeriodFilter}
        />
        <SisvaSelect
          customSize="md"
          placeholder="Prodi"
          customClassName="min-w-40"
          options={dropDownData.studyProgramDropdown}
          onChange={dropdownHandler.handleStudyProgramFilter}
          disabled={dropDownData.studyProgramDropdown.length === 0}
        />
        <SisvaSelect
          customSize="md"
          placeholder="Tingkatan"
          customClassName="min-w-40"
          options={dropDownData.gradeDropdown}
          onChange={(e) => generalHandleFilter("grade", e)}
          disabled={dropDownData.gradeDropdown.length === 0}
        />
        <SisvaSelect
          customSize="md"
          placeholder="Kelas"
          customClassName="min-w-40"
          options={dropDownData.classroomDropdown}
          onChange={(e) => generalHandleFilter("classroom", e)}
        />
      </div>
    </div>
  );
};

export default ListFilter;
