"use client";

import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

import {
  Add,
  Cancel,
  DragIndicatorRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { permissions } from "@/globalcomponents/Variable";

import { DndProvider } from "react-dnd";
import { DragAndDropContainer } from "./DragAndDropContainer";
import { MultiBackend } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch"; // or any other pipeline

export const FormAddGrade = ({ formik, editing }) => {
  let data = [
    {
      id: 1,
      title: "Ilmu Pengetahuan Sosial",
      slug: "IPS",
      status: "active",
      grades: [],
    },
    {
      id: 2,
      title: "Ilmu Pengetahuan Alam",
      slug: "IPA",
      status: "active",
      grades: ["X", "XI", "XII"],
    },
    {
      id: 3,
      title: "Ilmu Pengetahuan Sosial Unggulan",
      slug: "IPS-U",
      status: "active",
      grades: ["X", "XI", "XII"],
    },
    {
      id: 4,
      title: "Ilmu Pengetahuan Alam Unggulan",
      slug: "IPA-U",
      status: "active",
      grades: ["X", "XI", "XII"],
    },
  ];

  let [gradeInput, setGradeInput] = useState("");

  const [cards, setCards] = useState([]);

  useEffect(() => {
    let temp = [];
    formik.values["code"] &&
      data
        .find((x) => x.slug === formik.values["code"])
        .grades.map((grade, index) => {
          let tempObject = {
            id: index,
            text: grade,
          };
          temp.push(tempObject);
        });

    setCards(formik.values["code"] ? temp : cards);
  }, [formik.values["code"]]);

  useEffect(() => {
    let temp = [];
    cards &&
      cards.map((item) => {
        temp.push(item.text);
      });
    formik.setFieldValue("grades", cards ? temp : formik.values["grades"]);
  }, [cards]);

  function DeleteGrade(index) {
    let tempArray = [];
    let temp = cards;
    temp.splice(index, 1);
    temp.map((item) => {
      tempArray.push(item);
    });
    setCards(tempArray);
  }

  return (
    <>
      <Stack sx={{ my: 1 }} key={"name"}>
        <Typography variant="body2" fontWeight={600} mb={0.5}>
          Program Studi
        </Typography>
        <TextField
          select
          value={formik.values["code"]}
          onChange={(e) => {
            formik.setFieldValue("code", e.target.value);
            formik.setFieldValue(
              "grades",
              e.target.value
                ? data.find((x) => x.slug === e.target.value).grades
                : []
            );
          }}
          sx={{ flex: { xs: 1, lg: 0 } }}
        >
          {data.map((option) => (
            <MenuItem key={option.slug} value={option.slug}>
              <Typography fontSize={14}>{option.title}</Typography>
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Stack sx={{ my: 1 }} key={"grades"}>
        <Typography variant="body2" fontWeight={600}>
          Tingkatan
        </Typography>
        <Stack flexDirection={"row"} sx={{ height: "100%" }} my="8px">
          <TextField
            name={"Masukkan Tingkatan"}
            placeholder={"Masukkan Tingkatan"}
            disabled={!formik.values["code"]}
            fullWidth
            value={gradeInput}
            onChange={(e) => setGradeInput(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!formik.values["code"]}
            sx={{
              // width: 100,
              ml: 1,
            }}
            onClick={() => {
              let temp = cards;
              gradeInput && temp.push({ text: gradeInput, id: cards.length });
              setCards(temp);
              setGradeInput("");
            }}
          >
            <Add />
            {/* <Typography sx={{ fontSize: 14 }}>Tambah</Typography> */}
          </Button>
        </Stack>{" "}
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
          {
            <DragAndDropContainer
              formik={formik}
              data={
                data.find((x) => x.slug === formik.values["code"])
                  ? data.find((x) => x.slug === formik.values["code"]).grades
                  : []
              }
              cards={cards}
              setCards={setCards}
              DeleteGrade={DeleteGrade}
            />
          }
        </DndProvider>
      </Stack>
    </>
  );
};
