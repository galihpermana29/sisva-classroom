import { Cancel } from '@mui/icons-material';
import {
  Button,
  MenuItem,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { memo } from 'react';

function SortModal({
  activeTab,
  openSortModal,
  setOpenSortModal,
  setSortBy,
  setSortSettings,
  setSortType,
  sortBy,
  sortSettings,
  sortType,
}) {
  return (
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
          {(activeTab === 1
            ? [
                { title: 'Periode', slug: 'period_name' },
                { title: 'Program Studi', slug: 'study_program' },
                { title: 'Tingkatan', slug: 'grade' },
                { title: 'Kurikulum', slug: 'curriculum' },
              ]
            : [
                { title: 'Periode', slug: 'period_name' },
                { title: 'Rentang Waktu', slug: 'start_time' },
                { title: 'Status', slug: 'status' },
              ]
          ).map((option) => (
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
            variant="outlined"
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
  );
}

export default memo(SortModal);
