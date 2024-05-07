import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'

const TableCellsTemplate = ({ data, head }) => {
    const exception = ["avatar", "icon"]

    const cellSwitch = (key, value, data) => {
        switch (true) {
            case data.avatar && key === "nama": {
                return (
                    <Stack
                        alignItems="center"
                        direction="row"
                        gap={2}
                    >
                        <Avatar />
                        <Typography>
                            {value}
                        </Typography>
                    </Stack>
                )
            }
            case key === "status" && value != "Hadir": {
                return (
                    <Chip label={value} color="primary" sx={{ color: "#FFFFFF" }} />
                )
            }
            case key === "textIcon": {
                return (
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={2}
                    >
                        {data.icon}
                        <Typography fontWeight={400}>
                            {value}
                        </Typography>
                    </Stack>
                )
            }
            default: {
                return (
                    <Typography fontWeight={head ? 600 : 400}>
                        {value}
                    </Typography>
                )
            }
        }
    }

    return Object.entries(data).map(([key, value]) => {
        if (!exception.includes(key))
            return (
                <TableCell key={key}
                    align={key === "status" || value === "Status" ? "center" : "left"}
                    sx={{
                        '& .MuiTypography-root': {
                            fontSize: '14px'
                        }
                    }}
                >
                    {cellSwitch(key, value, data)}
                </TableCell>
            )
    })
}

export default TableCellsTemplate