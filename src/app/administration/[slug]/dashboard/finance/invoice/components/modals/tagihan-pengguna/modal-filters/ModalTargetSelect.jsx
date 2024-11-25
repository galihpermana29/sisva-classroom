import { MenuItem, Select } from "@mui/material";

export const ModalTargetSelect = ({ data, value, setValue, disabled }) => {
  const handleChange = (event) => setValue(event.target.value);
  const mappedValues = data?.map((target) => target.value) ?? [];
  if (!mappedValues.includes(value)) {
    setValue("");
  }

  return (
    <Select
      value={value}
      disabled={disabled}
      size="small"
      fullWidth
      displayEmpty
      onChange={handleChange}
    >
      <MenuItem disabled value="">
        Target
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
