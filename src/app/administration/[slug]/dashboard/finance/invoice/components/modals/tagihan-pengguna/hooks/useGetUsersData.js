import { useGetAllStudentGroups } from "@/hooks/query/academic/useGetAllStudentGroups";
import { useGetAllUsers } from "@/hooks/query/academic/useGetAllUsers";
import { paginateData } from "@/utils/paginateData";

import { useGetStudentsInStudentGroup } from "../../../../hooks/useGetStudentsInStudentGroup";
import { hasFilter } from "../utils/hasFilter";

export const useGetUsersData = ({
  page,
  userFilter,
  shouldFetchStaffs,
  shouldFetchStudents,
}) => {
  const hasUserFilter = hasFilter(userFilter);
  const { data: studentsResult, isLoading: studentsIsLoading } =
    useGetStudentsInStudentGroup(hasUserFilter && shouldFetchStudents);
  const { data: allStudents, isLoading: allStudentsIsLoading } = useGetAllUsers(
    { types: ["student"], enabled: shouldFetchStudents }
  );
  const { data: studentGroups } = useGetAllStudentGroups();
  const { data: staffsResult, isLoading: staffIsLoading } = useGetAllUsers({
    types: ["staff", "teacher"],
    enabled: shouldFetchStaffs,
  });

  const students = hasUserFilter
    ? filterStudents(studentsResult, studentGroups, userFilter)
    : filterAndMapAllStudents(allStudents, userFilter);
  const staffs = filterStaffs(staffsResult, userFilter);

  const rowsPerPage = 5;
  const paginatedStudents = paginateData(students, rowsPerPage);
  const paginatedStaffs = paginateData(staffs, rowsPerPage);

  const studentsData = paginatedStudents[page - 1];
  const staffData = paginatedStaffs[page - 1];

  const totalPage = shouldFetchStudents
    ? paginatedStudents.length
    : shouldFetchStaffs
    ? paginatedStaffs.length
    : 1;

  return {
    students: studentsData,
    studentsIsLoading: studentsIsLoading || allStudentsIsLoading,
    staffs: staffData,
    staffIsLoading,
    totalPage: totalPage === 0 ? 1 : totalPage,
  };
};

const filterStudents = (students, studentGroups, userFilter) => {
  if (!students) return true;

  const searchFilter = (student) => {
    return userFilter.search
      ? student.student_name
          .toLowerCase()
          .includes(userFilter.search.toLowerCase())
      : true;
  };

  const otherFilters = (student) => {
    if (!studentGroups) return true;
    const groupIdsWithMatchingPeriod = studentGroups
      .filter((group) =>
        userFilter.period ? group.period_id === userFilter.period : true
      )
      .filter((group) =>
        userFilter.studyProgram
          ? group.study_program_id === userFilter.studyProgram
          : true
      )
      .filter((group) =>
        userFilter.grade ? group.grade === userFilter.grade : true
      )
      .filter((group) =>
        userFilter.kelas ? group.id === userFilter.kelas : true
      )
      .map((group) => group.id);
    return groupIdsWithMatchingPeriod.includes(student.student_group_id);
  };

  return students.filter(
    (student) => searchFilter(student) && otherFilters(student)
  );
};

const filterStaffs = (staffs, userFilter) => {
  if (!staffs) return [];
  const searchFilter = (staff) =>
    userFilter?.search
      ? staff.name.toLowerCase().includes(userFilter.search.toLowerCase())
      : true;
  return staffs.filter(
    (staff) => staff.status === "active" && searchFilter(staff)
  );
};

const filterAndMapAllStudents = (allStudents, userFilter) => {
  if (!allStudents) return [];
  return allStudents
    .filter((student) => student.status === "active")
    .filter((student) =>
      userFilter?.search
        ? student.name.toLowerCase().includes(userFilter.search.toLowerCase())
        : true
    )
    .map((student) => ({
      ...student,
      student_id: student.id,
      student_name: student.name,
    }));
};
