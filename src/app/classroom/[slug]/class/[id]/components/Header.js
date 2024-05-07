import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/navigation';

const Header = ({ title, subtitle }) => {
    const router = useRouter()
    return (
        <Stack
            justifyContent="center"
            sx={{
                bgcolor: "primary.main",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 64,
                width: '100%',
                position: { xs: 'fixed', sm: 'relative' },
                borderRadius: { xs: '0', sm: '12px' },
                top: 0,
                p: "8px 16px",
                zIndex: 10,
                mb: { xs: 0, sm: 2 },
            }}
        >
            <Stack
                direction="row"
                gap="12px"
            >
                <IconButton
                    onClick={() => router.back()}
                >
                    <ArrowBackRoundedIcon sx={{ color: "#FFFFFF", fontSize: "24px" }} />
                </IconButton>
                <ListItemText
                    primary={title}
                    secondary={subtitle}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        '& .MuiTypography-root': {
                            color: "#FFFFFF",
                            textAlign: "left",
                        },
                        '& .MuiListItemText-primary': {
                            fontWeight: 600,
                        }
                    }}
                />
            </Stack>
        </Stack>
    )
}

export default Header