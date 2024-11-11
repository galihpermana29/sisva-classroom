import { Box, Divider, Paper, Stack } from "@mui/material";
import DataTable from "../components/Table";

import { memo } from "react";
import ButtonBar from "./ButtonBar";
import FilterBar from "./FilterBar";
import MobileFilterAndSortBar from "./MobileFilterAndSortBar";

function TableParent({
  search,
  permissionFilter,
  typeFilter,
  setTypeFilter,
  setPermissionFilter,
  setSearch,
  handleClick,
  anchorEl,
  open,
  handleClose,
  getAllUsers,
  setOpenCreateModal,
  setOpenSortModal,
  filteredData,
  deleteUser,
}) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      sx={{
        borderRadius: { xs: 0, lg: 2 },
        overflowY: "auto",
        flex: 1,
        maxHeight: "100%",
        position: "relative",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          height: { xs: "fit-content", lg: 70 },
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          pt: 1,
          pb: { lg: 1, xs: 0 },
          mt: { xs: 1, lg: 0 },
        }}
      >
        <FilterBar
          permissionFilter={permissionFilter}
          search={search}
          setPermissionFilter={setPermissionFilter}
          setSearch={setSearch}
          setTypeFilter={setTypeFilter}
          typeFilter={typeFilter}
        />
        <ButtonBar
          anchorEl={anchorEl}
          getAllUsers={getAllUsers}
          handleClick={handleClick}
          handleClose={handleClose}
          open={open}
          setOpenCreateModal={setOpenCreateModal}
        />
      </Stack>
      <MobileFilterAndSortBar
        permissionFilter={permissionFilter}
        setOpenSortModal={setOpenSortModal}
        setPermissionFilter={setPermissionFilter}
        setTypeFilter={setTypeFilter}
        typeFilter={typeFilter}
      />
      <Divider />
      <Box sx={{ flex: 1, overflowY: "hidden" }}>
        <DataTable data={filteredData} deleteUser={deleteUser} />
      </Box>
    </Stack>
  );
}

export default memo(TableParent);
