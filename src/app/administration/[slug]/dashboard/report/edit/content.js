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
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";

import { useFormik } from "formik";
import CurriculumTable from "./components/CurriculumTable";
import { FormAddCurriculum } from "./components/FormAddCurriculum";
import { FormAddSubject } from "./components/FormAddSubject";
import { FormAddSyllabus } from "./components/FormAddSyllabus";
import SubjectTable from "./components/SubjectTable";
import SyllabusTable from "./components/SyllabusTable";
export default function StaffProfileContent() {
  const [emptyData, setEmptyData] = useState({
    name: "",
    study_programs: "",
    subjects: 0,
  });
  const [filledData, setFilledData] = useState({
    name: "Ilmu Pengetahuan Alam",
    code: "IPA",
    status: "active",
    grades: ["X", "XI", "XII"],
  });
  const formik = useFormik({
    initialValues: { emptyData },
  });

  const mataPelajaranIPS = [
    "Bahasa Indonesia",
    "Matematika",
    "Bahasa Inggris",
    "Sejarah",
    "Geografi",
    "Ekonomi",
    "Sosiologi",
    "Bahasa dan Sastra Asing",
    "Seni dan Budaya",
    "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
    "Kewirausahaan",
    "Pendidikan Agama dan Budi Pekerti",
    "Pendidikan Pancasila dan Kewarganegaraan (PPKn)",
    "Teknologi Informasi dan Komunikasi (TIK)",
  ];

  const mataPelajaranIPA = [
    "Matematika",
    "Fisika",
    "Kimia",
    "Biologi",
    "Bahasa Inggris",
    "Bahasa Indonesia",
    "Pendidikan Agama dan Budi Pekerti",
    "Pendidikan Pancasila dan Kewarganegaraan (PPKn)",
    "Seni dan Budaya",
    "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
    "Kewirausahaan",
    "Teknologi Informasi dan Komunikasi (TIK)",
  ];
  const mataPelajaranSisva = [
    "Arsiktektur",
    "Musik",
    "Teater",
    "Pemrograman",
    "Film",
    "Penelitian",
    "Digital Marketing",
  ];
  let data = [
    {
      id: 1,
      name: "Kurikulum Merdeka",
      study_programs: ["IPA", "IPS", "IPA-U", "IPS-U"],
      subjects: mataPelajaranIPA.length,
    },
    {
      id: 2,
      name: "Kurikulum 2013",
      study_programs: ["IPA", "IPS", "IPA-U", "IPS-U"],
      subjects: mataPelajaranIPS.length,
    },
    {
      id: 3,
      name: "Kurikulum Sekolah Sisva",
      study_programs: ["IPA", "IPS", "IPA-U", "IPS-U"],
      subjects: mataPelajaranSisva.length,
    },
  ];

  let [dataSubject, setDataSubject] = useState([]);
  let [dataSyllabus, setDataSyllabus] = useState([]);

  useEffect(() => {
    let temp = [];
    let id = 1;
    ["Kurikulum Merdeka", "Kurikulum 2013"].map((item) => {
      mataPelajaranIPA.map((subject) => {
        let tempObject = {
          id: id,
          name: item,
          study_program: "IPA",
          subject: subject,
          subject_type: "mandatory",
        };
        temp.push(tempObject);
        id++;
      });
      mataPelajaranIPS.map((subject) => {
        let tempObject = {
          id: id,
          name: item,
          study_program: "IPS",
          subject: subject,
          subject_type: "mandatory",
        };
        temp.push(tempObject);
        id++;
      });

      mataPelajaranIPA.map((subject) => {
        let tempObject = {
          id: id,
          name: item,
          study_program: "IPA-U",
          subject: subject,
          subject_type: "mandatory",
        };
        temp.push(tempObject);
        id++;
      });
      mataPelajaranIPS.map((subject) => {
        let tempObject = {
          id: id,
          name: item,
          study_program: "IPS-U",
          subject: subject,
          subject_type: "mandatory",
        };
        temp.push(tempObject);
        id++;
      });
    });

    mataPelajaranSisva.map((subject) => {
      ["IPA", "IPS", "IPA-U", "IPS-U"].map((item) => {
        let tempObject = {
          id: id,
          name: "Kurikulum Sekolah Sisva",
          study_program: item,
          subject: subject,
          subject_type: "elective",
        };
        temp.push(tempObject);
        id++;
      });
    });

    setDataSubject(temp);

    id = 0;

    let tempSyllabus = [];

    temp.map((data) => {
      ["X", "XI", "XII"].map((item) => {
        let tempObject = {
          id: id,
          name: data.name,
          study_program: data.study_program,
          subject: data.subject,
          grade: item,
          syllabus_uri: "",
        };

        tempSyllabus.push(tempObject);
        id++;
      });
    });

    setDataSyllabus(tempSyllabus);
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [curriculumFilter, setCurriculumFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [studyProgramFilter, setStudyProgramFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortType, setSortType] = useState("ascending");
  const [sortSettings, setSortSettings] = useState("");
  const [openSortModal, setOpenSortModal] = useState(false);

  const [openCreateCurriculumModal, setOpenCreateCurriculumModal] =
    useState(false);
  const [openCreateSubjectModal, setOpenCreateSubjectModal] = useState(false);
  const [openCreateSyllabusModal, setOpenCreateSyllabusModal] = useState(false);

  const [activeTab, setActiveTab] = useState(0);
  let tabs = [
    {
      title: "Mata Pelajaran",
      component: <CurriculumTable formik={formik} data={filteredData} />,
    },
    {
      title: "Kelas",
      component: <SubjectTable formik={formik} data={filteredData} />,
    },
    {
      title: "Ekstrakurikuler",
      component: <SyllabusTable formik={formik} data={filteredData} />,
    },
  ];

  useEffect(() => {
    let temp = [];
    if (activeTab === 0) {
      temp = data.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
    } else if (activeTab === 1) {
      temp = dataSubject.filter((item) => {
        return (
          item.subject.toLowerCase().includes(search.toLowerCase()) &&
          (item.name.toLowerCase() === curriculumFilter.toLowerCase() ||
            !curriculumFilter) &&
          (item.study_program.toLowerCase() ===
            studyProgramFilter.toLowerCase() ||
            !studyProgramFilter)
        );
      });
    } else if (activeTab === 2) {
      temp = dataSyllabus.filter((item) => {
        return (
          item.subject.toLowerCase().includes(search.toLowerCase()) &&
          (item.name.toLowerCase() === curriculumFilter.toLowerCase() ||
            !curriculumFilter) &&
          (item.study_program.toLowerCase() ===
            studyProgramFilter.toLowerCase() ||
            !studyProgramFilter) &&
          (item.subject.toLowerCase() === subjectFilter.toLowerCase() ||
            !subjectFilter)
        );
      });
    }
    if (sortSettings && sortSettings.sortBy) {
      temp = temp.sort(function (a, b) {
        let x, y;
        if (activeTab === 0) {
          x = a.name.toLowerCase();
          y = b.name.toLowerCase();
        }

        if (activeTab === 1) {
          if (sortSettings.sortBy === "name") {
            x = a.name.toLowerCase();
            y = b.name.toLowerCase();
          }
          if (sortSettings.sortBy === "study_program") {
            x = a.study_program.toLowerCase();
            y = b.study_program.toLowerCase();
          }
          if (sortSettings.sortBy === "subject") {
            x = a.subject.toLowerCase();
            y = b.subject.toLowerCase();
          }
          if (sortSettings.sortBy === "subject_type") {
            x = a.subject_type.toLowerCase();
            y = b.subject_type.toLowerCase();
          }
        }

        if (activeTab === 2) {
          if (sortSettings.sortBy === "name") {
            x = a.name.toLowerCase();
            y = b.name.toLowerCase();
          }
          if (sortSettings.sortBy === "study_program") {
            x = a.study_program.toLowerCase();
            y = b.study_program.toLowerCase();
          }
          if (sortSettings.sortBy === "subject") {
            x = a.subject.toLowerCase();
            y = b.subject.toLowerCase();
          }
          if (sortSettings.sortBy === "grade") {
            x = a.grade.toLowerCase();
            y = b.grade.toLowerCase();
          }
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
    formik.setValues(emptyData);
  }, [
    search,
    curriculumFilter,
    subjectFilter,
    studyProgramFilter,
    sortSettings,
    activeTab,
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
              label="Kurikulum"
              value={curriculumFilter}
              onChange={(e) => setCurriculumFilter(e.target.value)}
              sx={{
                flex: { xs: 1, lg: 0 },
                minWidth: "fit-content",
              }}
              InputProps={{
                sx: { minWidth: 140, width: { xs: "100%", lg: "fit-content" } },
                startAdornment: curriculumFilter && (
                  <Cancel
                    onClick={() => {
                      setCurriculumFilter("");
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
              {[
                "Kurikulum Merdeka",
                "Kurikulum 2013",
                "Kurikulum Sekolah Sisva",
              ].map((option, index) => (
                <MenuItem key={index} value={option}>
                  <Typography fontSize={14}>{option}</Typography>
                </MenuItem>
              ))}
            </TextField>
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
                ml: 1,
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
              {["IPA", "IPS", "IPA-U", "IPS-U"].map((option, index) => (
                <MenuItem key={index} value={option}>
                  <Typography fontSize={14}>{option}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Stack>
      );
    }
    if (activeTab === 2) {
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
              label="Kurikulum"
              value={curriculumFilter}
              onChange={(e) => setCurriculumFilter(e.target.value)}
              sx={{
                flex: { xs: 1, lg: 0 },
                minWidth: "fit-content",
              }}
              InputProps={{
                sx: { minWidth: 140, width: { xs: "100%", lg: "fit-content" } },
                startAdornment: curriculumFilter && (
                  <Cancel
                    onClick={() => {
                      setCurriculumFilter("");
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
              {[
                "Kurikulum Merdeka",
                "Kurikulum 2013",
                "Kurikulum Sekolah Sisva",
              ].map((option, index) => (
                <MenuItem key={index} value={option}>
                  <Typography fontSize={14}>{option}</Typography>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size="small"
              label="Program Studi"
              value={studyProgramFilter}
              onChange={(e) => setStudyProgramFilter(e.target.value)}
              sx={{
                flex: { xs: 1, lg: 0 },
                minWidth: "fit-content",
                ml: 1,
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
              {["IPA", "IPS", "IPA-U", "IPS-U"].map((option, index) => (
                <MenuItem key={index} value={option}>
                  <Typography fontSize={14}>{option}</Typography>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size="small"
              label="Mata Pelajaran"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              sx={{
                flex: { xs: 1, lg: 0 },
                minWidth: "fit-content",
                ml: 1,
              }}
              InputProps={{
                sx: { minWidth: 140, width: { xs: "100%", lg: "fit-content" } },
                startAdornment: subjectFilter && (
                  <Cancel
                    onClick={() => {
                      setSubjectFilter("");
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
              {mataPelajaranIPA.map((option, index) => (
                <MenuItem key={index} value={option}>
                  <Typography fontSize={14}>{option}</Typography>
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
      <Modal
        open={openCreateSyllabusModal}
        onClose={() => {
          setOpenCreateSyllabusModal(false);
          formik.setValues({ name: "" });
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
          <Box sx={{ maxHeight: "70vh", overflowY: "auto", px: 2 }}>
            <FormAddSyllabus formik={formik} editing={false} />
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
                setOpenCreateSyllabusModal(false);
                formik.setValues({});
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenCreateSyllabusModal(false);
                formik.setValues({});
              }}
            >
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Modal
        open={openCreateSubjectModal}
        onClose={() => {
          setOpenCreateSubjectModal(false);
          formik.setValues({ name: "" });
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
              Tambah Mata Pelajaran
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: "70vh", overflowY: "auto", px: 2 }}>
            <FormAddSubject formik={formik} />
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
                setOpenCreateSubjectModal(false);
                formik.setValues({ name: "", code: "" });
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenCreateSubjectModal(false);
                formik.setValues({ name: "", code: "" });
              }}
            >
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Modal
        open={openCreateCurriculumModal}
        onClose={() => {
          setOpenCreateCurriculumModal(false);
          formik.setValues(emptyData);
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
              Tambah Kurikulum
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: "70vh", overflowY: "auto", px: 2 }}>
            <FormAddCurriculum formik={formik} />
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
                setOpenCreateCurriculumModal(false);
                formik.setValues(emptyData);
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenCreateCurriculumModal(false);
                formik.setValues(emptyData);
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
            {(activeTab === 0
              ? [{ title: "Kurikulum", slug: "name" }]
              : activeTab === 1
              ? [
                  { title: "Kurikulum", slug: "name" },
                  { title: "Program Studi", slug: "study_program" },
                  { title: "Mata Pelajaran", slug: "subject" },
                  { title: "Tipe", slug: "subject_type" },
                ]
              : [
                  { title: "Kurikulum", slug: "name" },
                  { title: "Program Studi", slug: "study_program" },
                  { title: "Mata Pelajaran", slug: "subject" },
                  { title: "Tingkatan", slug: "grade" },
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
          Edit Rapot
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
                  // formik.setValues(emptyData);
                  index === 0 ? setFilteredData(data) : null;
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
              placeholder={`Cari ${
                activeTab !== 2 ? tabs[activeTab].title : "Mata Pelajaran"
              }`}
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
              <MenuItem onClick={handleClose} sx={{ padding: 1 }}>
                <label htmlFor="import-csv">
                  <Stack flexDirection={"row"} alignItems={"center"}>
                    <UploadFileRounded sx={{ fontSize: 18, mr: 1 }} />
                    <Typography sx={{ fontSize: 14 }}>Import</Typography>
                    <input
                      name={"import_csv"}
                      accept="csv"
                      id="import-csv"
                      type="file"
                      style={{
                        position: "absolute",
                        opacity: "0",
                        border: "1px solid red",
                      }}
                      // onChange={handleImageChange}
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
                  ? setOpenCreateCurriculumModal(true)
                  : activeTab === 1
                  ? setOpenCreateSubjectModal(true)
                  : activeTab === 2
                  ? setOpenCreateSyllabusModal(true)
                  : null
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
