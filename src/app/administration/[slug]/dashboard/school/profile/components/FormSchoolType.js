import { Grid, MenuItem, TextField, Typography } from "@mui/material";

import { formSchoolTypeFields } from "@/globalcomponents/FormFields";

export const FormSchoolType = ({ formik, editing }) => {
  if (!editing) {
    return (
      <>
        {formSchoolTypeFields.map((field) => {
          return (
            <Grid
              sx={{ marginBottom: "8px" }}
              item
              xs={12}
              md={field.md}
              key={field.name}
            >
              <Grid item xs={12} md={12}>
                <Typography variant="body2" fontWeight={500} fontSize={14}>
                  {field.label}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                {field.data.map((data) => {
                  if (data.value === formik.values[field.name]) {
                    return (
                      <Typography
                        key={data.value}
                        variant="body2"
                        fontWeight={400}
                        fontSize={14}
                      >
                        {data.label}
                      </Typography>
                    );
                  }
                })}
              </Grid>
            </Grid>
          );
        })}
      </>
    );
  } else
    return (
      <>
        {formSchoolTypeFields.map((field) => (
          <Grid item xs={12} md={field.md} key={field.name}>
            <Typography variant="body2" fontWeight={600} sx={{ mb: "8px" }}>
              {field.label}
            </Typography>

            <TextField
              select
              // value="general"
              name={field.name}
              placeholder={"Pilih Jenis Sekolah"}
              fullWidth
              value={formik.values[field.name]}
              onChange={(e) => formik.setFieldValue(field.name, e.target.value)}
            >
              {field.data.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Typography sx={{ fontSize: 14 }}>{option.label}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}
      </>
    );
};
