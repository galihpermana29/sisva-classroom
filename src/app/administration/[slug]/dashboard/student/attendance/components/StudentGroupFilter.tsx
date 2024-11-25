import { Cancel } from "@mui/icons-material";
import { MenuItem, TextField, Typography } from "@mui/material";

import {
  useAdministrationDispatch,
  useAdministrationSelector,
} from "@/app/administration/hooks";
import { useStudentGroups } from "@/hooks/query/academic/useStudentGroups";

import {
  selectStudentGroupFilter,
  setStudentGroupFilter,
} from "../utils/studentAttendanceSlice";

export default function StudentGroupFilter() {
  const { data: studentGroups } = useStudentGroups();
  const dispatch = useAdministrationDispatch();
  const studentGroupFilter = useAdministrationSelector(
    selectStudentGroupFilter
  );

  return (
    <TextField
      select
      size="small"
      label="Kelas"
      value={studentGroupFilter}
      onChange={(e) => dispatch(setStudentGroupFilter(e.target.value))}
      sx={{
        flex: { xs: 1, lg: 0 },
        minWidth: "fit-content",
        ml: 1,
      }}
      InputProps={{
        sx: { minWidth: 140, width: { xs: "100%", lg: "fit-content" } },
        startAdornment: studentGroupFilter && (
          <Cancel
            onClick={() => {
              dispatch(setStudentGroupFilter(""));
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
      {studentGroups?.map((studentGroup) => (
        <MenuItem key={studentGroup.id} value={studentGroup.id}>
          <Typography fontSize={14}>{studentGroup.name}</Typography>
        </MenuItem>
      ))}
    </TextField>
  );
}
