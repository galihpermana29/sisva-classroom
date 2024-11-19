"use client";

import { ExcelIcon, SortIcon } from "@/assets/SVGs";
import {
  Add,
  Cancel,
  DownloadRounded,
  Search,
  UploadFileRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Hidden,
  InputAdornment,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FormAddGrade } from "./components/FormAddGrade";
import { FormAddStudyProgram } from "./components/FormAddStudyProgram";
import GradeTable from "./components/GradeTable";
import StudyProgramTable from "./components/StudyProgramTable";

import AcademicAPI from "@/api/academic";
import UsersAPI from "@/api/users";
import { useStudyPrograms } from "@/hooks/useStudyPrograms";
import { useFormik } from "formik";
import ImportXLSXAlert from "../../components/ImportXLSXAlert";
import handleXLSXUploadAcademic from "../utils/handleXLSXUploadAcademic";
import { FormAddStudent } from "./components/FormAddStudent";
import StudentTable from "./components/StudentTable";

export default function StaffProfileContent() {
  const { data: studyPrograms } = useStudyPrograms();
  const initialValues = {
    code: "",
    name: "",
    status: "active",
    grades: [],
  };

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: async (values) => {
      if (activeTab == 0) {
        try {
          if (!values.id) {
            await AcademicAPI.createProdi(values);
            formik.setValues(initialValues);
          } else {
            const id = values.id;
            delete values.id;

            await AcademicAPI.updateProdi(values, id);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (activeTab == 1) {
        try {
          const id = values.id;
          delete values.id;

          await AcademicAPI.updateProdi(values, id);
          formik.setValues(initialValues);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const id = values.student;

          const detail = {
            ...values.detail,
          };

          const payload = {
            detail: {
              grade: values.grade,
              json_text: JSON.stringify(detail),
              study_program_id: values.study_program,
            },
          };

          await UsersAPI.updateUserById(payload, id);
        } catch (error) {
          console.log(error);
        }
      }

      getAllStudent();
      getAllStudyProgram();
    },
  });

  let [dataTingkatan, setDataTingkatan] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [tableData, setTableData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [studentList, setStudentList] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [studyProgramFilter, setStudyProgramFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortType, setSortType] = useState("ascending");
  const [sortSettings, setSortSettings] = useState("");
  const [openSortModal, setOpenSortModal] = useState(false);

  const [openCreateStudyProgramModal, setOpenCreateStudyProgramModal] =
    useState(false);
  const [openCreateGradeModal, setOpenCreateGradeModal] = useState(false);
  const [openCreateStudentModal, setOpenCreateStudentModal] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  const [isOpenImportXLSXAlert, setIsOpenImportXLSXAlert] = useState(false);
  const [importXLSXAlertText, setImportXLSXAlertText] = useState("");
  const [importReport, setImportReport] = useState([]);

  const deleteStudyProgram = async (id) => {
    try {
      await AcademicAPI.deleteProdi(id);

      getAllStudyProgram();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id, values) => {
    try {
      const payload = {
        detail: {
          json_text: JSON.stringify(values),
          study_program_id: 0,
          grade: "",
        },
      };

      await UsersAPI.updateUserById(payload, id);
    } catch (error) {
      console.log(error);
    }

    getAllStudent();
    getAllStudyProgram();
  };

  let tabs = [
    {
      title: "Program Studi",
      component: (
        <StudyProgramTable
          formik={formik}
          data={filteredData}
          deleteStudyProgram={deleteStudyProgram}
        />
      ),
    },
    {
      title: "Tingkatan",
      component: (
        <GradeTable formik={formik} data={filteredData} tableData={tableData} />
      ),
    },
    {
      title: "Siswa",
      component: (
        <StudentTable
          formik={formik}
          data={filteredData}
          tableData={tableData}
          studentList={studentList}
          deleteStudent={deleteStudent}
        />
      ),
    },
  ];

  const getAllStudyProgram = async () => {
    const {
      data: { data },
    } = await AcademicAPI.getAllProdi();

    const activeProgram = data
      .filter((program) => program.status === "active")
      .sort((a, b) => +a.id - +b.id);

    setTableData(activeProgram);

    getGradeData(activeProgram);
  };

  const getGradeData = (activeProgram) => {
    let temp = [];

    (activeProgram ? activeProgram : tableData).map((studyProgram) => {
      studyProgram.grades?.map((grade) => {
        let tempObject = {
          id: grade + "-" + studyProgram.code,
          name: studyProgram.name,
          code: studyProgram.code,
          grade: grade,
          studyProgramId: studyProgram.id,
        };
        temp.push(tempObject);
      });
    });

    setDataTingkatan(temp);
  };

  const getAllStudent = async () => {
    const {
      data: { data },
    } = await UsersAPI.getAllUsers("student");

    const noGradeData = data.filter((dt) => {
      if (
        !dt.detail.study_program_id &&
        dt.status == "active" &&
        dt.detail.grade == ""
      )
        return dt;
    });
    setStudentList(noGradeData);

    const activeStudent = data
      .filter((dt) => {
        if (
          dt.detail.study_program_id &&
          dt.status == "active" &&
          dt.detail.grade !== ""
        )
          return dt;
      })
      .map((dt) => {
        const details = JSON.parse(dt.detail.json_text);
        const grade = dt.detail.grade;

        return {
          id: dt.id,
          name: dt.name,
          study_program: studyPrograms.find(
            (data) => data.id === dt.detail.study_program_id
          )?.name,
          study_program_id: dt.detail.study_program_id,
          grade: grade,
          profile_image_uri: dt.profile_image_uri,
          detail: details,
        };
      });

    setStudentData(activeStudent);
  };

  useEffect(() => {
    getAllStudyProgram();
  }, []);

  useEffect(() => {
    if (tableData.length) getAllStudent();

    getGradeData();
  }, [tableData]);

  useEffect(() => {
    let temp = [];
    if (activeTab === 0) {
      temp = tableData.filter((item) => {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.code.toLowerCase().includes(search.toLowerCase())
        );
      });
    } else if (activeTab === 1) {
      temp = dataTingkatan.filter((item) => {
        return (
          item.grade.toLowerCase().includes(search.toLowerCase()) &&
          (item.code.toLowerCase() === studyProgramFilter.toLowerCase() ||
            !studyProgramFilter)
        );
      });
    } else if (activeTab === 2) {
      temp = studentData.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
    }
    if (sortSettings && sortSettings.sortBy) {
      temp = temp.sort(function (a, b) {
        let x, y;
        if (sortSettings.sortBy === "name") {
          x = a.name.toLowerCase();
          y = b.name.toLowerCase();
        }
        if (sortSettings.sortBy === "code") {
          x = a.code.toLowerCase();
          y = b.code.toLowerCase();
        }

        if (activeTab === 1 && sortSettings.sortBy === "grade") {
          x = a.grade.toLowerCase();
          y = b.grade.toLowerCase();
        }
        if (sortSettings.sortType === "ascending") {
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        } else if (sortSettings.sortType === "descending") {
          if (x > y) {
            return -1;
          }
          if (x < y) {
            return 1;
          }
          return 0;
        }
      });
    }
    setFilteredData(temp);
  }, [
    tableData,
    search,
    studyProgramFilter,
    sortSettings,
    activeTab,
    studentData,
  ]);

  function Filters() {
    if (activeTab === 1) {
      return (
        <Stack
          sx={{
            flexDirection: "row",
            flex: 1,
            overflowX: "auto",
            height: 54,
            px: { xs: 0, lg: 1 },
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              flex: 1,
              py: 1,
            }}
          >
            <TextField
              select
              size="small"
              label="Program Studi"
              value={studyProgramFilter}
              onChange={(e) => setStudyProgramFilter(e.target.value)}
              sx={{
                flex: { xs: 1, lg: 0 },
                minWidth: 140,
                width: { xs: "100%", lg: "fit-content" },
              }}
              InputProps={{
                sx: { minWidth: 140, width: { xs: "100%", lg: "fit-content" } },
                startAdornment: studyProgramFilter && (
                  <Cancel
                    onClick={() => {
                      setStudyProgramFilter("");
                    }}
                    sx={{
                      fontSize: 14,
                      color: "base.base50",
                      cursor: "pointer",
                      transform: "translateX(-4px)",
                      "&:hover": {
                        color: "base.base60",
                      },
                    }}
                  />
                ),
              }}
            >
              {tableData.map((option) => (
                <MenuItem key={option.code} value={option.code}>
                  <Typography fontSize={14}>{option.name}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Stack>
      );
    }
  }

  return (
    <Stack sx={{ height: "100%", width: "100%", p: { xs: 0, lg: 4 } }}>
      <ImportXLSXAlert
        open={isOpenImportXLSXAlert}
        handleClose={() => setIsOpenImportXLSXAlert(false)}
        importReport={importReport}
        title={importXLSXAlertText}
      />
      <Modal
        open={openCreateGradeModal}
        onClose={() => {
          setOpenCreateGradeModal(false);
          formik.setValues(initialValues);
        }}
      >
        <Stack
          component={Paper}
          elevation={2}
          sx={{
            borderRadius: 2,
            zIndex: 20,
            margin: "auto",
            position: "fixed",
            height: "fit-content",
            width: "360px",
            maxWidth: "80%",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <Box
            sx={{
              padding: 2,
            }}
          >
            <Typography fontWeight={600} fontSize={16}>
              Tambah Tingkatan
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: "70vh", px: 2 }}>
            <FormAddGrade formik={formik} tableData={tableData} />
          </Box>
          <Divider />
          <Stack
            sx={{
              flexDirection: "row",
              p: 2,
            }}
          >
            <Button
              variant="outlined"
              sx={{ flex: 1, mr: 1 }}
              onClick={() => {
                setOpenCreateGradeModal(false);
                formik.setValues(initialValues);
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenCreateGradeModal(false);
                formik.handleSubmit();
              }}
            >
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Modal
        open={openCreateStudyProgramModal}
        onClose={() => setOpenCreateStudyProgramModal(false)}
      >
        <Stack
          component={Paper}
          elevation={2}
          sx={{
            borderRadius: 2,
            zIndex: 20,
            margin: "auto",
            position: "fixed",
            height: "fit-content",
            width: "360px",
            maxWidth: "80%",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <Box
            sx={{
              padding: 2,
            }}
          >
            <Typography fontWeight={600} fontSize={16}>
              Tambah Program Studi
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: "70vh", overflowY: "auto", px: 2 }}>
            <FormAddStudyProgram formik={formik} />
          </Box>
          <Divider />
          <Stack
            sx={{
              flexDirection: "row",
              p: 2,
            }}
          >
            <Button
              variant="outlined"
              sx={{ flex: 1, mr: 1 }}
              onClick={() => {
                setOpenCreateStudyProgramModal(false);
                formik.setValues(initialValues);
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              onClick={() => {
                formik.handleSubmit();
                setOpenCreateStudyProgramModal(false);
              }}
            >
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Modal
        open={openCreateStudentModal}
        onClose={() => setOpenCreateStudentModal(false)}
      >
        <Stack
          component={Paper}
          elevation={2}
          sx={{
            borderRadius: 2,
            zIndex: 20,
            margin: "auto",
            position: "fixed",
            height: "fit-content",
            width: "360px",
            maxWidth: "80%",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <Box
            sx={{
              padding: 2,
            }}
          >
            <Typography fontWeight={600} fontSize={16}>
              Tambah Siswa
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: "70vh", overflowY: "auto", px: 2 }}>
            <FormAddStudent
              formik={formik}
              tableData={tableData}
              studentList={studentList}
            />
          </Box>
          <Divider />
          <Stack
            sx={{
              flexDirection: "row",
              p: 2,
            }}
          >
            <Button
              variant="outlined"
              sx={{ flex: 1, mr: 1 }}
              onClick={() => {
                setOpenCreateStudentModal(false);
                formik.setValues(initialValues);
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenCreateStudentModal(false);
                formik.handleSubmit();
              }}
            >
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Modal open={openSortModal} onClose={() => setOpenSortModal(false)}>
        <Stack
          component={Paper}
          elevation={2}
          sx={{
            padding: 2,
            borderRadius: 2,
            zIndex: 20,
            margin: "auto",
            position: "fixed",
            height: "fit-content",
            width: "240px",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <Typography fontWeight={600} fontSize={16}>
            Urutkan
          </Typography>
          <TextField
            select
            size="small"
            label="Data"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{ flex: 1, mt: 2 }}
            InputProps={{
              startAdornment: sortBy && (
                <Cancel
                  onClick={() => {
                    setSortBy("");
                  }}
                  sx={{
                    fontSize: 14,
                    color: "base.base50",
                    cursor: "pointer",
                    transform: "translateX(-4px)",
                    "&:hover": {
                      color: "base.base60",
                    },
                  }}
                />
              ),
            }}
          >
            {(activeTab === 1
              ? [
                  { title: "Program Studi", slug: "name" },
                  { title: "Kode", slug: "code" },
                  { title: "Tingkatan", slug: "grade" },
                ]
              : [
                  { title: "Program Studi", slug: "name" },
                  { title: "Kode", slug: "code" },
                ]
            ).map((option) => (
              <MenuItem key={option.slug} value={option.slug}>
                <Typography fontSize={14}>{option.title}</Typography>
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size="small"
            label="Jenis Urutan"
            value={sortType}
            disabled={!sortBy}
            onChange={(e) => setSortType(e.target.value)}
            sx={{ flex: 1, mt: 2, mb: 2 }}
          >
            {[
              { title: "A-Z", slug: "ascending" },
              { title: "Z-A", slug: "descending" },
            ].map((option) => (
              <MenuItem key={option.slug} value={option.slug}>
                <Typography fontSize={14}>{option.title}</Typography>
              </MenuItem>
            ))}
          </TextField>
          <Stack
            sx={{
              flexDirection: "row",
            }}
          >
            <Button
              variant="outlined"
              sx={{ flex: 1, mr: 1 }}
              onClick={() => {
                setOpenSortModal(false);
                setSortBy(sortSettings.sortBy);
                setSortType(sortSettings.sortType);
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenSortModal(false);
                setSortSettings({ sortBy: sortBy, sortType: sortType });
              }}
            >
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Stack
        sx={{
          flexDirection: "row",
          display: { xs: "none", lg: "flex" },
          mb: 2,
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
          Program Studi
        </Typography>
      </Stack>

      <Stack
        component={Paper}
        variant="outlined"
        sx={{
          borderRadius: { xs: 0, lg: 2 },
          flex: 1,
          overflowY: "hidden",
          maxHeight: "100%",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            borderBottom: "1px solid rgb(0,0,0,0.12)",
            // height: 54,
            overflowX: "auto",
          }}
        >
          {tabs.map((item, index) => {
            return (
              <Button
                key={index}
                sx={{
                  p: { xs: "16px 8px", lg: 2 },
                  minWidth: 140,
                  flex: { xs: 1, lg: 0 },
                  // height: 54,
                  borderBottom: "2px solid",
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderColor:
                    activeTab === index ? "primary.main" : "transparent",
                }}
                onClick={() => {
                  setActiveTab(index);
                  setStudyProgramFilter("");
                  setSearch("");
                  setSortBy("");
                  setSortSettings("");
                  formik.setValues(initialValues);
                  index === 0 ? setFilteredData(tableData) : null;
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                  {item.title}
                </Typography>
              </Button>
            );
          })}
        </Stack>
        <Stack
          sx={{
            flexDirection: "row",
            height: { xs: "fit-content", lg: 70 },
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            pt: 1,
            pb: { lg: 1, xs: 0 },
            mt: { xs: 1, lg: 0 },
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
            }}
          >
            <TextField
              // id="outlined-search"
              placeholder={`Cari ${tabs[activeTab].title}`}
              size="small"
              type="text"
              sx={{
                maxWidth: { xs: "100%", lg: "200px" },
                flex: 1,
                width: "100%",
                height: "100%",
                pr: 1,
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: search && (
                  <Cancel
                    onClick={() => {
                      setSearch("");
                    }}
                    sx={{
                      fontSize: 14,
                      color: "base.base50",
                      cursor: "pointer",
                      transform: "translateX(-4px)",
                      "&:hover": {
                        color: "base.base60",
                      },
                    }}
                  />
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Hidden lgDown>
              <Box
                sx={{
                  display: {
                    lg: activeTab !== 0 ? "flex" : "none",
                    xs: "none",
                  },
                  borderRight: { xs: "none", lg: "1px solid rgb(0,0,0,0.12)" },

                  my: 1,
                  height: 36,
                }}
              />

              <Filters />
              <Box
                sx={{
                  display: {
                    lg: activeTab !== 0 ? "flex" : "none",
                    xs: "none",
                  },
                  borderRight: { xs: "none", lg: "1px solid rgb(0,0,0,0.12)" },
                  // ml: 1,
                  my: 1,
                  height: 36,
                }}
              />
            </Hidden>
          </Stack>

          <Stack
            sx={{
              flexDirection: "row",
              pl: { xs: 0, lg: 1 },
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ExcelIcon />}
              sx={{
                display: { xs: "none", lg: "flex" },
                width: "fit-content",
                height: "100%",
                width: 100,
                mr: 1,
                borderColor: "green",
                backgroundColor: "white",
                "&:hover": {
                  borderColor: "green",
                  backgroundColor: "base:base20",
                },
              }}
              id="profile-button"
              aria-controls={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Typography sx={{ color: "green", fontSize: 14 }}>
                Excel
              </Typography>
            </Button>
            <Menu
              elevation={2}
              id="profile-menu"
              aria-labelledby="profile-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem onClick={handleClose} sx={{ padding: 1, width: 98 }}>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <DownloadRounded sx={{ fontSize: 18, mr: 1 }} />
                  <Typography sx={{ fontSize: 14 }}>Export</Typography>
                </Stack>
              </MenuItem>
              <MenuItem sx={{ padding: 1 }}>
                <label htmlFor="import-xlsx">
                  <Stack flexDirection={"row"} alignItems={"center"}>
                    <UploadFileRounded sx={{ fontSize: 18, mr: 1 }} />
                    <Typography sx={{ fontSize: 14 }}>Import</Typography>
                    <input
                      name={"import_xlsx"}
                      accept="xlsx"
                      id="import-xlsx"
                      type="file"
                      style={{
                        position: "absolute",
                        opacity: "0",
                        border: "1px solid red",
                      }}
                      onChange={(e) => {
                        handleXLSXUploadAcademic(
                          e.target.files[0],
                          (importReport) => {
                            setImportXLSXAlertText("File import berhasil");
                            setImportReport(
                              Object.values(importReport).filter((text) => text)
                            );
                            setIsOpenImportXLSXAlert(true);
                          },
                          (importReport) => {
                            setImportXLSXAlertText("File import bermasalah");
                            setImportReport(
                              Object.values(importReport).filter((text) => text)
                            );
                            setIsOpenImportXLSXAlert(true);
                          }
                        );
                        handleClose();
                      }}
                    />
                  </Stack>
                </label>
              </MenuItem>
            </Menu>

            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              sx={{
                width: 100,
                height: "100%",
              }}
              onClick={() =>
                activeTab === 0
                  ? setOpenCreateStudyProgramModal(true)
                  : activeTab === 1
                  ? setOpenCreateGradeModal(true)
                  : setOpenCreateStudentModal(true)
              }
            >
              <Typography sx={{ fontSize: 14 }}>Tambah</Typography>
            </Button>
          </Stack>
        </Stack>

        <Stack
          sx={{
            flexDirection: "row",
            px: 2,
            mb: 1,
            display: { xs: "flex", lg: "none" },
          }}
        >
          <Filters />
          <Stack
            sx={{ flexDirection: "row", py: 1, flex: activeTab === 0 ? 1 : 0 }}
          >
            <Divider
              orientation="vertical"
              sx={{ mx: 1, display: activeTab === 0 ? "none" : "flex" }}
            />
            <Button
              sx={{
                backgroundColor: "base.base30",
                color: "base.base50",
                fontSize: 18,
                height: 38,
                width: activeTab === 0 ? "100%" : "fit-content",
                "&:hover": {
                  backgroundColor: "base.base40",
                },
              }}
              onClick={() => {
                setOpenSortModal(true);
              }}
            >
              <SortIcon />
              <Typography
                sx={{
                  fontSize: 14,
                  ml: 1,
                  display: activeTab === 0 ? "flex" : "none",
                }}
              >
                Urutkan Data
              </Typography>
            </Button>
          </Stack>
        </Stack>
        <Divider />
        <Box sx={{ flex: 1, overflowY: "hidden" }}>
          {tabs[activeTab].component}
        </Box>
      </Stack>
    </Stack>
  );
}
