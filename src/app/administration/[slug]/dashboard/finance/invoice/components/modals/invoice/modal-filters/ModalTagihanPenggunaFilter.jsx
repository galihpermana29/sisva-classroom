"use client";

import { useGetAllUsers } from "@/hooks/useGetAllUsers";
import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { useGetAllUserBill } from "../../../../hooks/useGetAllUserBill";

export const ModalTagihanPenggunaFilter = ({ value, setValue }) => {
  const { data: userBills } = useGetAllUserBill({ paginated: false });
  const { data: users } = useGetAllUsers();

  const bill_id = value?.tagihan;
  const availableUserBills = getAvailableUserBills(userBills, bill_id);

  const selectData = mapUserBills(availableUserBills, users);
  const selectValue = value?.tagihanPengguna ?? "";

  const handleChange = (e) =>
    setValue({ ...value, tagihanPengguna: e.target.value });

  return (
    <Stack
      width="100%"
      gap={1}
    >
      <Typography
        fontWeight={600}
        variant="body2"
      >
        Pilih Tagihan Pengguna
      </Typography>
      <Select
        value={selectValue}
        size="small"
        fullWidth
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem
          disabled
          value=""
        >
          Pengguna
        </MenuItem>
        {selectData.map(({ label, value }) => (
          <MenuItem
            key={`${label}${value}`}
            value={value}
          >
            {label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

const getAvailableUserBills = (userBills, billId) => {
  if (!userBills || !billId) return [];
  return userBills.filter((userBill) => userBill.bill_id === billId);
};

const findCorrespondingUser = (users, userId) => {
  return users?.find((user) => user.id === userId);
};

const mapUserBills = (availableUserBills, users) => {
  if (!availableUserBills || !users) return [];
  return availableUserBills.map((userBill) => {
    const user = findCorrespondingUser(users, userBill.user_id);
    return { label: user.name, value: userBill.id };
  });
};
