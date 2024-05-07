import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Typography from "@mui/material/Typography";

const DraggableItem = ({ title }) => {
  return (
    <ListItem
      sx={{
        py: 0,
        "& .MuiListItemText-root": {
          m: 0,
        },
        "& .MuiListItemIcon-root": {
          minWidth: "auto",
        },
      }}
    >
      <ListItemIcon sx={{ mr: 1 }}>
        <DragIndicatorIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="h2" sx={{ fontSize: 18, fontWeight: 600 }}>
            {typeof title === "string" && title}
          </Typography>
        }
      />
      {typeof title != "string" && title}
      <ListItemIcon>
        <IconButton sx={{ p: "2px" }}>
          <EditRoundedIcon fontSize="small" color="base" />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

export default DraggableItem;
