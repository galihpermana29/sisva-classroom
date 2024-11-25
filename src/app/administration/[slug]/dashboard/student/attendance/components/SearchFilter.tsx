import { useDebouncedCallback } from "@mantine/hooks";
import { Cancel, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useRef } from "react";

import {
  useAdministrationDispatch,
  useAdministrationSelector,
} from "@/app/administration/hooks";

import {
  selectSearchText,
  setSearchText,
} from "../utils/studentAttendanceSlice";

export default function SearchFilter() {
  const inputTextRef = useRef<HTMLInputElement>();
  const dispatch = useAdministrationDispatch();
  const search = useAdministrationSelector(selectSearchText);
  const debounchedSetSearchText = useDebouncedCallback(
    (text) => dispatch(setSearchText(text)),
    250
  );

  return (
    <TextField
      inputRef={inputTextRef}
      placeholder="Cari Siswa"
      size="small"
      type="text"
      sx={{
        maxWidth: { xs: "100%", lg: "200px" },
        flex: 1,
        width: "100%",
        height: "100%",
        borderRight: "1px solid rgb(0,0,0,0.12)",
        pr: 1,
      }}
      defaultValue={search}
      onChange={(e) => debounchedSetSearchText(e.target.value)}
      InputProps={{
        startAdornment: search && (
          <Cancel
            onClick={() => {
              inputTextRef.current.value = "";
              debounchedSetSearchText("");
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
