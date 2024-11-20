import {
  useAdministrationDispatch,
  useAdministrationSelector,
} from "@/app/administration/hooks";
import { useDebouncedCallback } from "@mantine/hooks";
import { Cancel, Search } from "@mui/icons-material";
import { Hidden, InputAdornment, Stack, TextField } from "@mui/material";
import { memo } from "react";
import { selectSearchText, setSearchText } from "../utils/staffProfileSlice";
import Filters from "./Filters";

function FilterBar() {
  const inputText = useAdministrationSelector(selectSearchText);
  const dispatch = useAdministrationDispatch();
  const debouncedDispatchSetSearchText = useDebouncedCallback(
    (text) => dispatch(setSearchText(text)),
    250
  );

  return (
    <Stack
      sx={{
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
      }}
    >
      <TextField
        placeholder="Cari Karyawan"
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
        defaultValue={inputText}
        onChange={(e) => debouncedDispatchSetSearchText(e.target.value)}
        InputProps={{
          startAdornment: inputText && (
            <Cancel
              onClick={() => debouncedDispatchSetSearchText("")}
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
      <Hidden lgDown>
        <Filters />
      </Hidden>
    </Stack>
  );
}

export default memo(FilterBar);
