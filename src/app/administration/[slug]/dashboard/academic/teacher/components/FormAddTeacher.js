"use client";

import {
  Checkbox,
  Chip,
  FormControlLabel,
  MenuItem,
  MenuList,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { formAddSubjectTeacher } from "@/globalcomponents/FormFields";

export const FormAddTeacher = ({
  formik,
  editing,
  subjectList,
  teacherList,
  subjectData,
}) => {
  const [gradeData, setGradeData] = useState();
  const [searchTerms, setSearchTerms] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState("");
  const [clicked, setClicked] = useState(false);

  const updatedFields = formAddSubjectTeacher.map((field) => {
    if (field.name == "subject") {
      field.data = subjectList;
    }

    return field;
  });

  const fetchGrade = async (val) => {
    const grades = subjectList.find((sp) => sp.id == val).grades;

    setGradeData(grades);
  };

  const filteredTeacher = teacherList.filter((tl) =>
    tl.name.toLowerCase().includes(searchTerms.toLowerCase())
  );

  const selectDefault = (grade, id) => {
    const selected = subjectData.find((sd) => sd.grade == grade && sd.id == id);

    if (selected) {
      selected.teachers.forEach((tc) => {
        handleSelected(tc.teacher_id);
      });
    }
  };

  const handleSelected = (opt) => {
    if (selectedTeachers.includes(opt)) {
      setSelectedTeachers(selectedTeachers.filter((o) => o !== opt));
    } else {
      setSelectedTeachers([...selectedTeachers, opt]);
    }
  };

  const previewTeacher = teacherList.filter((tl) =>
    selectedTeachers.includes(tl.id)
  );

  useEffect(() => {
    formik.setFieldValue("teachers", selectedTeachers);
  }, [selectedTeachers]);

  useEffect(() => {
    if (editing) {
      fetchGrade(formik.values.subject);

      let teachers = formik.values.childs.map((td) => {
        return td.teacher_id;
      });

      setSelectedTeachers(teachers);
    }
  }, []);

  return (
    <>
      {updatedFields.map((field) =>
        field.type === "text" ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant="body2" fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <TextField
              name={field.name}
              placeholder={field.placeholder}
              fullWidth
              value={formik.values[field.name]}
              onChange={(e) => formik.setFieldValue(field.name, e.target.value)}
            />
          </Stack>
        ) : field.type === "select" ? (
          field.name === "subject" ? (
            <Stack
              sx={{ my: 1 }}
              key={field.name}
              onFocus={() => {
                setClicked(false);
              }}
            >
              <Typography variant="body2" fontWeight={600} mb={0.5}>
                {field.label}
              </Typography>
              <TextField
                select
                value={formik.values[field.name]}
                disabled={editing ? true : false}
                onChange={(e) => {
                  formik.setFieldValue(field.name, e.target.value);
                  formik.setFieldValue("grade", "");
                  setSelectedTeachers([]);
                  fetchGrade(e.target.value);
                }}
                sx={{ flex: { xs: 1, lg: 0 } }}
                onClick={() => {
                  setClicked(false);
                }}
              >
                {field.data.map((option, idx) => (
                  <MenuItem key={idx} value={option.id}>
                    <Typography fontSize={14}>{option.name}</Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          ) : field.name === "grade" ? (
            <Stack
              sx={{ my: 1 }}
              key={field.name}
              onFocus={() => {
                setClicked(false);
              }}
            >
              <Typography variant="body2" fontWeight={600} mb={0.5}>
                {field.label}
              </Typography>
              <TextField
                select
                disabled={editing ? true : false}
                value={formik.values[field.name]}
                onChange={(e) => {
                  formik.setFieldValue(field.name, e.target.value);
                  selectDefault(e.target.value, formik.values.subject);
                }}
                sx={{ flex: { xs: 1, lg: 0 } }}
              >
                {gradeData?.length
                  ? gradeData?.map((option, idx) => (
                      <MenuItem key={idx} value={option}>
                        <Typography fontSize={14}>{option}</Typography>
                      </MenuItem>
                    ))
                  : ["Tingkatan Tidak Tersedia"].map((option, idx) => (
                      <MenuItem
                        selected={idx == 0}
                        disabled
                        key={idx}
                        value={option}
                      >
                        <Typography fontSize={14}>{option}</Typography>
                      </MenuItem>
                    ))}
              </TextField>
            </Stack>
          ) : null
        ) : (
          <Stack
            sx={{ my: 1 }}
            key={field.name}
            onFocus={() => {
              setClicked(true);
            }}
          >
            <Typography variant="body2" fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <Stack
              sx={{ my: 1, flexDirection: "row", gap: 1, overflowY: "auto" }}
            >
              {previewTeacher.map((option, i) => (
                <Chip
                  label={option.name}
                  variant="outlined"
                  color="primary"
                  key={i}
                />
              ))}
            </Stack>
            <TextField
              type="text"
              placeholder={field.placeholder}
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
              sx={{ flex: { xs: 1, lg: 0 } }}
            ></TextField>
            {clicked && (
              <MenuList
                sx={{
                  gap: 1,
                  my: 1,
                  height: "10vh",
                  overflowY: "auto",
                }}
              >
                {filteredTeacher.map((option, idx) => (
                  <MenuItem
                    key={idx}
                    selected={
                      selectedTeachers.includes(option.id) ? true : false
                    }
                    value={option.id}
                    sx={{
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControlLabel
                      value={option.id}
                      control={<Checkbox />}
                      label={option.name}
                      sx={{ width: 1 }}
                      checked={selectedTeachers.includes(option.id)}
                      onChange={() => {
                        handleSelected(option.id);
                      }}
                    />
                  </MenuItem>
                ))}
              </MenuList>
            )}
          </Stack>
        )
      )}
    </>
  );
};
