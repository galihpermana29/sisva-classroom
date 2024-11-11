"use client";

import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";

import PDFIcon from "@/assets/icon-PDF.svg";
import { formAddSyllabusFields } from "@/globalcomponents/FormFields";
import { useEffect, useState } from "react";

export const FormAddSyllabus = ({
  formik,
  editing,
  tableData,
  studyProgram,
  subjectOpt,
  handleFileChange = () => {},
}) => {
  const [currId, setCurrId] = useState();
  const [studyProgramData, setStudyProgramData] = useState();
  const [subjectData, setSubjectData] = useState();
  const [gradeData, setGradeData] = useState();

  const updatedSubjectFields = formAddSyllabusFields.map((field) => {
    if (field.name == "curriculum_name") {
      field.data = tableData.map((td) => {
        return { slug: td.id, title: td.name };
      });
    }

    return field;
  });

  const fetchStudyProgram = async (val) => {
    setCurrId(val);

    const firstMap = tableData.find((dt) => dt.id == val);

    const secMap = [...new Set(firstMap?.study_programs)].map((sm) => {
      studyProgram.forEach((dt) => {
        if (sm == dt.code) {
          sm = { slug: dt.id, title: dt.name, code: dt.code };
        }
      });
      return sm;
    });

    setStudyProgramData(secMap);
  };

  const fetchSubject = async (val, currId2) => {
    const firstMap = subjectOpt.filter(
      (dt) =>
        dt.study_program_id == val &&
        dt.curriculum_id == (currId ? currId : currId2)
    );

    const secMap = firstMap.map((fm) => {
      return (fm = { slug: fm.id, title: fm.subject });
    });

    const grades = studyProgram.find((sp) => sp.id == val).grades;

    setGradeData(grades);
    setSubjectData(secMap);
  };

  useEffect(() => {
    if (editing) {
      fetchStudyProgram(formik.values.curriculum_name);
      fetchSubject(formik.values.study_program, formik.values.curriculum_name);
    }
  }, []);

  return (
    <>
      {updatedSubjectFields?.map((field) =>
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
          field.name === "curriculum_name" ? (
            <Stack sx={{ my: 1 }} key={field.name}>
              <Typography variant="body2" fontWeight={600} mb={0.5}>
                {field.label}
              </Typography>
              <TextField
                select
                value={formik.values[field.name]}
                onChange={(e) => {
                  formik.setFieldValue(field.name, e.target.value);
                  fetchStudyProgram(e.target.value);
                }}
                sx={{ flex: { xs: 1, lg: 0 } }}
              >
                {field.data.map((option) => (
                  <MenuItem key={option.slug} value={option.slug}>
                    <Typography fontSize={14}>{option.title}</Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          ) : field.name === "study_program" ? (
            <Stack sx={{ my: 1 }} key={field.name}>
              <Typography variant="body2" fontWeight={600} mb={0.5}>
                {field.label}
              </Typography>
              <TextField
                select
                value={formik.values[field.name]}
                onChange={(e) => {
                  formik.setFieldValue(field.name, e.target.value);
                  fetchSubject(e.target.value);
                }}
                sx={{ flex: { xs: 1, lg: 0 } }}
              >
                {studyProgramData?.length
                  ? studyProgramData?.map((option) => (
                      <MenuItem key={option.slug} value={option.slug}>
                        <Typography fontSize={14}>{option.title}</Typography>
                      </MenuItem>
                    ))
                  : ["Program Studi Tidak Tersedia"].map((option, idx) => (
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
          ) : field.name === "subject" ? (
            <Stack sx={{ my: 1 }} key={field.name}>
              <Typography variant="body2" fontWeight={600} mb={0.5}>
                {field.label}
              </Typography>
              <TextField
                select
                value={formik.values[field.name]}
                onChange={(e) =>
                  formik.setFieldValue(field.name, e.target.value)
                }
                sx={{ flex: { xs: 1, lg: 0 } }}
              >
                {studyProgramData?.length
                  ? subjectData?.map((option) => (
                      <MenuItem key={option.slug} value={option.slug}>
                        <Typography fontSize={14}>{option.title}</Typography>
                      </MenuItem>
                    ))
                  : ["Mata Pelajaran Tidak Tersedia"].map((option, idx) => (
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
          ) : (
            <Stack sx={{ my: 1 }} key={field.name}>
              <Typography variant="body2" fontWeight={600} mb={0.5}>
                {field.label}
              </Typography>
              <TextField
                select
                value={formik.values[field.name]}
                onChange={(e) =>
                  formik.setFieldValue(field.name, e.target.value)
                }
                sx={{ flex: { xs: 1, lg: 0 } }}
              >
                {gradeData?.length
                  ? gradeData?.map((option) => (
                      <MenuItem key={option} value={option}>
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
          )
        ) : field.type === "file" ? (
          <Stack sx={{ overflowX: "hidden" }}>
            <Typography variant="body2" fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <Stack
              sx={{
                backgroundColor: "base.base20",
                p: 1.5,
                borderRadius: 2,
                mb: 0.5,
                flexDirection: "row",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Image src={PDFIcon} height={18} alt="" />
              <Typography sx={{ fontSize: 13, ml: 1 }}>
                {formik.values.syllabus_uri
                  ? formik.values.syllabus_uri
                  : "Masukan PDF Silabus"}
              </Typography>
            </Stack>

            <label htmlFor="syllabus_uri">
              <Button
                fullWidth
                variant="outlined"
                flexDirection={"row"}
                alignItems={"center"}
                sx={{ mb: 0.5 }}
              >
                {formik.values.syllabus_uri ? "Ubah" : "Upload"}
                <input
                  name={"syllabus_uri"}
                  accept="pdf"
                  id="syllabus_uri"
                  type="file"
                  style={{
                    position: "absolute",
                    opacity: "0",
                    border: "1px solid red",
                  }}
                  onChange={handleFileChange}
                />
              </Button>
            </label>
            <Button
              fullWidth
              variant="outlined"
              flexDirection={"row"}
              alignItems={"center"}
              sx={{
                mb: 1,
                display: formik.values.syllabus_uri ? "flex" : "none",
              }}
            >
              Hapus
            </Button>
          </Stack>
        ) : null
      )}
    </>
  );
};
