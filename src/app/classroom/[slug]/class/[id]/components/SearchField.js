import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"

const SearchField = ({ fullWidth }) => {
    return (
        <TextField
            variant="outlined"
            size='small'
            fullWidth={fullWidth}
            placeholder="Search"
            InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <SearchRoundedIcon />
                    </InputAdornment>
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: "100px",
                }
            }}
        />
    )
}

export default SearchField