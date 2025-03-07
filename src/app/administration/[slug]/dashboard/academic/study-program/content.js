"use client";

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
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import StudyProgramTable from "./components/StudyProgramTable";
import GradeTable from "./components/GradeTable";
import { ExcelIcon, ExportIcon, SortIcon } from "@/assets/SVGs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { permissions, types } from "@/globalcomponents/Variable";
import { FormAddStudyProgram } from "./components/FormAddStudyProgram";
import { FormAddGrade } from "./components/FormAddGrade";

import { useFormik } from "formik";
export default function StaffProfileContent() {
  const [emptyData, setEmptyData] = useState({
    name: "",
    code: "",
    status: "active",
    grades: [],
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

  let data = [
    {
      id: 1,
      name: "Ilmu Pengetahuan Sosial",
      code: "IPS",
      status: "active",
      grades: ["X", "XI", "XII"],
    },
    {
      id: 2,
      name: "Ilmu Pengetahuan Alam",
      code: "IPA",
      status: "active",
      grades: ["X", "XI", "XII"],
    },
    {
      id: 3,
      name: "Ilmu Pengetahuan Sosial Unggulan",
      code: "IPS-U",
      status: "active",
      grades: ["X", "XI", "XII"],
    },
    {
      id: 4,
      name: "Ilmu Pengetahuan Alam Unggulan",
      code: "IPA-U",
      status: "active",
      grades: ["X", "XI", "XII"],
    },
  ];

  let [dataTingkatan, setDataTingkatan] = useState([]);

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
  const [studyProgramFilter, setStudyProgramFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortType, setSortType] = useState("ascending");
  const [sortSettings, setSortSettings] = useState("");
  const [openSortModal, setOpenSortModal] = useState(false);

  const [openCreateStudyProgramModal, setOpenCreateStudyProgramModal] =
    useState(false);
  const [openCreateGradeModal, setOpenCreateGradeModal] = useState(false);

  const [activeTab, setActiveTab] = useState(0);
  let tabs = [
    {
      title: "Program Studi",
      component: <StudyProgramTable formik={formik} data={filteredData} />,
    },
    {
      title: "Tingkatan",
      component: <GradeTable formik={formik} data={filteredData} />,
    },
  ];

  useEffect(() => {
    let temp = [];
    data.map((studyProgram) => {
      studyProgram.grades.map((grade) => {
        let tempObject = {
          id: grade + "-" + studyProgram.code,
          name: studyProgram.name,
          code: studyProgram.code,
          grade: grade,
        };
        temp.push(tempObject);
      });
    });
    setDataTingkatan(temp);
  }, []);

  useEffect(() => {
    let temp = [];
    if (activeTab === 0) {
      temp = data.filter((item) => {
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
    formik.setValues(emptyData);
  }, [search, studyProgramFilter, sortSettings, activeTab]);

  function Filters() {
    if (activeTab === 1) {
      return (
        <Stack
          sx={{
            flexDirection: "row",
            flex: 1,
            overflowX: "auto",
            height: 54,
            px:{xs:0,lg:1}
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
              {data.map((option) => (
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
      <Modal
        open={openCreateGradeModal}
        onClose={() => {
          setOpenCreateGradeModal(false);
          formik.setValues({ code: "", grades: [] });
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
            <FormAddGrade formik={formik} />
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
                formik.setValues(emptyData);
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenCreateGradeModal(false);
                formik.setValues(emptyData);
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
                formik.setValues(emptyData);
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenCreateStudyProgramModal(false);
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
                  formik.setValues(emptyData);
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
                  display: { lg: activeTab!==0? "flex":"none", xs: "none" },
                  borderRight: { xs: "none", lg: "1px solid rgb(0,0,0,0.12)" },

                  my: 1,
                  height: 36,
                }}
              />

              <Filters />
              <Box
                sx={{
                  display: { lg: activeTab!==0? "flex":"none", xs: "none" },
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
                  ? setOpenCreateStudyProgramModal(true)
                  : activeTab === 1
                  ? setOpenCreateGradeModal(true)
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
