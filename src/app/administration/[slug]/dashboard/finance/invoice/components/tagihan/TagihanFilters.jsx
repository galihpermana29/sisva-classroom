"use client";

import { SortIcon } from "@/assets/SVGs";
import { Close } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useGetTagihan } from "../../hooks/useGetTagihan";
import {
  DateRangeSelect,
  TANGGAL_FIELD_NAME,
} from "../filters/DateRangeSelect";
import FilterReset from "../filters/FilterReset";
import { KATEGORI_FIELD_NAME, KategoriSelect } from "../filters/KategoriSelect";
import { STATUS_FIELD_NAME, StatusSelect } from "../filters/StatusSelect";
import ResetIcon from "../icons/ResetIcon";

const statusFilters = [
  {
    label: "Draft",
    value: "draft",
  },
  {
    label: "Published",
    value: "published",
  },
];

/** @description Component for handling tagihan tab's filters */
export const TagihanFilters = () => {
  const theme = useTheme();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen) => () => setOpenDrawer(newOpen);

  const handleResetFilters = () => {
    router.push(`${pathName}?tab=${tab}`);
  };

  const tanggal = searchParams.get(TANGGAL_FIELD_NAME);
  const kategori = searchParams.get(KATEGORI_FIELD_NAME);
  const status = searchParams.get(STATUS_FIELD_NAME);
  const tab = searchParams.get("tab") ?? 0;

  const showMobileReset =
    Boolean(tanggal) || Boolean(kategori) || Boolean(status);

  const { data: allBillsData } = useGetTagihan();

  const uniqueNames = [
    ...new Set(allBillsData.flatMap((group) => group.map((item) => item.name))),
  ];

  const nameFilters = uniqueNames.map((name) => ({
    value: name,
    label: name,
  }));

  return (
    <>
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <IconButton
          sx={{
            borderRadius: 2,
            display: { xs: "block", lg: "none" },
          }}
          onClick={toggleDrawer(true)}
        >
          <SortIcon sx={{ color: theme.palette.primary.main }} />
        </IconButton>
        <Drawer
          anchor="bottom"
          sx={{ borderRadius: "20px 20px 0 0 !important" }}
          open={openDrawer}
          onClose={toggleDrawer(false)}
        >
          <DrawerContent toggleDrawer={toggleDrawer} />
        </Drawer>
        <Divider
          orientation="vertical"
          sx={{ height: 36.5, display: { xs: "block", lg: "none" } }}
        />
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
          overflow={"auto"}
          sx={{ display: { xs: "flex", lg: "none" } }}
        >
          <div className="shrink-0 flex gap-2">
            <DateRangeSelect />
          </div>
          <KategoriSelect data={nameFilters} />
          <StatusSelect data={statusFilters} />
        </Stack>

        <Stack
          display={{ xs: "none", lg: "flex" }}
          flexDirection="row"
          alignItems="center"
          gap={1}
        >
          <DateRangeSelect />
          <KategoriSelect data={nameFilters} />
          <StatusSelect data={statusFilters} />
          <FilterReset />
        </Stack>
      </Stack>
      {showMobileReset && (
        <Button
          startIcon={<ResetIcon color={theme.palette.primary.main} />}
          onClick={handleResetFilters}
        >
          Reset
        </Button>
      )}
    </>
  );
};

const filters = [
  {
    label: "ID Tagihan",
    value: "id",
  },
  {
    label: "Nama Tagihan",
    value: "name",
  },
  {
    label: "Total harga",
    value: "amount",
  },
  {
    label: "Jumlah Pembayaran",
    value: "total_paid",
  },
  {
    label: "Tenggat Waktu",
    value: "deadline",
  },
  {
    label: "Status",
    value: "status",
  },
];

const DrawerContent = ({ toggleDrawer }) => {
  return (
    <Stack padding={"16px"}>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontWeight={600} fontSize={"18px"}>
          Urutkan
        </Typography>
        <IconButton
          sx={{ borderRadius: 2, display: { xs: "block", lg: "none" } }}
          onClick={toggleDrawer(false)}
        >
          <Close color="action" />
        </IconButton>
      </Stack>
      <Divider sx={{ marginY: "16px" }} />
      <form>
        <Stack gap={"16px"}>
          {filters.map(({ label, value }) => (
            <Stack gap={"16px"}>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography>{label}</Typography>
                <Checkbox />
              </Stack>
              <Divider />
            </Stack>
          ))}
        </Stack>
      </form>
      <Stack flexDirection={"row"} gap={"12px"} marginTop={"32px"}>
        <Button onClick={toggleDrawer(false)} variant="outlined" fullWidth>
          Batal
        </Button>
        <Button variant="contained" fullWidth>
          Simpan
        </Button>
      </Stack>
    </Stack>
  );
};
