import {
  useAdministrationDispatch,
  useAdministrationSelector,
} from "@/app/administration/hooks";
import { useDebouncedCallback } from "@mantine/hooks";
import { Cancel, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useRef } from "react";
import {
  selectStudyProgramSearchText,
  setStudyProgramSearchText,
} from "../utils/studyProgramSlice";

export default function StudyProgramSearchFilter() {
  const inputTextRef = useRef<HTMLInputElement>();
  const dispatch = useAdministrationDispatch();
  const searchText = useAdministrationSelector(selectStudyProgramSearchText);
  const debouncedSetSearchText = useDebouncedCallback(
    (searchText: string) => dispatch(setStudyProgramSearchText(searchText)),
    250
  );

  return (
    <TextField
      inputRef={inputTextRef}
      placeholder={`Cari Program Studi`}
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
              inputTextRef.current.value = "";
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
