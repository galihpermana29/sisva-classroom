"use client";

import { SortIcon } from "@/assets/SVGs";
import { useQueryParam } from "@/hooks/useQueryParam";
import { Close, KeyboardArrowDown } from "@mui/icons-material";
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
import { useState } from "react";
import { useSortKey } from "../../hooks/useSortKey";
import { invoiceSorts } from "../../constants";

export const InvoiceSort = () => {
  const theme = useTheme();
  const [showDrawer, setShowDrawer] = useState(false);

  const openDrawer = () => setShowDrawer(true);
  const closeDrawer = () => setShowDrawer(false);

  return (
    <>
      <IconButton
        onClick={openDrawer}
        sx={{
          borderRadius: 2,
          display: { sm: "flex", md: "none" },
        }}
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
        <DrawerContent closeDrawer={closeDrawer} />
      </Drawer>
      <Button
        fullWidth
        variant="outlined"
        className="justify-between"
        startIcon={<SortIcon sx={{ color: theme.palette.primary.main }} />}
        endIcon={
          <KeyboardArrowDown sx={{ display: { xs: "none", md: "block" } }} />
        }
        onClick={openDrawer}
        sx={{
          display: { sm: "none", md: "flex", lg: "none" },
          maxWidth: { sm: "fit-content", md: "100%" },
        }}
      >
        <Typography
          marginRight="auto"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Urutkan
        </Typography>
      </Button>
    </>
  );
};

const DrawerContent = ({ closeDrawer }) => {
  const sortedArr = useSortKey();
  const { updateQueryParam } = useQueryParam();

  /** sort keys: ['id', 'name', 'category', 'totalPrice', 'amount', 'status'] */
  const initialValues = {
    id: false,
    name: false,
    category: false,
    totalPrice: false,
    amount: false,
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
        <Typography
          fontWeight={600}
          fontSize={"18px"}
        >
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
          {invoiceSorts.map(({ label, value }) => (
            <Stack gap={"16px"}>
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
        <Stack
          flexDirection={"row"}
          gap={"12px"}
          marginTop={"32px"}
        >
          <Button
            onClick={closeDrawer}
            variant="outlined"
            fullWidth
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="contained"
            fullWidth
          >
            Simpan
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
