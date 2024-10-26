'use client';

import { Cancel } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { FormAddStaff } from './components/FormAddStaff';

import UsersAPI from '@/api/users';
import { useFormik } from 'formik';
import TableParent from './components/TableParent';
export default function StaffProfileListContent() {
  const [initialData, setinitialData] = useState({
    name: '',
    username: '',
    type: 'staff',
    permissions: [],
    password: '',
    password_confirm: '',
  });

  const formik = useFormik({
    initialValues: { ...initialData },

    onSubmit: async (values) => {
      const { name, password, type, username, permissions, password_confirm } =
        values;

      if (password !== password_confirm) {
        // setSnackbarOpen({
        //   visible: true,
        //   message: 'Password is not matched!',
        //   severity: 'error',
        // });
        return;
      }

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

        // setSnackbarOpen({
        //   visible: true,
        //   message: 'Data is updated successfully',
        //   severity: 'success',
        // });

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

  type SortBy = 'name' | 'username' | '';
  type SortType = 'ascending' | 'descending' | '';
  type SortSettings = { sortBy: SortBy; sortType: SortType };

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
      <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <Stack
          component={Paper}
          elevation={2}
          sx={{
            borderRadius: 2,
            zIndex: 20,
            margin: 'auto',
            position: 'fixed',
            height: 'fit-content',
            width: '360px',
            maxWidth: '80%',
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
              Tambah Karyawan
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: '70vh', overflowY: 'auto', px: 2 }}>
            <FormAddStaff formik={formik} />
          </Box>
          <Divider />
          <Stack
            sx={{
              flexDirection: 'row',
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
              type="submit"
              variant="contained"
              sx={{ flex: 1 }}
              onClick={() => {
                formik.handleSubmit();
                setOpenCreateModal(false);
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
            margin: 'auto',
            position: 'fixed',
            height: 'fit-content',
            width: '240px',
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
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            sx={{ flex: 1, mt: 2 }}
            InputProps={{
              startAdornment: sortBy && (
                <Cancel
                  onClick={() => {
                    setSortBy('');
                  }}
                  sx={{
                    fontSize: 14,
                    color: 'base.base50',
                    cursor: 'pointer',
                    transform: 'translateX(-4px)',
                    '&:hover': {
                      color: 'base.base60',
                    },
                  }}
                />
              ),
            }}
          >
            {[
              { title: 'Nama', slug: 'name' },
              { title: 'Username', slug: 'username' },
            ].map((option) => (
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
            onChange={(e) => setSortType(e.target.value as SortType)}
            sx={{ flex: 1, mt: 2, mb: 2 }}
          >
            {[
              { title: 'A-Z', slug: 'ascending' },
              { title: 'Z-A', slug: 'descending' },
            ].map((option) => (
              <MenuItem key={option.slug} value={option.slug}>
                <Typography fontSize={14}>{option.title}</Typography>
              </MenuItem>
            ))}
          </TextField>
          <Stack
            sx={{
              flexDirection: 'row',
            }}
          >
            <Button
              variant="outlined"
              sx={{ flex: 1, mr: 1 }}
              onClick={() => {
                setOpenSortModal(false);
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
