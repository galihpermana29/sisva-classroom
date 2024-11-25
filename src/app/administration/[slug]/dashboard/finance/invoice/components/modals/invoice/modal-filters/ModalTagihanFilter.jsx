"use client";

import { MenuItem, Select, Stack, Typography } from "@mui/material";

import { useGetAllBills } from "../../../../hooks/useGetAllBills";

export const ModalTagihanFilter = ({ value, setValue }) => {
  const { data: bills } = useGetAllBills();

  const selectValue = value?.tagihan ?? "";
  const billsData = bills
    ? bills.map((bill) => ({ label: bill.name, value: bill.id }))
    : [];

  const handleChange = (e) =>
    setValue({ tagihan: e.target.value, tagihanPengguna: "" });

  return (
    <Stack width="100%" gap={1}>
      <Typography fontWeight={600} variant="body2">
        Pilih Tagihan
      </Typography>
      <Select
        value={selectValue}
        size="small"
        fullWidth
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem disabled value="">
          Tagihan
        </MenuItem>
        {billsData.map(({ label, value }) => (
          <MenuItem key={`${label}${value}`} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};
