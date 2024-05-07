import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useState } from 'react'

const buttons = [
    {
        id: 1,
        label: "Hadir",
    },
    {
        id: 2,
        label: "Sakit",
    },
    {
        id: 3,
        label: "Izin",
    },
    {
        id: 4,
        label: "Alpa",
    },
]

const ModalAbsen = (props) => {
    const [clicked, setClicked] = useState(null)

    const handleClick = (id) => {
        if (clicked === id) {
            setClicked(null)
        } else {
            setClicked(id)
        }
    }

    const active = (id) => clicked === id

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            gap={2.5}
            p={2}
        >
            <Stack
                direction="row"
                alignItems="center"
                gap={2}
            >
                <Avatar sx={{ width: 54, height: 54 }}>
                    S
                </Avatar>
                <ListItemText
                    primaryTypographyProps={{fontSize:14}}
                    secondaryTypographyProps={{fontSize:12}}
                    primary="Bimo Arsa"
                    secondary="XII IPA 1"
                />
            </Stack>
            <Grid container spacing={1} maxWidth={240}>
                {buttons.map((button) => (
                    <Grid item xs={6} key={button.id}>
                        <Button
                            startIcon={active(button.id) ? <CheckCircleRoundedIcon /> : null}
                            variant={active(button.id) ? "contained" : "outlined"}
                            color={active(button.id) ? "primary" : "base"}
                            onClick={() => handleClick(button.id)}
                            sx={{
                                borderRadius: "24px",
                                py: 3,
                                fontSize: "14px",
                            }}
                        >
                            {button.label}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    )
}

export default ModalAbsen