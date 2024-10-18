"use client";
import React from "react";
import ListFilter from "../presentation/ListFilter";
import ClassListGroup from "../presentation/ClassListGroup";
import { useTeacherClass } from "../../usecase/hooks/use-teacher-class";

const TeacherClassContainer = ({ initialData }) => {
  const {
    classData,
    dropDownData,
    dropdownHandler,
    generalHandleFilter,
    queryFilter,
    handleResetFilter,
    isLoading,
  } = useTeacherClass(initialData);
  return (
    <div className="flex flex-col gap-3 max-w-6xl mx-auto font-kumbh">
      <span className="text-[#1D2939] text-xl font-bold">List Kelas</span>
      <ListFilter
        dropDownData={dropDownData}
        dropdownHandler={dropdownHandler}
        generalHandleFilter={generalHandleFilter}
        queryFilter={queryFilter}
        handleResetFilter={handleResetFilter}
      />
      <ClassListGroup classData={classData} isLoading={isLoading} />
    </div>
  );
};

export default TeacherClassContainer;
