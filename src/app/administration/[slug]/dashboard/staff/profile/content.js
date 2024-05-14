'use client';

import {
  Add,
  Cancel,
  DownloadRounded,
  Search,
  UploadFileRounded,
} from '@mui/icons-material';
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
} from '@mui/material';
import DataTable from './components/Table';
import { ExcelIcon, ExportIcon, SortIcon } from '@/assets/SVGs';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { permissions, types } from '@/globalcomponents/Variable';
import { FormAddStaff } from './components/FormAddStaff';

import { useFormik } from 'formik';
import UsersAPI from '@/api/users';

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
          nik: '1229908741927312', // need to be added into the form
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

      console.log(payload);

      try {
        const res = await UsersAPI.createUser(payload);

        // setSnackbarOpen({
        //   visible: true,
        //   message: 'Data is updated successfully',
        //   severity: 'success',
        // });

        window.location.reload();

        formik.setValues(initialData);
      } catch (error) {
        console.log(error, 'error adding staff');
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

  const [staffData, setStaffData] = useState([]);

  let [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [permissionFilter, setPermissionFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortType, setSortType] = useState('ascending');
  const [sortSettings, setSortSettings] = useState('');
  const [openSortModal, setOpenSortModal] = useState(false);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const getAllUsers = async (params = 'staff,teacher') => {
    try {
      const {
        data: { data },
      } = await UsersAPI.getAllUsers(params);

      const newMappedData = data.map((user) => {
        const additionalJson = JSON.parse(user.detail.json_text);
        return { ...user, ...additionalJson };
      });

      setStaffData(newMappedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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

  function Filters() {
    return (
      <Stack
        sx={{
          flexDirection: 'row',
          flex: 1,
          overflowX: 'auto',
          py: 1,
          px: { xs: 0, lg: 1 },
        }}
      >
        <TextField
          select
          size='small'
          label='Tipe'
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ flex: { xs: 1, lg: 0 }, minWidth: 100, width: 'fit-content' }}
          InputProps={{
            sx: { minWidth: 100, width: { xs: '100%', lg: 'fit-content' } },
            startAdornment: typeFilter && (
              <Cancel
                onClick={() => {
                  setTypeFilter('');
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
          {types.map((option) => (
            <MenuItem key={option.slug} value={option.slug}>
              <Typography fontSize={14}>{option.title}</Typography>
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size='small'
          label='Akses'
          value={permissionFilter}
          onChange={(e) => setPermissionFilter(e.target.value)}
          sx={{
            flex: { xs: 1, lg: 0 },
            ml: 1,
            minWidth: 100,
            width: 'fit-content',
          }}
          InputProps={{
            sx: { minWidth: 100, width: { xs: '100%', lg: 'fit-content' } },
            startAdornment: permissionFilter && (
              <Cancel
                onClick={() => {
                  setPermissionFilter('');
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
          {permissions.map((option) => (
            <MenuItem key={option.slug} value={option.slug}>
              <Typography fontSize={14}>{option.title}</Typography>
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    );
  }

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
            <FormAddStaff handleSubmit={formik.handleSubmit} formik={formik} />
          </Box>
          <Divider />
          <Stack
            sx={{
              flexDirection: 'row',
              p: 2,
            }}
          >
            <Button
              variant='outlined'
              sx={{ flex: 1, mr: 1 }}
              onClick={() => {
                setOpenCreateModal(false);
                formik.setValues(initialData);
              }}
            >
              Batal
            </Button>
            <Button
              type='submit'
              variant='contained'
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
            size='small'
            label='Data'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
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
            size='small'
            label='Jenis Urutan'
            value={sortType}
            disabled={!sortBy}
            onChange={(e) => setSortType(e.target.value)}
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
              variant='outlined'
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
              variant='contained'
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
      <Stack
        component={Paper}
        variant='outlined'
        sx={{
          borderRadius: { xs: 0, lg: 2 },
          overflowY: 'auto',
          flex: 1,
          maxHeight: '100%',
          position: 'relative',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            height: { xs: 'fit-content', lg: 70 },
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            pt: 1,
            pb: { lg: 1, xs: 0 },
            mt: { xs: 1, lg: 0 },
          }}
        >
          <Stack
            sx={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <TextField
              // id="outlined-search"
              placeholder='Cari Karyawan'
              size='small'
              type='text'
              sx={{
                maxWidth: { xs: '100%', lg: '200px' },
                flex: 1,
                width: '100%',
                height: '100%',
                borderRight: '1px solid rgb(0,0,0,0.12)',
                pr: 1,
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: search && (
                  <Cancel
                    onClick={() => {
                      setSearch('');
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
                endAdornment: (
                  <InputAdornment position='end'>
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Hidden lgDown>
              <Filters />
            </Hidden>
          </Stack>

          <Stack
            sx={{
              flexDirection: 'row',
              borderLeft: { xs: 'none', lg: '1px solid rgb(0,0,0,0.12)' },
              pl: 1,
            }}
          >
            <Button
              variant='outlined'
              color='primary'
              startIcon={<ExcelIcon />}
              sx={{
                display: { xs: 'none', lg: 'flex' },
                width: 'fit-content',
                height: '100%',
                width: 100,
                mr: 1,
                borderColor: 'green',
                backgroundColor: 'white',
                '&:hover': {
                  borderColor: 'green',
                  backgroundColor: 'base:base20',
                },
              }}
              id='profile-button'
              aria-controls={open ? 'profile-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <Typography sx={{ color: 'green', fontSize: 14 }}>
                Excel
              </Typography>
            </Button>
            <Menu
              elevation={2}
              id='profile-menu'
              aria-labelledby='profile-button'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem onClick={handleClose} sx={{ padding: 1, width: 98 }}>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <DownloadRounded sx={{ fontSize: 18, mr: 1 }} />
                  <Typography sx={{ fontSize: 14 }}>Export</Typography>
                </Stack>
              </MenuItem>
              <MenuItem onClick={handleClose} sx={{ padding: 1 }}>
                <label htmlFor='import-csv'>
                  <Stack flexDirection={'row'} alignItems={'center'}>
                    <UploadFileRounded sx={{ fontSize: 18, mr: 1 }} />
                    <Typography sx={{ fontSize: 14 }}>Import</Typography>
                    <input
                      name={'import_csv'}
                      accept='csv'
                      id='import-csv'
                      type='file'
                      style={{
                        position: 'absolute',
                        opacity: '0',
                        border: '1px solid red',
                      }}
                      // onChange={handleImageChange}
                    />
                  </Stack>
                </label>
              </MenuItem>
            </Menu>

            <Button
              variant='contained'
              color='primary'
              startIcon={<Add />}
              sx={{
                width: 100,
                height: '100%',
              }}
              onClick={() => setOpenCreateModal(true)}
            >
              <Typography sx={{ fontSize: 14 }}>Tambah</Typography>
            </Button>
          </Stack>
        </Stack>

        <Stack
          sx={{
            flexDirection: 'row',
            px: 2,
            height: 54,
            mb: 1,
            display: { xs: 'flex', lg: 'none' },
          }}
        >
          <Filters />
          <Stack sx={{ flexDirection: 'row', py: 1 }}>
            <Divider orientation='vertical' sx={{ mx: 1 }} />
            <Button
              sx={{
                backgroundColor: 'base.base30',
                color: 'base.base50',
                fontSize: 18,
                '&:hover': {
                  backgroundColor: 'base.base40',
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
        <Box sx={{ flex: 1, overflowY: 'hidden' }}>
          <DataTable data={filteredData} />
        </Box>
      </Stack>
    </Stack>
  );
}
