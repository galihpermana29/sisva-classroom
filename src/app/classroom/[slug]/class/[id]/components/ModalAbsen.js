import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useState } from "react";
import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";

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
];

const ModalAbsen = (props) => {
  const [clicked, setClicked] = useState(null);

  const handleClick = (id) => {
    if (clicked === id) {
      setClicked(null);
    } else {
      setClicked(id);
    }
  };

  const active = (id) => clicked === id;

  const [index, setIndex] = useState(0);

  const names = [
    "Bimo Arsa",
    "Alwi Sukra",
    "Johathan Christie",
    "Elaina Aurylia",
  ];

  return (
    <Stack justifyContent="center" alignItems="center" gap={2.5} p={2}>
      <Stack direction="row" alignItems="center" gap={2} width={"100%"}>
        <Avatar sx={{ width: 54, height: 54 }}>S</Avatar>
        <ListItemText
          primaryTypographyProps={{ fontSize: 14 }}
          secondaryTypographyProps={{ fontSize: 12 }}
          primary={names[index]}
          secondary="XII IPA 1"
        />
      </Stack>
      <Grid container spacing={1} width={"100%"}>
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
                width: "100%",
              }}
            >
              {button.label}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Stack
        direction="row"
        gap={1}
        p={2}
        sx={{
          "& .MuiButton-root": {
            borderRadius: 8,
            py: 1,
          },
          width: "100%",
        }}
      >
        <Button
          onClick={() => {
            setIndex(index - 1);
            setClicked(null);
          }}
          size="small"
          variant="outlined"
          startIcon={<ArrowBackRounded />}
          sx={{
            color: "primary.main",
            width: "100%",
          }}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            setIndex(index + 1);
            setClicked(null);
          }}
          size="small"
          variant="contained"
          sx={{ width: "100%" }}
          endIcon={<ArrowForwardRounded />}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModalAbsen;
