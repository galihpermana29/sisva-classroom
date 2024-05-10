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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import AttendanceApi from '@/api/attendance';
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

  const [pickedDate, setPickedDate] = useState(dayjs(new Date()));

  const formik = useFormik({
    initialValues: { ...initialData },
  });

  let data = [
    {
      id: 'bb28c1b4-4a84-48a7-8d01-20bf157d1c61',
      username: 'agung.prabowo',
      nik: '78901234567890',
      name: 'Agung Prabowo',
      type: 'staff',
      detail: {},
      profile_image_uri:
        'https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      roles: ['staff', 'teacher'],
      permissions: [
        'school',
        'staff',
        'academic',
        'student',
        'report',
        'information',
        'finance',
      ],
      status: 'present',
    },
    {
      id: '9c7bf4f7-7df6-48a3-94df-67de486ac1ca',
      username: 'putra.utama',
      nik: '12345678901234',
      name: 'Putra Utama',
      type: 'staff',
      detail: {},
      profile_image_uri: `https://source.unsplash.com/random/300x300`,
      roles: ['staff'],
      permissions: ['academic', 'student', 'report'],
      status: 'leave',
    },
    {
      id: '1b19c067-1fc1-4856-a4a9-c0c7a32aeb5e',
      username: 'siti.rahma',
      nik: '23456789012345',
      name: 'Siti Rahmawati',
      type: 'staff',
      detail: {},
      profile_image_uri: `https://source.unsplash.com/random/300x301`,
      roles: ['staff'],
      permissions: ['finance'],
      status: 'present',
    },
    {
      id: '9aa18316-9e57-4aa3-aa0b-3df0fdeac42a',
      username: 'indra.kusuma',
      nik: '34567890123456',
      name: 'Indra Kusuma',
      type: 'staff',
      detail: {},
      profile_image_uri: `https://source.unsplash.com/random/300x302`,
      roles: ['staff'],
      permissions: ['information'],
      status: 'present',
    },
    {
      id: '91b93b08-16f9-4b8d-b991-9b11ef2c7744',
      username: 'nur.hidayah',
      nik: '45678901234567',
      name: 'Nur Hidayah',
      type: 'staff',
      detail: {},
      profile_image_uri: `https://source.unsplash.com/random/300x303`,
      roles: ['staff'],
      permissions: [],
      status: 'present',
    },
    {
      id: '4f674fea-688f-4ae1-8c29-900c1d1b6852',
      username: 'budi.santoso',
      nik: '56789012345678',
      name: 'Budi Santoso',
      type: 'staff',
      detail: {},
      profile_image_uri: `https://source.unsplash.com/random/300x304`,
      roles: ['staff'],
      permissions: [],
      status: 'absent',
    },
    {
      id: '01bf819d-ea18-475d-9c18-488ac27a1212',
      username: 'maya.dewi',
      nik: '67890123456789',
      name: 'Maya Dewi',
      type: 'teacher',
      detail: {},
      profile_image_uri: `https://source.unsplash.com/random/300x305`,
      roles: ['staff', 'teacher'],
      permissions: ['report'],
      status: 'present',
    },
    {
      id: '45a8d93a-e7ca-4c2f-a1e8-4d8bf7e51f1e',
      username: 'dian.sari',
      nik: '89012345678901',
      name: 'Dian Sari',
      type: 'teacher',
      detail: {},
      profile_image_uri: `https://source.unsplash.com/random/300x307`,
      roles: ['staff', 'teacher'],
      permissions: ['report'],
      status: 'sick',
    },
    {
      id: 'a0c1b7e6-529c-456e-b77f-428cd75c1ea4',
      username: 'bayu.pratama',
      nik: '90123456789012',
      name: 'Bayu Pratama',
      type: 'teacher',
      detail: {},
      profile_image_uri: `https://source.unsplash.com/random/300x308`,
      roles: ['staff', 'teacher'],
      permissions: ['report'],
      status: 'present',
    },
    {
      id: 'b4a8f1eb-4e64-4ae3-9d14-109ea2c1b9ab',
      username: 'wulan.sari',
      nik: '12345678901234',
      name: 'Wulan Sari',
      type: 'teacher',
      detail: {},
      profile_image_uri: `https://source.unsplash.com/random/300x309`,
      roles: ['staff', 'teacher'],
      permissions: ['report'],
      status: 'present',
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [tableData, setTableData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [permissionFilter, setPermissionFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortType, setSortType] = useState('ascending');
  const [sortSettings, setSortSettings] = useState('');
  const [openSortModal, setOpenSortModal] = useState(false);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const fetchStaffAttendance = async (pickedDate) => {
    try {
      const unixDate = dayjs(new Date(pickedDate)).unix();

      const {
        data: { data },
      } = await AttendanceApi.getStaffAttendanceByDateId(unixDate);

      const userDetailData = await (
        await UsersAPI.getAllUsers('staff,teacher')
      ).data.data;

      const newMappedData = data.map((user) => {
        const userId = userDetailData.id;

        if (userDetailData.find((detail) => detail.id === userId)) {
          return { ...user, username: detail.username };
        }
      });

      setTableData(newMappedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStaffAttendance(pickedDate);
  }, [pickedDate]);

  useEffect(() => {
    let temp = tableData.filter((item) => {
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
  }, [search, typeFilter, permissionFilter, sortSettings]);

  let [studyProgramFilter, setStudyProgramFilter] = useState('');

  function Filters() {
    return (
      <Stack
        sx={{
          flexDirection: 'row',
          flex: 1,
          overflowX: 'auto',
          alignItems: 'center',
          py: 1,
          px: { xs: 0, lg: 1 },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: { lg: '160px', xs: '100%' } }}
            slotProps={{ textField: { size: 'small' } }}
            label='Pilih Tanggal'
            value={pickedDate}
            onChange={(e) => {
              setPickedDate(e);
            }}
          />
        </LocalizationProvider>
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
              variant='contained'
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenCreateModal(false);
                formik.setValues(initialData);
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
          Kehadiran Karyawan
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

            {/* <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              sx={{
                width: 100,
                height: "100%",
              }}
              onClick={() => setOpenCreateModal(true)}
            >
              <Typography sx={{ fontSize: 14 }}>Tambah</Typography>
            </Button> */}
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
