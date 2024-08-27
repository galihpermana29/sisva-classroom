import { MenuItem, Select } from "@mui/material";

export const ModalSelect = ({ name, data, value, disabled, handleChange }) => {
  return (
    <Select
      sx={{ width: { xs: "100%", md: "auto" } }}
      disabled={disabled}
      size="small"
      displayEmpty
      value={value}
      onChange={handleChange}
    >
      <MenuItem
        disabled
        value=""
      >
        {name}
      </MenuItem>
      {data
        ? data.map(({ label, value }) => (
            <MenuItem
              key={`${label}${value}`}
              value={value}
            >
              {label}
            </MenuItem>
          ))
        : null}
    </Select>
  );
};
