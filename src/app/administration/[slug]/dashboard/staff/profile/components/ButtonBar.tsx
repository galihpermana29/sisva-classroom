import { ExcelIcon } from '@/assets/SVGs';
import { Add, DownloadRounded, UploadFileRounded } from '@mui/icons-material';
import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import handleXLSXUpload from '../utils/handleXLSXUpload';

function ButtonBar({
  anchorEl,
  getAllUsers,
  handleClick,
  handleClose,
  open,
  setOpenCreateModal,
}) {
  return (
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
  );
}

export default memo(ButtonBar);
