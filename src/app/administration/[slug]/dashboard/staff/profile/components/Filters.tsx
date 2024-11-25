import { Cancel } from "@mui/icons-material";
import { MenuItem, Stack, TextField, Typography } from "@mui/material";

import {
  useAdministrationDispatch,
  useAdministrationSelector,
} from "@/app/administration/hooks";
import { permissions, types } from "@/globalcomponents/Variable";
import type { Permission, Role } from "@/types/types";

import {
  selectPermissionFilter,
  selectRoleFilter,
  setPermissionFilter,
  setRoleFilter,
} from "../utils/staffProfileSlice";

export default function Filters() {
  const roleFilter = useAdministrationSelector(selectRoleFilter);
  const permissionFilter = useAdministrationSelector(selectPermissionFilter);
  const dispatch = useAdministrationDispatch();

  return (
    <Stack
      sx={{
        flexDirection: "row",
        flex: 1,
        overflowX: "auto",
        py: 1,
        px: { xs: 0, lg: 1 },
      }}
    >
      <TextField
        select
        size="small"
        label="Tipe"
        value={roleFilter}
        onChange={(e) => dispatch(setRoleFilter(e.target.value as Role))}
        sx={{ flex: { xs: 1, lg: 0 }, minWidth: 100, width: "fit-content" }}
        InputProps={{
          sx: { minWidth: 100, width: { xs: "100%", lg: "fit-content" } },
          startAdornment: roleFilter && (
            <Cancel
              onClick={() => dispatch(setRoleFilter(""))}
              sx={{
                fontSize: 14,
                color: "base.base50",
                cursor: "pointer",
                transform: "translateX(-4px)",
                "&:hover": {
                  color: "base.base60",
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
        onChange={(e) =>
          dispatch(setPermissionFilter(e.target.value as Permission))
        }
        sx={{
          flex: { xs: 1, lg: 0 },
          ml: 1,
          minWidth: 100,
          width: "fit-content",
        }}
        InputProps={{
          sx: { minWidth: 100, width: { xs: "100%", lg: "fit-content" } },
          startAdornment: permissionFilter && (
            <Cancel
              onClick={() => dispatch(setPermissionFilter(""))}
              sx={{
                fontSize: 14,
                color: "base.base50",
                cursor: "pointer",
                transform: "translateX(-4px)",
                "&:hover": {
                  color: "base.base60",
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
