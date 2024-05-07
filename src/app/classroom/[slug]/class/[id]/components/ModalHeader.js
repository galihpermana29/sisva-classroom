import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

const ModalHeader = ({ title, subtitle, onClose }) => {
    return (
        <Stack
            p={2}
            pb={0}
            gap={2}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <Stack
                    gap={1}
                >
                    <Typography fontSize={18} fontWeight={600}>
                        {title}
                    </Typography>
                    <Typography fontSize={12}>
                        {subtitle}
                    </Typography>
                </Stack>
                <IconButton
                    onClick={onClose}
                    sx={{ mb: "auto" }}
                >
                    <CloseRoundedIcon />
                </IconButton>
            </Stack>
            <Divider />
        </Stack>

    )
}

export default ModalHeader