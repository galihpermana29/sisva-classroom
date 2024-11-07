"use client";

import { useStudentClass } from "../../usecase/hooks/use-student-class";
import StudentClassList from "../presentation/ClassList";
import ListFilter from "../presentation/ListFilter";

const StudentClassContainer = () => {
  const {
    classes,
    dropdownFilterData,
    isLoading,
    filter,
    handleFilterChange,
    handleClearFilter,
  } = useStudentClass();

  console.log(classes);

  return (
    <div className="max-w-6xl mx-auto mb-[8dvh] md:mb-0 font-kumbh md:mt-10">
      <h1 className="text-xl font-bold md:text-2xl ">List Mata Pelajaran</h1>
      <ListFilter
        filter={filter}
        dropdownFilterData={dropdownFilterData}
        handleFilterChange={handleFilterChange}
        handleClearFilter={handleClearFilter}
      />
      <StudentClassList classes={classes} isLoading={isLoading} />
    </div>
  );
};

export default StudentClassContainer;
