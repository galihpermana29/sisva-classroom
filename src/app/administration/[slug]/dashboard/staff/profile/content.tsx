"use client";

import { Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useCallback, useState } from "react";

import UsersAPI from "@/api/users";
import { invalidateStaffTeachers } from "@/hooks/query/user/useStaffTeachers";

import CreateModal from "./components/CreateModal";
import SortModal from "./components/SortModal";
import TableParent from "./components/TableParent";

const initialData = {
  name: "",
  type: "staff",
  permissions: [],
  password: "",
  password_confirm: "",
};

export default function StaffProfileListContent() {
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: { ...initialData },

    onSubmit: async (values) => {
      const { name, password, type, permissions, password_confirm } = values;

      if (password !== password_confirm) return;

      let payload = {
        user: {
          name,
          type,
          detail: {
            json_text: JSON.stringify({}),
          },
          profile_image_uri: "",
          roles: [type],
          permissions,
        },
        password,
      };

      try {
        const res = await UsersAPI.createUser(payload);
        formik.setValues(initialData);
        invalidateStaffTeachers(queryClient);
      } catch (error) {
        console.log(error, "error adding staff");
      }
    },
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const [openSortModal, setOpenSortModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const deleteUser = useCallback(
    async (userData) => {
      try {
        userData.status = "deleted";
        await UsersAPI.updateUserById(userData, userData.id);
        invalidateStaffTeachers(queryClient);
      } catch (error) {
        console.log(error, "error delete staff");
      }
    },
    [queryClient]
  );

  return (
    <Stack sx={{ height: "100%", width: "100%", p: { xs: 0, lg: 4 } }}>
      <CreateModal
        formik={formik}
        initialData={initialData}
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
      <SortModal
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
          Daftar Karyawan
        </Typography>
      </Stack>
      <TableParent
        handleClick={handleClick}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        setOpenCreateModal={setOpenCreateModal}
        setOpenSortModal={setOpenSortModal}
        deleteUser={deleteUser}
      />
    </Stack>
  );
}
