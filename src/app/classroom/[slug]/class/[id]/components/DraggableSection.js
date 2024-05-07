import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import IconButton from "@mui/material/IconButton"
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from "@mui/material/Box"
import { useRouter } from "next/navigation"

const DraggableSection = ({ title, button, add, onClick }) => {
    const router = useRouter()
    
    return (
        <ListItem
            sx={{
                bgcolor: "primary.light",
                borderRadius: "6px",
                gap: 1,
                mb: add && (4),
                '& .MuiListItemText-root': {
                    m: 0,
                },
                '& .MuiListItemIcon-root': {
                    minWidth: "auto",
                }
            }}
        >
            <Box
                sx={{
                    bgcolor: "primary.main",
                    width: "2px",
                    height: "24px",
                    borderRadius: "2px",
                    position: "absolute",
                    left: "0",
                }}
            />
            <ListItemIcon>
                {add ?
                    <IconButton
                        size="small"
                        onClick={onClick}
                    >
                        <AddRoundedIcon />
                    </IconButton>
                    : <DragIndicatorIcon />}
            </ListItemIcon>
            <ListItemText
                primary={add ? "Add Topics" : title}
            />
            <ListItemIcon>
                {button &&
                    (<IconButton sx={{ p: "2px" }}
                        onClick={() => router.push(`/kelas/edit/1`)}
                    >
                        <EditRoundedIcon />
                    </IconButton>)}
            </ListItemIcon>
        </ListItem>

    )
}

export default DraggableSection