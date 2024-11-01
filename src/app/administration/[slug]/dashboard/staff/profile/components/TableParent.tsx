import { SortIcon } from '@/assets/SVGs';
import { Box, Button, Divider, Paper, Stack } from '@mui/material';
import DataTable from '../components/Table';

import { memo } from 'react';
import ButtonBar from './ButtonBar';
import FilterBar from './FilterBar';
import Filters from './Filters';

function TableParent({
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
        <FilterBar
          permissionFilter={permissionFilter}
          search={search}
          setPermissionFilter={setPermissionFilter}
          setSearch={setSearch}
          setTypeFilter={setTypeFilter}
          typeFilter={typeFilter}
        />

        <ButtonBar
          anchorEl={anchorEl}
          getAllUsers={getAllUsers}
          handleClick={handleClick}
          handleClose={handleClose}
          open={open}
          setOpenCreateModal={setOpenCreateModal}
        />
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

export default memo(TableParent);
