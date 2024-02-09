"use client";

import ListKelasCard from "./components/ListKelasCard";
// import HomeHeader from "@/components/layout/header/HomeHeader"
import Grid from "@mui/material/Grid";
import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Hidden,
  InputAdornment,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const filterFields = [
  {
    name: "matpel",
    type: "select",
    label: "Mata Pelajaran",
    sx: { minWidth: "176px" },
    items: [
      {
        value: 1,
        label: "Matematika",
      },
      {
        value: 2,
        label: "Fisika",
      },
    ],
  },
  {
    name: "guru",
    type: "select",
    label: "Guru",
    sx: { minWidth: "114px" },
    items: [
      {
        value: 1,
        label: "Alwi Sukra",
      },
      {
        value: 2,
        label: "Rafiul Mahdi",
      },
    ],
  },
];
const kelasData = [
  {
    id: 1,
    matpel: "Matematika",
    kelas: "XII IPA 1",
    guru: "Alwi Sukra S.Pd, M.T",
    jadwal: ["Senin, 12.00 - 13.00", "Selasa, 12.00 - 13.00"],
    tipe: "Wajib",
  },
  {
    id: 2,
    matpel: "Fisika",
    kelas: "XII IPA 1",
    guru: "Alwi Sukra S.Pd, M.T",
    jadwal: ["Senin, 12.00 - 13.00", "Selasa, 12.00 - 13.00"],
    tipe: "Wajib",
  },
];

const Kelas = () => {
  let [search, setSearch] = useState("");
  let [classFilter, setClassFilter] = useState("");

  function Filters() {
    return (
      <Stack
        sx={{
          flexDirection: "row",
          overflowX: "auto",
          py: 1,
        }}
      >
        <TextField
          select
          size="small"
          label="Mata Pelajaran"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          sx={{
            flex: { xs: 1, lg: 0 },
            minWidth: "fit-content",
            backgroundColor:"white"
          }}
          InputProps={{
            sx: { minWidth: 140, width: { xs: "100%", lg: "fit-content" } },
            startAdornment: classFilter && (
              <Cancel
                onClick={() => {
                  setClassFilter("");
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
            "Matematika",
            "Fisika",
            "Biologi",
          ].map((option, index) => (
            <MenuItem key={index} value={option}>
              <Typography fontSize={14}>{option}</Typography>
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Kelas"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          sx={{
            flex: { xs: 1, lg: 0 },
            minWidth: "fit-content",
            backgroundColor:"white",
            ml:1
          }}
          InputProps={{
            sx: { minWidth: 140, width: { xs: "100%", lg: "fit-content" } },
            startAdornment: classFilter && (
              <Cancel
                onClick={() => {
                  setClassFilter("");
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
            "X MIPA 1",
            "X MIPA 2",
            "X MIPA 3",
          ].map((option, index) => (
            <MenuItem key={index} value={option}>
              <Typography fontSize={14}>{option}</Typography>
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    );
  }
  return (
    <Stack sx={{width:"100%", maxWidth:900, p:3}}>
      
      <Stack
        sx={{
          flexDirection: "row",
          mt: {xs:0,lg:1},
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>Daftar Kelas</Typography>
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent:"space-between",
          alignItems: "center",
          width:"100%",
          mb:1
        }}
      >
        <TextField
          // id="outlined-search"
          placeholder="Cari Kelas"
          size="small"
          type="text"
          sx={{
            maxWidth: "250px",
            flex: 1,
            width: "100%",
            // height: "100%",
            backgroundColor:"white",
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
        <Filters />
      </Stack>
      <Stack  pt={{ xs: 24, sm: 0 }} pb={{ xs: 12, sm: 0 }}>
        <Grid container spacing={1.5}>
          {kelasData.map((item) => (
            <Grid key={item.matpel} item xs={12} sm={6}>
              <ListKelasCard data={item} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Kelas;
