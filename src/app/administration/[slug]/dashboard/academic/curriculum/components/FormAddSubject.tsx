"use client";

import { useDebouncedCallback } from "@mantine/hooks";
import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useMemo } from "react";

// TODO: this from is very lag, please rework
export const FormAddSubject = ({ formik, tableData, studyProgram }) => {
  const setFieldValue = useDebouncedCallback((fieldName, value) => {
    formik.setFieldValue(fieldName, value);
  }, 250);

  const curriculumOptions = useMemo(() => {
    return tableData.map((td) => {
      return { slug: td.id, title: td.name };
    });
  }, [tableData]);

  const studyProgramData = studyProgram.map((dt) => {
    return { slug: dt.id, title: dt.name, code: dt.code };
  });

  return (
    <>
      <Stack sx={{ my: 1 }}>
        <Typography variant="body2" fontWeight={600} mb={0.5}>
          {"Nama Kurikulum"}
        </Typography>
        <TextField
          select
          value={formik.values["curriculum_name"]}
          onChange={(e) => {
            formik.setFieldValue("curriculum_name", e.target.value);
          }}
          sx={{ flex: { xs: 1, lg: 0 } }}
        >
          {curriculumOptions.map((option) => (
            <MenuItem key={option.slug} value={option.slug}>
              <Typography fontSize={14}>{option.title}</Typography>
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Stack sx={{ my: 1 }}>
        <Typography variant="body2" fontWeight={600} mb={0.5}>
          Program Studi
        </Typography>
        <TextField
          select
          value={formik.values["study_program"]}
          onChange={(e) =>
            formik.setFieldValue("study_program", e.target.value)
          }
          sx={{ flex: { xs: 1, lg: 0 } }}
        >
          {studyProgramData?.length
            ? studyProgramData?.map((option) => (
                <MenuItem key={option.slug} value={option.slug}>
                  <Typography fontSize={14}>{option.title}</Typography>
                </MenuItem>
              ))
            : ["Program Studi Tidak Tersedia"].map((option, idx) => (
                <MenuItem selected={idx == 0} disabled key={idx} value={option}>
                  <Typography fontSize={14}>{option}</Typography>
                </MenuItem>
              ))}
        </TextField>
      </Stack>
      <Stack sx={{ my: 1 }}>
        <Typography variant="body2" fontWeight={600} mb={0.5}>
          Mata Pelajaran
        </Typography>
        <TextField
          name="subject"
          placeholder="Mata Pelajaran"
          fullWidth
          defaultValue={formik.values["subject"]}
          onChange={(e) => setFieldValue("subject", e.target.value)}
        />
      </Stack>
      <Stack sx={{ my: 1 }}>
        <Typography variant="body2" fontWeight={600} mb={0.5}>
          Tipe
        </Typography>
        <TextField
          select
          value={formik.values["subject_type"]}
          onChange={(e) => formik.setFieldValue("subject_type", e.target.value)}
          sx={{ flex: { xs: 1, lg: 0 } }}
        >
          {[
            { slug: "mandatory", title: "Wajib" },
            { slug: "optional", title: "Pilihan" },
          ].map((option) => (
            <MenuItem key={option.slug} value={option.slug}>
              <Typography fontSize={14}>{option.title}</Typography>
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </>
  );
};
