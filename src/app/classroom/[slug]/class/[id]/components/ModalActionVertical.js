import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const ModalActionVertical = ({ onClose }) => {
    return (
        <Stack
            gap={1}
            mt={2}
            sx={{
                '& .MuiButton-root': {
                    borderRadius: "24px",
                    py: "12px"
                }
            }}
        >
            <Button size="small" variant="contained" type="submit">
                Add
            </Button>
            <Button
                size="small"
                variant="outlined"
                color="primary"
                sx={{ color: "primary.main" }}
                onClick={onClose}
            >
                Cancel
            </Button>
        </Stack>
    )
}

export default ModalActionVertical