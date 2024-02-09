import React, { useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function AgendaDay(props) {
  function createGrids() {
    let items = [];
    let start=7
    let end=15
    for (let i = start; i <= end-1; i++) {
      items.push(
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "35px 1fr",
          }}
        >
          <Box
            sx={{
              borderRight: "1px solid rgb(0,0,0,0.12)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              align="center"
              sx={{
                textTransform: "uppercase",
                fontSize: 10,
                mt: "2px",
                fontWeight: 400,
                color: "rgb(0,0,0,0.5)",
                transform: "translateY(-40px)",
              }}
            >
              {i < 10 ? "0" + i : i}:00
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#F4F4F4",
              border: "1px solid rgb(0,0,0,0.12)",
              height: 80,
            }}
          ></Box>
        </Box>
      );
    }
    items.push(
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "35px 1fr",
        }}
      >
        <Typography
          align="center"
          sx={{
            textTransform: "uppercase",
            fontSize: 10,
            fontWeight: 400,
            color: "rgb(0,0,0,0.5)",
            transform: "translateY(-10px)",
          }}
        >
          {end}:00
        </Typography>
      </Box>
    );
    return items;
  }

  let dayData = {
    tuesday: [
      {
        title: "Matematika",
        description: "Bimo Arief Wicaksana S.Pd.",
        scope: "group",
        isPublic: true,
        start: 0,
        duration: 45 / 60,
      },
    ],
  };

  function generateButton(dayData) {
    return dayData.map((data) => (
      <Button
        key={data.title}
        color={"primary"}
        variant={data.isPublic ? "contained" : "outlined"}
        sx={{
          backgroundColor: !data.isPublic ? "rgb(	114, 66, 144,0.15)" : null,
          "&:hover": {
            backgroundColor: !data.isPublic ? "rgb(	114, 66, 144,0.25)" : null,
          },
          textTransform: "none",
          margin: "0 1%",
          width: "98%",
          top: data.start * 80,
          height: data.duration * 80,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          padding: "5px",
          position: "absolute",
          color: "white",
        }}
        onClick={() => props.setOpen(true)}
      >
        <Typography
          sx={{
            // whiteSpace: "nowrap",
            textAlign: "left",
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box",
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {data.title}
        </Typography>
        <Typography
          sx={{
            // whiteSpace: "nowrap",
            textAlign: "left",
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 1 /* number of lines to show */,
            lineClamp: 1,
            WebkitBoxOrient: "vertical",
            fontSize: 11,
            fontWeight: 400,
          }}
        >
          {data.description}
          {data.time}
        </Typography>
      </Button>
    ));
  }
  function generateClock(day) {
    if (currentHour < 17) {
      return (
        <Box
          sx={{
            position: "absolute",
            top: currentHour * 80 + (currentMinute / 60) * 40,
            width: "100%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: "red",
              transform: "translateY(-5px) translateX(-5px)",
            }}
          ></Box>
          <Box sx={{ borderBottom: "2px solid red" }}></Box>
        </Box>
      );
    }
  }
  let currentHour = new Date().getHours();
  let currentMinute = new Date().getMinutes();
  // useEffect(() => {
  //   var el = document.getElementById("grid");
  //   el.scrollTop = currentHour * 80;
  //   // window.pageYOffset =currentHour * 40;
  // });
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <Box sx={{ position: "relative", mb: 1, mt: 2 }}>
        <Box
          id="grid"
          sx={{
            position: "absolute",
            display: "grid",
            gridTemplateColumns: "35px 1fr",
            width: "100%",
            height: "100%",
          }}
        >
          <Box />
          <Box sx={{ lineHeight: 0, position: "relative" }}>
            {generateButton(dayData.tuesday)}
            {generateClock()}
          </Box>
        </Box>
        {createGrids()}
      </Box>
    </Box>
  );
}

export default AgendaDay;
