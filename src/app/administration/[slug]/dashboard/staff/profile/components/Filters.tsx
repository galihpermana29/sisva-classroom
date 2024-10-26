import { permissions, types } from '@/globalcomponents/Variable';
import { Cancel } from '@mui/icons-material';
import { MenuItem, Stack, TextField, Typography } from '@mui/material';

export default function Filters({
  permissionFilter,
  typeFilter,
  onChangeType,
  onClickCancelType,
  onChangePermission,
  onClickCancelPermission,
}) {
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
        size="small"
        label="Tipe"
        value={typeFilter}
        onChange={onChangeType}
        sx={{ flex: { xs: 1, lg: 0 }, minWidth: 100, width: 'fit-content' }}
        InputProps={{
          sx: { minWidth: 100, width: { xs: '100%', lg: 'fit-content' } },
          startAdornment: typeFilter && (
            <Cancel
              onClick={onClickCancelType}
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
        size="small"
        label="Akses"
        value={permissionFilter}
        onChange={onChangePermission}
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
              onClick={onClickCancelPermission}
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
