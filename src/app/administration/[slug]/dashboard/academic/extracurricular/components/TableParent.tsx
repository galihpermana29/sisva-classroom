import { ExcelIcon, SortIcon } from "@/assets/SVGs";
import {
  Add,
  Cancel,
  DownloadRounded,
  Search,
  UploadFileRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Hidden,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { memo } from "react";
import Filters from "./Filters";

function TableParent({
  activeTab,
  anchorEl,
  dataExtra,
  emptyData,
  formik,
  handleClick,
  handleClose,
  open,
  search,
  setActiveTab,
  setExtraFilter,
  setIsOpenCreateExtracurricularMember,
  setOpenCreateExtracurriculum,
  setOpenSortModal,
  setSearch,
  setSortBy,
  setSortSettings,
  tabs,
  extraFilter,
}) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      sx={{
        borderRadius: { xs: 0, lg: 2 },
        flex: 1,
        overflowY: "hidden",
        maxHeight: "100%",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          borderBottom: "1px solid rgb(0,0,0,0.12)",
          // height: 54,
          overflowX: "auto",
        }}
      >
        {tabs.map((item, index) => {
          return (
            <Button
              key={index}
              sx={{
                p: { xs: "16px 8px", lg: 2 },
                minWidth: 140,
                flex: { xs: 1, lg: 0 },
                borderBottom: "2px solid",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderColor:
                  activeTab === index ? "primary.main" : "transparent",
              }}
              onClick={() => {
                setActiveTab(index);
                setExtraFilter("");
                setSearch("");
                setSortBy("");
                setSortSettings("");
                formik.setValues(emptyData);
              }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                {item.title}
              </Typography>
            </Button>
          );
        })}
      </Stack>
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
        <Stack
          sx={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
          }}
        >
          <TextField
            // id="outlined-search"
            placeholder={`Cari ${tabs[activeTab].title}`}
            size="small"
            type="text"
            sx={{
              maxWidth: { xs: "100%", lg: "200px" },
              flex: 1,
              width: "100%",
              height: "100%",
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
            <Box
              sx={{
                display: {
                  lg: activeTab !== 0 ? "flex" : "none",
                  xs: "none",
                },
                borderRight: { xs: "none", lg: "1px solid rgb(0,0,0,0.12)" },

                my: 1,
                height: 36,
              }}
            />

            <Filters
              activeTab={activeTab}
              dataExtra={dataExtra}
              extraFilter={extraFilter}
              setExtraFilter={setExtraFilter}
            />
            <Box
              sx={{
                display: {
                  lg: activeTab !== 0 ? "flex" : "none",
                  xs: "none",
                },
                borderRight: { xs: "none", lg: "1px solid rgb(0,0,0,0.12)" },
                // ml: 1,
                my: 1,
                height: 36,
              }}
            />
          </Hidden>
        </Stack>

        <Stack
          sx={{
            flexDirection: "row",
            pl: { xs: 0, lg: 1 },
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ExcelIcon />}
            sx={{
              display: { xs: "none", lg: "flex" },
              width: "fit-content",
              height: "100%",
              mr: 1,
              borderColor: "green",
              backgroundColor: "white",
              "&:hover": {
                borderColor: "green",
                backgroundColor: "base:base20",
              },
            }}
            id="profile-button"
            aria-controls={open ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Typography sx={{ color: "green", fontSize: 14 }}>Excel</Typography>
          </Button>
          <Menu
            elevation={2}
            id="profile-menu"
            aria-labelledby="profile-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem onClick={handleClose} sx={{ padding: 1, width: 98 }}>
              <Stack flexDirection={"row"} alignItems={"center"}>
                <DownloadRounded sx={{ fontSize: 18, mr: 1 }} />
                <Typography sx={{ fontSize: 14 }}>Export</Typography>
              </Stack>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ padding: 1 }}>
              <label htmlFor="import-csv">
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <UploadFileRounded sx={{ fontSize: 18, mr: 1 }} />
                  <Typography sx={{ fontSize: 14 }}>Import</Typography>
                  <input
                    name={"import_csv"}
                    accept="csv"
                    id="import-csv"
                    type="file"
                    style={{
                      position: "absolute",
                      opacity: "0",
                      border: "1px solid red",
                    }}
                    // onChange={handleImageChange}
                  />
                </Stack>
              </label>
            </MenuItem>
          </Menu>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            sx={{
              width: 100,
              height: "100%",
            }}
            onClick={() =>
              activeTab === 0
                ? setOpenCreateExtracurriculum(true)
                : activeTab === 1
                  ? setIsOpenCreateExtracurricularMember(true)
                  : null
            }
          >
            <Typography sx={{ fontSize: 14 }}>Tambah</Typography>
          </Button>
        </Stack>
      </Stack>

      <Stack
        sx={{
          flexDirection: "row",
          px: 2,
          mb: 1,
          display: { xs: "flex", lg: "none" },
        }}
      >
        <Filters
          activeTab={activeTab}
          dataExtra={dataExtra}
          extraFilter={extraFilter}
          setExtraFilter={setExtraFilter}
        />
        <Stack sx={{ flexDirection: "row", py: 1 }}>
          <Divider orientation="vertical" sx={{ mx: 1, display: "flex" }} />
          <Button
            sx={{
              backgroundColor: "base.base30",
              color: "base.base50",
              fontSize: 18,
              height: 38,
              width: "fit-content",
              "&:hover": {
                backgroundColor: "base.base40",
              },
            }}
            onClick={() => {
              setOpenSortModal(true);
            }}
          >
            <SortIcon />
          </Button>
        </Stack>
      </Stack>
      <Divider />
      <Box sx={{ flex: 1, overflowY: "hidden" }}>
        {tabs[activeTab].component}
      </Box>
    </Stack>
  );
}

export default memo(TableParent);
