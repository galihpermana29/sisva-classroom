"use client";

import { SortIcon } from "@/assets/SVGs";
import {
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FormAddStudent } from "./components/FormAddStudent";
import DataTable from "./components/Table";

import UsersAPI from "@/api/users";
import { useAdministrationSelector } from "@/app/administration/hooks";
import { useFormik } from "formik";
import ImportXLSXAlert from "../../components/ImportXLSXAlert";
import FilterAndButtonBar from "./components/FilterAndButtonBar";
import MobileSortModal from "./components/MobileSortModal";

import {
  selectSearchText,
  selectSortDirection,
  selectSortField,
} from "./utils/studentProfileSlice";

export default function SchoolProfileListContent() {
  const search = useAdministrationSelector(selectSearchText);
  const sortField = useAdministrationSelector(selectSortField);
  const sortDirection = useAdministrationSelector(selectSortDirection);

  const initialData = {
    name: "",
    type: "student",
    permissions: [],
    password: "",
    password_confirm: "",
  };
  const formik = useFormik({
    initialValues: { ...initialData },

    onSubmit: async (values) => {
      const { name, password, type, password_confirm } = values;

      let payload = {
        user: {
          name,
          type,
          detail: {
            json_text: JSON.stringify({}),
          },
          profile_image_uri: "",
          roles: [type],
        },
        password,
      };

      try {
        await UsersAPI.createUser(payload);

        getAllStudent();
        formik.setValues(initialData);
      } catch (error) {
        console.log(error, "error adding staff");
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

  const [studentData, setStudentData] = useState([]);
  const [openSortModal, setOpenSortModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [isOpenImportXLSXAlert, setIsOpenImportXLSXAlert] = useState(false);
  const [importXLSXAlertTitle, setImportXLSXAlertTitle] = useState("");
  const [importAlert, setImportAlert] = useState([]);

  const deleteUser = async (userData) => {
    try {
      userData.status = "deleted";

      await UsersAPI.updateUserById(userData, userData.id);

      getAllStudent();
    } catch (error) {
      console.log(error, "error delete staff");
    }
  };

  const getAllStudent = async (params = "student") => {
    try {
      const {
        data: { data },
      } = await UsersAPI.getAllUsers(params);

      const newMappedData = data
        .map((user) => {
          const additionalJson = JSON.parse(user.detail.json_text);
          return { ...additionalJson, ...user };
        })
        .filter((user) => user.status === "active");

      setStudentData(newMappedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllStudent();
  }, []);

  let filteredData = studentData.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.username.toLowerCase().includes(search.toLowerCase())
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

  return (
    <Stack sx={{ height: "100%", width: "100%", p: { xs: 0, lg: 4 } }}>
      <ImportXLSXAlert
        open={isOpenImportXLSXAlert}
        handleClose={() => setIsOpenImportXLSXAlert(false)}
        importReport={importAlert}
        title={importXLSXAlertTitle}
      />
      <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
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
            <FormAddStudent formik={formik} />
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
                setOpenCreateModal(false);
                formik.setValues(initialData);
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenCreateModal(false);
                formik.handleSubmit();
              }}
            >
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Modal>
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
          Daftar Siswa
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
        <FilterAndButtonBar
          anchorEl={anchorEl}
          getAllStudent={getAllStudent}
          handleClick={handleClick}
          handleClose={handleClose}
          open={open}
          setImportAlert={setImportAlert}
          setImportXLSXAlertTitle={setImportXLSXAlertTitle}
          setIsOpenImportXLSXAlert={setIsOpenImportXLSXAlert}
          setOpenCreateModal={setOpenCreateModal}
        />
        <Stack
          sx={{
            flexDirection: "row",
            px: 2,
            height: 54,
            mb: 1,
            display: { xs: "flex", lg: "none" },
          }}
        >
          <Stack sx={{ flexDirection: "row", py: 1, flex: 1 }}>
            {/* <Divider orientation="vertical" sx={{ mx: 1 }} /> */}
            <Button
              sx={{
                backgroundColor: "base.base30",
                color: "base.base50",
                fontSize: 16,
                width: "100%",
                "&:hover": {
                  backgroundColor: "base.base40",
                },
              }}
              onClick={() => {
                setOpenSortModal(true);
              }}
            >
              <SortIcon />
              <Typography sx={{ fontSize: 14, ml: 1 }}>Urutkan Data</Typography>
            </Button>
          </Stack>
        </Stack>
        <Divider />
        <Box sx={{ flex: 1, overflowY: "hidden" }}>
          <DataTable data={filteredData} deleteUser={deleteUser} />
        </Box>
      </Stack>
    </Stack>
  );
}
