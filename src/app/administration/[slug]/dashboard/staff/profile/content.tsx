'use client';

import { Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import CreateModal from './components/CreateModal';

import UsersAPI from '@/api/users';
import { useFormik } from 'formik';
import SortModal from './components/SortModal';
import TableParent from './components/TableParent';

export type SortBy = 'name' | 'username' | '';
export type SortType = 'ascending' | 'descending' | '';
export type SortSettings = { sortBy: SortBy; sortType: SortType };

const initialData = {
  name: '',
  username: '',
  type: 'staff',
  permissions: [],
  password: '',
  password_confirm: '',
};

export default function StaffProfileListContent() {
  const formik = useFormik({
    initialValues: { ...initialData },

    onSubmit: async (values) => {
      const { name, password, type, username, permissions, password_confirm } =
        values;

      if (password !== password_confirm) return;

      let payload = {
        user: {
          name,
          type,
          detail: {
            json_text: JSON.stringify({
              username,
            }),
          },
          profile_image_uri: '',
          roles: [type],
          permissions,
        },
        password,
      };

      try {
        const res = await UsersAPI.createUser(payload);
        getAllUsers();
        formik.setValues(initialData);
      } catch (error) {
        console.log(error, 'error adding staff');
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

  const [staffData, setStaffData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [permissionFilter, setPermissionFilter] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('');
  const [sortType, setSortType] = useState<SortType>('ascending');
  const [sortSettings, setSortSettings] = useState<SortSettings | null>(null);
  const [openSortModal, setOpenSortModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const getAllUsers = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await UsersAPI.getAllUsers('staff,teacher');
      const newMappedData = data
        .map((user) => {
          const additionalJson = JSON.parse(user.detail.json_text);
          delete additionalJson.username;
          return { ...user, ...additionalJson };
        })
        .filter((user) => user.status == 'active');

      setStaffData(newMappedData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteUser = useCallback(
    async (userData) => {
      try {
        userData.status = 'deleted';

        await UsersAPI.updateUserById(userData, userData.id);

        getAllUsers();
      } catch (error) {
        console.log(error, 'error delete staff');
      }
    },
    [getAllUsers]
  );

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    let temp = staffData.filter((item) => {
      return (
        (item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.username.toLowerCase().includes(search.toLowerCase())) &&
        item.type.toLowerCase().includes(typeFilter.toLowerCase()) &&
        (!permissionFilter || item.permissions.includes(permissionFilter))
      );
    });

    if (sortSettings && sortSettings.sortBy) {
      temp = temp.sort(function (a, b) {
        let x, y;
        if (sortSettings.sortBy === 'name') {
          x = a.name.toLowerCase();
          y = b.name.toLowerCase();
        } else if (sortSettings.sortBy === 'username') {
          x = a.name.toLowerCase();
          y = b.name.toLowerCase();
        }

        if (sortSettings.sortType === 'ascending') {
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        } else if (sortSettings.sortType === 'descending') {
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
  }, [search, typeFilter, permissionFilter, sortSettings, staffData]);

  return (
    <Stack sx={{ height: '100%', width: '100%', p: { xs: 0, lg: 4 } }}>
      <CreateModal
        formik={formik}
        initialData={initialData}
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
      <SortModal
        openSortModal={openSortModal}
        setOpenSortModal={setOpenSortModal}
        setSortBy={setSortBy}
        setSortSettings={setSortSettings}
        setSortType={setSortType}
        sortBy={sortBy}
        sortType={sortType}
      />
      <Stack
        sx={{
          flexDirection: 'row',
          display: { xs: 'none', lg: 'flex' },
          mb: 2,
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
          Daftar Karyawan
        </Typography>
      </Stack>
      <TableParent
        search={search}
        permissionFilter={permissionFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        setPermissionFilter={setPermissionFilter}
        setSearch={setSearch}
        handleClick={handleClick}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        getAllUsers={getAllUsers}
        setOpenCreateModal={setOpenCreateModal}
        setOpenSortModal={setOpenSortModal}
        filteredData={filteredData}
        deleteUser={deleteUser}
      />
    </Stack>
  );
}
