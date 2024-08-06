import { MenuItem, Select, Stack, Typography } from "@mui/material";

export const DaySelect = () => {
  return (
    <Stack spacing={1}>
      <Typography fontWeight={600} variant="body2">
        Hari
      </Typography>
      <Select displayEmpty>
        <MenuItem disabled value={undefined}>
          Pilih hari
        </MenuItem>
        {days.map(({ label, value }) => (
          <MenuItem key={`${label}${value}`} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

const days = [
  { label: "Senin", value: 0 },
  { label: "Selasa", value: 1 },
  { label: "Rabu", value: 2 },
  { label: "Kamis", value: 3 },
  { label: "Jum'at", value: 4 },
  { label: "Sabtu", value: 5 },
];
