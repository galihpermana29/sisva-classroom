import { Box, Divider, Paper, Stack } from "@mui/material";
import DataTable from "../components/Table";

import { memo } from "react";
import ButtonBar from "./ButtonBar";
import FilterBar from "./FilterBar";
import MobileFilterAndSortBar from "./MobileFilterAndSortBar";

function TableParent({
  handleClick,
  anchorEl,
  open,
  handleClose,
  setOpenCreateModal,
  setOpenSortModal,
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
        <FilterBar />
        <ButtonBar
          anchorEl={anchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
          open={open}
          setOpenCreateModal={setOpenCreateModal}
        />
      </Stack>
      <MobileFilterAndSortBar setOpenSortModal={setOpenSortModal} />
      <Divider />
      <Box sx={{ flex: 1, overflowY: "hidden" }}>
        <DataTable deleteUser={deleteUser} />
      </Box>
    </Stack>
  );
}

export default memo(TableParent);
