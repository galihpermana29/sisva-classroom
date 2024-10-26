import {
    ClearRounded,
    DragIndicatorRounded
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
// import { ItemTypes } from "./ItemTypes.js";
const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};
export const DragAndDropCard = ({ id, text, index, moveCard, DeleteGrade }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "box",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "box",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));
  return (
    <Button
      ref={ref}
      variant="contained"
      color="primary"
      sx={{
        mb: 1,
        p: "4px",
        borderRadius: 2,
        justifyContent: "flex-start",
        flexDirection: "row",
        opacity,
      }}
      data-handler-id={handlerId}
    >
      <DragIndicatorRounded sx={{ fontSize: 16, mr: 1 }} />
      <Typography
        sx={{ fontSize: 14, fontWeight: 500, flex: 1, textAlign: "left" }}
      >
        {text}
      </Typography>
      <Box
        sx={{
          mr: 0.5,
          backgroundColor: "base.base10",
          "&:hover": {
            backgroundColor: "base.base40",
          },
          borderRadius: 10,
          alignSelf: "center",
          display: "flex",
          //   height:15,
          p: 0.3,
        }}
        onClick={() => DeleteGrade(index)}
      >
        <ClearRounded sx={{ color: "primary.main", fontSize: 10 }} />
      </Box>
    </Button>
  );
};
