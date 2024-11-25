import { MenuItem, Select } from "@mui/material";

import { useGetAllBills } from "../../../../hooks/useGetAllBills";

export const ModalTagihanSelect = ({ value, setValue, setAvailableTarget }) => {
  const { data: bills } = useGetAllBills();
  const data = bills
    ? bills.map((bill) => ({ value: bill.id, label: bill.name }))
    : [];

  const handleChange = (event) => {
    const bill = bills?.find((bill) => bill.id === event.target.value);
    setValue(event.target.value);
    const availableTarget =
      bill?.target_user_types.map((userType) => ({
        value: userType,
        label: userTypeMap[userType],
      })) ?? [];
    setAvailableTarget(availableTarget);
  };

  return (
    <Select
      value={value}
      size="small"
      fullWidth
      displayEmpty
      onChange={handleChange}
    >
      <MenuItem disabled value="">
        Tagihan
      </MenuItem>
      {data
        ? data.map(({ label, value }) => (
            <MenuItem key={`${label}-${value}`} value={value}>
              {label}
            </MenuItem>
          ))
        : null}
    </Select>
  );
};

const userTypeMap = {
  staff: "Staff",
  student: "Siswa",
  teacher: "Guru",
};
