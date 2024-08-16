import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

/** @description Component for handling tagihan pengguna search's functionalities */
export const TagihanPenggunaSearch = ({ props }) => {
  return (
    <TextField
      fullWidth
      size="small"
      className="max-w-none md:max-w-80"
      placeholder="Cari..."
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
