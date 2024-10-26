import { ExcelIcon, SortIcon } from '@/assets/SVGs';
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
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import DataTable from '../components/Table';

import { memo } from 'react';
import handleXLSXUpload from '../utils/handleXLSXUpload';
import Filters from './Filters';

function UnmemoizedTableParent({
  search,
  permissionFilter,
  typeFilter,
  setTypeFilter,
  setPermissionFilter,
  setSearch,
  handleClick,
  anchorEl,
  open,
  handleClose,
  getAllUsers,
  setOpenCreateModal,
  setOpenSortModal,
  filteredData,
  deleteUser,
}) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
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
            placeholder="Cari Karyawan"
            size="small"
            type="text"
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
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Hidden lgDown>
            <Filters
              permissionFilter={permissionFilter}
              typeFilter={typeFilter}
              onChangeType={(e) => setTypeFilter(e.target.value)}
              onClickCancelType={() => {
                setTypeFilter('');
              }}
              onChangePermission={(e) => setPermissionFilter(e.target.value)}
              onClickCancelPermission={() => {
                setPermissionFilter('');
              }}
            />
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
            variant="outlined"
            color="primary"
            startIcon={<ExcelIcon />}
            sx={{
              display: { xs: 'none', lg: 'flex' },
              width: 'fit-content',
              height: '100%',
              mr: 1,
              borderColor: 'green',
              backgroundColor: 'white',
              '&:hover': {
                borderColor: 'green',
                backgroundColor: 'base:base20',
              },
            }}
            id="profile-button"
            aria-controls={open ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Typography sx={{ color: 'green', fontSize: 14 }}>Excel</Typography>
          </Button>
          <Menu
            elevation={2}
            id="profile-menu"
            aria-labelledby="profile-button"
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
            <MenuItem sx={{ padding: 1 }}>
              <label htmlFor="import-xlsx">
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <UploadFileRounded sx={{ fontSize: 18, mr: 1 }} />
                  <Typography sx={{ fontSize: 14 }}>Import</Typography>
                  <input
                    name={'import_xlsx'}
                    accept=".xlsx"
                    id="import-xlsx"
                    type="file"
                    style={{
                      position: 'absolute',
                      opacity: '0',
                      border: '1px solid red',
                    }}
                    onChange={(e) => {
                      handleXLSXUpload(e.target.files[0], getAllUsers);
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
        <Filters
          permissionFilter={permissionFilter}
          typeFilter={typeFilter}
          onChangeType={(e) => setTypeFilter(e.target.value)}
          onClickCancelType={() => {
            setTypeFilter('');
          }}
          onChangePermission={(e) => setPermissionFilter(e.target.value)}
          onClickCancelPermission={() => {
            setPermissionFilter('');
          }}
        />
        <Stack sx={{ flexDirection: 'row', py: 1 }}>
          <Divider orientation="vertical" sx={{ mx: 1 }} />
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
        <DataTable data={filteredData} deleteUser={deleteUser} />
      </Box>
    </Stack>
  );
}

export default memo(UnmemoizedTableParent);
