"use client";

import { formAddStudyProgramFields } from "@/globalcomponents/FormFields";
import { useDebouncedCallback } from "@mantine/hooks";
import { Stack, TextField, Typography } from "@mui/material";

export const FormAddStudyProgram = ({ formik }) => {
  const setFieldValue = useDebouncedCallback((fieldName, value) => {
    formik.setFieldValue(fieldName, value);
  }, 50);

  return (
    <>
      {formAddStudyProgramFields.map((field) => (
        <Stack sx={{ my: 1 }} key={field.name}>
          <Typography variant="body2" fontWeight={600} mb={0.5}>
            {field.label}
          </Typography>
          <TextField
            name={field.name}
            placeholder={field.placeholder}
            fullWidth
            defaultValue={formik.values[field.name]}
            onChange={(e) => setFieldValue(field.name, e.target.value)}
          />
        </Stack>
      ))}
    </>
  );
};
