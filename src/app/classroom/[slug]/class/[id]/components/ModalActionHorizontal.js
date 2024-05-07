import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const ModalActionHorizontal = () => {
    return (
        <Stack
            direction="row"
            gap={1}
            p={2}
            sx={{
                '& .MuiButton-root': {
                    borderRadius: 8,
                    py: 1,
                }
            }}
        >
            <Button
                size='small'
                variant="outlined"
                startIcon={<ArrowBackRoundedIcon />}
                sx={{
                    color: "primary.main",
                }}
            >
                Previous
            </Button>
            <Button
                size='small'
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
            >
                Next
            </Button>
        </Stack>
    )
}

export default ModalActionHorizontal