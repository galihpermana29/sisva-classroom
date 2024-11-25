"use client";

import { Close } from "@mui/icons-material";
import SyncIcon from "@mui/icons-material/Sync";
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
import { useFormik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { SortIcon } from "@/assets/SVGs";
import { useQueryParam } from "@/hooks/useQueryParam";

import { tagihanSorts } from "../../constants";
import { useGetTagihan } from "../../hooks/useGetTagihan";
import {
  DateRangeSelect,
  TANGGAL_FIELD_NAME,
} from "../filters/DateRangeSelect";
import FilterReset from "../filters/FilterReset";
import { KATEGORI_FIELD_NAME, KategoriSelect } from "../filters/KategoriSelect";
import { STATUS_FIELD_NAME, StatusSelect } from "../filters/StatusSelect";

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
  const [showDrawer, setShowDrawer] = useState(false);

  const openDrawer = () => setShowDrawer(true);
  const closeDrawer = () => setShowDrawer(false);

  const handleResetFilters = () => {
    router.push(`${pathName}?tab=${tab}`);
  };

  const tanggal = searchParams.get(TANGGAL_FIELD_NAME);
  const kategori = searchParams.get(KATEGORI_FIELD_NAME);
  const status = searchParams.get(STATUS_FIELD_NAME);
  const sort = searchParams.get("sort");
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
          onClick={openDrawer}
        >
          <SortIcon sx={{ color: theme.palette.primary.main }} />
        </IconButton>
        <Drawer
          anchor="bottom"
          sx={{ borderRadius: "20px 20px 0 0 !important" }}
          open={showDrawer}
          onClose={closeDrawer}
          PaperProps={{
            sx: {
              borderRadius: "12px 12px 0 0",
            },
          }}
        >
          <DrawerContent closeDrawer={closeDrawer} sortQuery={sort} />
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
          sx={{ display: { xs: "flex", lg: "none", fontWeight: 600 } }}
          startIcon={<SyncIcon />}
          onClick={handleResetFilters}
        >
          Reset
        </Button>
      )}
    </>
  );
};

const DrawerContent = ({ closeDrawer, sortQuery }) => {
  const { updateQueryParam } = useQueryParam();

  const sortedArr = sortQuery?.split(",") ?? [];

  const initialValues = {
    id: false,
    name: false,
    amount: false,
    total_paid: false,
    deadline: false,
    status: false,
  };

  sortedArr.forEach((key) => {
    if (initialValues.hasOwnProperty(key)) {
      initialValues[key] = true;
    }
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const sortedColumns = [];

      for (const key in values) {
        if (values[key]) {
          sortedColumns.push(key);
        }
      }
      updateQueryParam("sort", sortedColumns.join(","));
      closeDrawer();
    },
  });

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
          onClick={closeDrawer}
        >
          <Close color="action" />
        </IconButton>
      </Stack>
      <Divider sx={{ marginY: "16px" }} />
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={"16px"}>
          {tagihanSorts.map(({ label, value }, i) => (
            <Stack gap={"16px"} key={i}>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography>{label}</Typography>
                <Checkbox
                  checked={
                    Boolean(formik?.values[value])
                      ? formik?.values[value]
                      : false
                  }
                  onChange={(e) => {
                    formik.setFieldValue(value, e.target.checked);
                  }}
                />
              </Stack>
              <Divider />
            </Stack>
          ))}
        </Stack>
        <Stack flexDirection={"row"} gap={"12px"} marginTop={"32px"}>
          <Button onClick={closeDrawer} variant="outlined" fullWidth>
            Batal
          </Button>
          <Button type="submit" variant="contained" fullWidth>
            Simpan
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
