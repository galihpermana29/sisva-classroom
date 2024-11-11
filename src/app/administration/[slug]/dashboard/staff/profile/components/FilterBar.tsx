import { Cancel, Search } from "@mui/icons-material";
import { Hidden, InputAdornment, Stack, TextField } from "@mui/material";
import { memo } from "react";
import Filters from "./Filters";

function FilterBar({
  permissionFilter,
  search,
  setPermissionFilter,
  setSearch,
  setTypeFilter,
  typeFilter,
}) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
      }}
    >
      <TextField
        // id="outlined-search"
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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: search && (
            <Cancel
              onClick={() => {
                setSearch("");
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
      <Hidden lgDown>
        <Filters
          permissionFilter={permissionFilter}
          typeFilter={typeFilter}
          onChangeType={(e) => setTypeFilter(e.target.value)}
          onClickCancelType={() => {
            setTypeFilter("");
          }}
          onChangePermission={(e) => setPermissionFilter(e.target.value)}
          onClickCancelPermission={() => {
            setPermissionFilter("");
          }}
        />
      </Hidden>
    </Stack>
  );
}

export default memo(FilterBar);
