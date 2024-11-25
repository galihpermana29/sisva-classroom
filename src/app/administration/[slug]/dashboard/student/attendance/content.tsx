"use client";

import { DownloadRounded, UploadFileRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Hidden,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

import AcademicAPI from "@/api/academic";
import AttendanceApi from "@/api/attendance";
import UsersAPI from "@/api/users";
import {
  useAdministrationDispatch,
  useAdministrationSelector,
} from "@/app/administration/hooks";
import { ExcelIcon, SortIcon } from "@/assets/SVGs";
import generateDateCode from "@/utils/generateDateCode";

import ImportXLSXAlert from "../../components/ImportXLSXAlert";
import AttendanceStatusFilter from "./components/AttendanceStatusFilter";
import MobileSortModal from "./components/MobileSortModal";
import SearchFilter from "./components/SearchFilter";
import StudentGroupFilter from "./components/StudentGroupFilter";
import StudentAttendanceProgressAlert from "./components/StudentProgressAlert";
import DataTable from "./components/Table";
import handleXLSXUploadStudentAttendance from "./utils/handleXLSXUploadStudentAttendance";
import {
  selectAttendanceFilter,
  selectSearchText,
  selectSelectedDate,
  selectSortDirection,
  selectSortField,
  selectStudentGroupFilter,
  setProgress,
  setProgressLog,
  setSelectedDate,
  toggleProgressAlert,
} from "./utils/studentAttendanceSlice";

export default function StaffProfileListContent() {
  const dispatch = useAdministrationDispatch();
  const sortField = useAdministrationSelector(selectSortField);
  const sortDirection = useAdministrationSelector(selectSortDirection);
  const searchText = useAdministrationSelector(selectSearchText);
  const studentGroupFilter = useAdministrationSelector(
    selectStudentGroupFilter
  );
  const attendanceFilter = useAdministrationSelector(selectAttendanceFilter);
  const selectedDate = useAdministrationSelector(selectSelectedDate);

  const initialData = {
    id: "",
    status: "present",
  };
  const formik = useFormik({
    initialValues: { ...initialData },

    onSubmit: async (values) => {
      try {
        const dateCode = generateDateCode(dayjs(selectedDate));

        const id = values.id;

        const payload = {
          date_id: Number(dateCode),
          status: values.status,
        };

        await AttendanceApi.createStudentAttendance(id, payload);
        getAllStudentAttendance();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [attendanceData, setStudentAttendanceData] = useState([]);

  const [openSortModal, setOpenSortModal] = useState(false);

  const [isOpenXLSXAlert, setIsOpenImportXLSXAlert] = useState(false);
  const [reportText, setReportText] = useState([]);
  const [XLSXAlertTitle, setXLSXAlertTitle] = useState("");

  const getAllStudentAttendance = async () => {
    try {
      const dateCode = generateDateCode(dayjs(selectedDate));

      const {
        data: { data },
      } = await AttendanceApi.getStudentClassAttendanceByDateId(dateCode);
      const studentInStudentGroups = (await AcademicAPI.getAllStudentInGroup())
        .data.data;

      const studentDetailData = await (
        await UsersAPI.getAllUsers("student")
      ).data.data.filter((dt) => dt.status == "active");

      const newMappedData = studentDetailData
        .filter((user) =>
          studentInStudentGroups
            .map((student) => student.student_id)
            .includes(user.id)
        )
        .map((user) => {
          const stats = data.find((dt) => user.id == dt.student_id)?.status;
          const studentGroup = studentInStudentGroups.find(
            (sd) => sd.student_id == user.id
          );

          return {
            ...user,
            status: stats ? stats : "present",
            class: studentGroup.student_group_name
              ? studentGroup.student_group_name
              : "-",
            studentGroupId: studentGroup.student_group_id,
          };
        });

      setStudentAttendanceData(newMappedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudentAttendance();
  }, [selectedDate]);

  let filteredData = attendanceData.filter((item) => {
    return (
      (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.username.toLowerCase().includes(searchText.toLowerCase())) &&
      (studentGroupFilter
        ? item.studentGroupId === studentGroupFilter
        : true) &&
      item.status.toLowerCase().includes(attendanceFilter.toLowerCase())
    );
  });

  filteredData = filteredData.sort(function (a, b) {
    let x, y;
    if (sortField === "name") {
      x = a.name.toLowerCase();
      y = b.name.toLowerCase();
    } else if (sortField === "username") {
      x = a.name.toLowerCase();
      y = b.name.toLowerCase();
    }

    if (sortDirection === "ascending") {
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    } else if (sortDirection === "descending") {
      if (x > y) {
        return -1;
      }
      if (x < y) {
        return 1;
      }
      return 0;
    }
  });

  function Filters() {
    return (
      <Stack
        sx={{
          flexDirection: "row",
          flex: 1,
          overflowX: "auto",
          overflowY: "hidden",
          alignItems: "center",
          py: 1,
          px: { xs: 0, lg: 1 },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "160px", minWidth: 140 }}
            slotProps={{ textField: { size: "small" } }}
            label="Pilih Tanggal"
            value={dayjs(selectedDate)}
            onChange={(e) => {
              dispatch(setSelectedDate(e.toISOString()));
            }}
          />
        </LocalizationProvider>
        <StudentGroupFilter />
        <AttendanceStatusFilter />
      </Stack>
    );
  }

  return (
    <Stack sx={{ height: "100%", width: "100%", p: { xs: 0, lg: 4 } }}>
      <StudentAttendanceProgressAlert />
      <ImportXLSXAlert
        open={isOpenXLSXAlert}
        handleClose={() => setIsOpenImportXLSXAlert(false)}
        title={XLSXAlertTitle}
        importReport={reportText}
      />
      <MobileSortModal
        openSortModal={openSortModal}
        setOpenSortModal={setOpenSortModal}
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
          Kehadiran Siswa
        </Typography>
      </Stack>
      <Stack
        component={Paper}
        variant="outlined"
        sx={{
          borderRadius: { xs: 0, lg: 2 },
          overflowY: "auto",
          flex: 1,
          maxHeight: "100%",
          position: "relative",
        }}
      >
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
            <SearchFilter />
            <Hidden lgDown>
              <Filters />
            </Hidden>
          </Stack>

          <Stack
            sx={{
              flexDirection: "row",
              borderLeft: { xs: "none", lg: "1px solid rgb(0,0,0,0.12)" },
              pl: 1,
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
              <MenuItem sx={{ padding: 1, width: 98 }}>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <DownloadRounded sx={{ fontSize: 18, mr: 1 }} />
                  <Typography sx={{ fontSize: 14 }}>Export</Typography>
                </Stack>
              </MenuItem>
              <MenuItem sx={{ padding: 1 }}>
                <label htmlFor="import-csv">
                  <Stack flexDirection={"row"} alignItems={"center"}>
                    <UploadFileRounded sx={{ fontSize: 18, mr: 1 }} />
                    <Typography sx={{ fontSize: 14 }}>Import</Typography>
                    <input
                      name={"import_csv"}
                      accept=".xlsx"
                      id="import-csv"
                      type="file"
                      style={{
                        position: "absolute",
                        opacity: "0",
                        border: "1px solid red",
                      }}
                      onChange={(e) => {
                        handleXLSXUploadStudentAttendance({
                          file: e.target.files[0],
                          onSuccess: (reportText) => {
                            setReportText(reportText);
                            setXLSXAlertTitle("Import File Berhasil");
                            setIsOpenImportXLSXAlert(true);
                          },
                          onError: (reportText) => {
                            setReportText(reportText);
                            setXLSXAlertTitle("Import File Bermasalah");
                            setIsOpenImportXLSXAlert(true);
                          },
                          toggleProgressAlert: (isOpen) => {
                            dispatch(toggleProgressAlert(isOpen));
                          },
                          setProgress: (progress) => {
                            dispatch(setProgress(progress));
                          },
                          setProgressLog: (progressLog) => {
                            dispatch(setProgressLog(progressLog));
                          },
                        });
                        handleClose();
                      }}
                    />
                  </Stack>
                </label>
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>

        <Stack
          sx={{
            flexDirection: "row",
            px: 2,
            height: 54,
            mb: 1,
            display: { xs: "flex", lg: "none" },
          }}
        >
          <Filters />
          <Stack sx={{ flexDirection: "row", py: 1 }}>
            <Divider orientation="vertical" sx={{ mx: 1 }} />
            <Button
              sx={{
                backgroundColor: "base.base30",
                color: "base.base50",
                fontSize: 18,
                "&:hover": {
                  backgroundColor: "base.base40",
                },
              }}
              onClick={() => {
                setOpenSortModal(true);
              }}
            >
              <SortIcon />
            </Button>
          </Stack>
        </Stack>
        <Divider />
        <Box sx={{ flex: 1, overflowY: "hidden" }}>
          <DataTable data={filteredData} formik={formik} />
        </Box>
      </Stack>
    </Stack>
  );
}
