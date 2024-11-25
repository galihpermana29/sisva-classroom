"use client";

import { Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";

import AcademicAPI from "@/api/academic";
import { useExtracurricularMembers } from "@/hooks/query/academic/useExtracurricularMembers";
import { useExtracurriculars } from "@/hooks/query/academic/useExtracurriculars";
import { useStudents } from "@/hooks/query/user/useStudents";
import { useTeachers } from "@/hooks/query/user/useTeachers";

import ClassTable from "./components/ClassTable";
import CreateExtracurricularMemberModal from "./components/CreateExtracurricularMemberModal";
import CreateExtracurricularModal from "./components/CreateExtracurricularModal";
import SortModal from "./components/SortModal";
import StudentTable from "./components/StudentTable";
import TableParent from "./components/TableParent";

export default function StaffProfileContent() {
  const queryClient = useQueryClient();
  const emptyData = {
    id: "",
    title: "",
    teacher: "",
    student: "",
  };

  const formik = useFormik({
    initialValues: emptyData,

    onSubmit: async (values) => {
      try {
        if (activeTab == 0) {
          if (!values.id) {
            const payload = {
              name: values.title,
              teacher_id: values.teacher,
            };

            await AcademicAPI.createExtra(payload);
            queryClient.invalidateQueries({
              queryKey: ["extracurriculars"],
            });
          } else {
            const id = values.id;

            const payload = {
              name: values.title,
              teacher_id: values.teacher,
            };

            await AcademicAPI.updateExtra(id, payload);
            queryClient.invalidateQueries({
              queryKey: ["extracurriculars"],
            });
          }
        } else {
          if (!values.id) {
            const extra_id = values.title;

            const payload = {
              student_id: values.student,
            };

            await AcademicAPI.createStudentInExtra(extra_id, payload);
            queryClient.invalidateQueries({
              queryKey: ["extracurricular-members"],
            });
          } else {
            const id = values.id;

            const payload = {
              name: values.title,
              teacher_id: values.teacher,
            };

            await AcademicAPI.updateExtra(id, payload);
            queryClient.invalidateQueries({
              queryKey: ["extracurriculars"],
            });
          }
        }
      } catch (error) {
        console.log(error);
      }

      formik.setValues(emptyData);
    },
  });

  const deleteExtra = async (id) => {
    try {
      await AcademicAPI.deleteExtra(id);
      queryClient.invalidateQueries({
        queryKey: ["extracurriculars"],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudentInExtra = async (extraId, studentId) => {
    try {
      const id = extraId;

      const payload = {
        student_id: studentId,
      };

      await AcademicAPI.deleteStudentInExtra(id, payload);
      queryClient.invalidateQueries({
        queryKey: ["extracurricular-members"],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [search, setSearch] = useState("");
  const [extraFilter, setExtraFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortType, setSortType] = useState("ascending");
  const [sortSettings, setSortSettings] = useState<any>("");
  const [openSortModal, setOpenSortModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [
    isOpenCreateExtracurricularMember,
    setIsOpenCreateExtracurricularMember,
  ] = useState(false);
  const [openCreateExtracurriculum, setOpenCreateExtracurriculum] =
    useState(false);

  const { data: extracurriculars, isLoading: isLoading1 } =
    useExtracurriculars();
  const { data: extracurricularMembers, isLoading: isLoading2 } =
    useExtracurricularMembers();
  const { data: teacherList, isLoading: isLoading3 } = useTeachers();
  const { data: studentList, isLoading: isLoading4 } = useStudents();

  if (isLoading1 || isLoading2 || isLoading3 || isLoading4) {
    return <></>;
  }

  const extraList = extracurriculars.sort((a, b) => a.id - b.id);

  const dataExtra = extraList.map((ed) => {
    const studentSum = extracurricularMembers.filter(
      (sd) => sd.extracurricular_id == ed.id
    )?.length;

    return {
      id: ed.id,
      extracurricular: ed.name,
      guardian: ed.teacher_name,
      students: studentSum,
      guardian_id: ed.teacher_id,
    };
  });

  const dataMemExtra = extracurricularMembers.map((md, idx) => {
    return {
      id: idx,
      extracurricular: md.extracurricular_name,
      extracurricular_id: md.extracurricular_id,
      class: "X IPA 1",
      student: md.student_name,
      student_id: md.student_id,
    };
  });

  let filteredData;

  activeTab === 0
    ? (filteredData = dataExtra.filter((item) => {
        return item.extracurricular
          .toLowerCase()
          .includes(search.toLowerCase());
      }))
    : (filteredData = dataMemExtra.filter((item) => {
        return (
          item.student.toLowerCase().includes(search.toLowerCase()) &&
          item.extracurricular.toLowerCase().includes(extraFilter.toLowerCase())
        );
      }));

  const tabs = [
    {
      title: "Ekstrakurikuler",
      component: (
        <ClassTable
          formik={formik}
          data={filteredData}
          deleteExtra={deleteExtra}
          teacherList={teacherList}
        />
      ),
    },
    {
      title: "Anggota",
      component: (
        <StudentTable
          formik={formik}
          data={filteredData}
          deleteStudentInExtra={deleteStudentInExtra}
        />
      ),
    },
  ];

  return (
    <Stack sx={{ height: "100%", width: "100%", p: { xs: 0, lg: 4 } }}>
      <CreateExtracurricularModal
        emptyData={emptyData}
        formik={formik}
        openCreateExtracurriculum={openCreateExtracurriculum}
        setOpenCreateExtracurriculum={setOpenCreateExtracurriculum}
        teacherList={teacherList}
      />
      <CreateExtracurricularMemberModal
        dataMemExtra={dataMemExtra}
        emptyData={emptyData}
        extraList={extraList}
        formik={formik}
        isOpenCreateExtracurricularMember={isOpenCreateExtracurricularMember}
        setIsOpenCreateExtracurricularMember={
          setIsOpenCreateExtracurricularMember
        }
        studentList={studentList}
      />
      <SortModal
        activeTab={activeTab}
        openSortModal={openSortModal}
        setOpenSortModal={setOpenSortModal}
        setSortBy={setSortBy}
        setSortSettings={setSortSettings}
        setSortType={setSortType}
        sortBy={sortBy}
        sortSettings={sortSettings}
        sortType={sortType}
      />
      <Stack
        sx={{
          flexDirection: "row",
          display: { xs: "none", lg: "flex" },
          mb: 2,
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
          Ekstrakurikuler
        </Typography>
      </Stack>
      <TableParent
        activeTab={activeTab}
        anchorEl={anchorEl}
        dataExtra={dataExtra}
        emptyData={emptyData}
        formik={formik}
        handleClick={handleClick}
        handleClose={handleClose}
        open={open}
        search={search}
        setActiveTab={setActiveTab}
        setExtraFilter={setExtraFilter}
        setIsOpenCreateExtracurricularMember={
          setIsOpenCreateExtracurricularMember
        }
        setOpenCreateExtracurriculum={setOpenCreateExtracurriculum}
        setOpenSortModal={setOpenSortModal}
        setSearch={setSearch}
        setSortBy={setSortBy}
        setSortSettings={setSortSettings}
        tabs={tabs}
        extraFilter={extraFilter}
      />
    </Stack>
  );
}
