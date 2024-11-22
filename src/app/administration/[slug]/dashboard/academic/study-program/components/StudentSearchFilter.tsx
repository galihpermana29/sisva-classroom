import {
  useAdministrationDispatch,
  useAdministrationSelector,
} from "@/app/administration/hooks";
import { useDebouncedCallback } from "@mantine/hooks";
import { Cancel, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import {
  selectStudentSearchText,
  setStudentSearchText,
} from "../utils/studyProgramSlice";

export default function StudentSearchFilter() {
  const dispatch = useAdministrationDispatch();
  const searchText = useAdministrationSelector(selectStudentSearchText);
  const debouncedSetSearchText = useDebouncedCallback(
    (searchText: string) => dispatch(setStudentSearchText(searchText)),
    250
  );

  return (
    <TextField
      placeholder={`Cari Siswa`}
      size="small"
      type="text"
      sx={{
        maxWidth: { xs: "100%", lg: "200px" },
        flex: 1,
        width: "100%",
        height: "100%",
        pr: 1,
      }}
      defaultValue={searchText}
      onChange={(e) => debouncedSetSearchText(e.target.value)}
      InputProps={{
        startAdornment: searchText && (
          <Cancel
            onClick={() => {
              debouncedSetSearchText("");
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
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
}
