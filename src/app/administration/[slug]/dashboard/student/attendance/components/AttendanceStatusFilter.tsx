import {
  useAdministrationDispatch,
  useAdministrationSelector,
} from "@/app/administration/hooks";
import type { Attendance } from "@/types/types";
import { Cancel } from "@mui/icons-material";
import { MenuItem, TextField, Typography } from "@mui/material";
import {
  selectAttendanceFilter,
  setAttendanceFilter,
} from "../utils/studentAttendanceSlice";

export default function AttendanceStatusFilter() {
  const dispatch = useAdministrationDispatch();
  const statusFilter = useAdministrationSelector(selectAttendanceFilter);

  return (
    <TextField
      select
      size="small"
      label="Status"
      value={statusFilter}
      onChange={(e) => {
        dispatch(setAttendanceFilter(e.target.value as Attendance));
      }}
      sx={{
        flex: { xs: 1, lg: 0 },
        minWidth: "fit-content",
        ml: 1,
      }}
      InputProps={{
        sx: { minWidth: 140, width: { xs: "100%", lg: "fit-content" } },
        startAdornment: statusFilter && (
          <Cancel
            onClick={() => {
              dispatch(setAttendanceFilter(""));
            }}
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
      {[
        { value: "present", label: "Hadir" },
        { value: "sick", label: "Sakit" },
        { value: "leave", label: "Izin" },
        { value: "absent", label: "Alpha" },
      ].map((option, index) => (
        <MenuItem key={index} value={option.value}>
          <Typography fontSize={14}>{option.label}</Typography>
        </MenuItem>
      ))}
    </TextField>
  );
}
