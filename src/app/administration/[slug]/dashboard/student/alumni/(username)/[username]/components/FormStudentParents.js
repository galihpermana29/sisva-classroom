"use client";

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

import { useSchool } from "@/app/administration/[slug]/SchoolContext";
import { formStudentParentsFields } from "@/globalcomponents/FormFields";
import {
  educationLevels,
  genders,
  guardians,
  incomeLevels,
  lifeStatus,
  relationships,
  religions,
} from "@/globalcomponents/Variable";
import { Cancel } from "@mui/icons-material";

export const FormStudentParents = ({ formik, editing }) => {
  const school = useSchool();

  function RenderGender({ value }) {
    let tempType;
    genders.map((item) => {
      if (item.slug === value) {
        tempType = item.title;
      }
    });
    return tempType;
  }
  function RenderRelationship({ value }) {
    let tempType;
    relationships.map((item) => {
      if (item.slug === value) {
        tempType = item.title;
      }
    });
    return tempType;
  }
  function RenderReligion({ value }) {
    let tempType;
    religions.map((item) => {
      if (item.slug === value) {
        tempType = item.title;
      }
    });
    return tempType;
  }
  function RenderLifeStatus({ value }) {
    let tempType;
    lifeStatus.map((item) => {
      if (item.slug === value) {
        tempType = item.title;
      }
    });
    return tempType;
  }
  function RenderIncome({ value }) {
    let tempType;
    incomeLevels.map((item) => {
      if (item.slug === value) {
        tempType = item.title;
      }
    });
    return tempType;
  }
  function RenderEducation({ value }) {
    let tempType;
    educationLevels.map((item) => {
      if (item.slug === value) {
        tempType = item.title;
      }
    });
    return tempType;
  }
  function RenderGuardian({ value }) {
    let tempType;
    guardians.map((item) => {
      if (item.slug === value) {
        tempType = item.title;
      }
    });
    return tempType;
  }
  if (!editing) {
    return (
      <>
        {formStudentParentsFields.map((field, index) =>
          field.type === "title" ? (
            <Grid item xs={12} md={field.md} key={index} sx={{ mb: 0 }}>
              <Typography variant="body2" fontWeight={600} fontSize={16}>
                {field.label}
              </Typography>
            </Grid>
          ) : field.type === "divider" ? (
            <Grid
              item
              xs={12}
              key={index}
              sx={{ borderBottom: "1px solid rgb(0,0,0,0.12)", mb: 1 }}
            ></Grid>
          ) : field.type === "select" ? (
            <Grid
              sx={{ marginBottom: "8px" }}
              item
              xs={12}
              md={field.md}
              key={field.name}
            >
              <Grid item xs={12} md={11}>
                <Typography variant="body2" fontWeight={500} fontSize={14}>
                  {field.label}
                </Typography>
              </Grid>
              <Grid item xs={12} md={11}>
                <Typography variant="body2" fontWeight={400} fontSize={14}>
                  {field.name === "father_religion" ||
                  field.name === "mother_religion" ||
                  field.name === "guardian_religion" ? (
                    <RenderReligion value={formik.values[field.name]} />
                  ) : field.name === "father_income" ||
                    field.name === "mother_income" ||
                    field.name === "guardian_income" ? (
                    <RenderIncome value={formik.values[field.name]} />
                  ) : field.name === "father_education" ||
                    field.name === "mother_education" ||
                    field.name === "guardian_education" ? (
                    <RenderEducation value={formik.values[field.name]} />
                  ) : field.name === "father_life_status" ||
                    field.name === "mother_life_status" ||
                    field.name === "guardian_life_status" ? (
                    <RenderLifeStatus value={formik.values[field.name]} />
                  ) : field.name === "guardian_type" ? (
                    <RenderGuardian value={formik.values[field.name]} />
                  ) : field.name === "guardian_gender" ? (
                    <RenderGender value={formik.values[field.name]} />
                  ) : field.name === "guardian_relationship" ? (
                    <RenderRelationship value={formik.values[field.name]} />
                  ) : null}
                  {formik.values[field.name] ? "" : "-"}
                </Typography>
              </Grid>
            </Grid>
          ) : field.type === "text" ? (
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
                <Typography variant="body2" fontWeight={400} fontSize={14}>
                  {formik.values[field.name] ? formik.values[field.name] : "-"}
                </Typography>
              </Grid>
            </Grid>
          ) : field.type === "photo" ? (
            <Grid xs={12} item key={field.name}>
              <Typography variant="body2" fontWeight={500} fontSize={14}>
                {field.label}
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  p: 1,
                  width: "fit-content",
                  backgroundColor: "base.base20",
                  borderRadius: 2,
                }}
              >
                <Box sx={{ height: 96, width: 96, position: "relative" }}>
                  <Image
                    alt="Image"
                    src={`https://api-staging.sisva.id/file/v1/files/${
                      formik.values[field.name]
                    }?school_id=${school.id}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
              </Box>
            </Grid>
          ) : null
        )}
      </>
    );
  } else
    return (
      <>
        {formStudentParentsFields.map((field, index) =>
          field.type === "title" ? (
            <Grid item xs={12} md={field.md} key={index}>
              <Typography variant="body2" fontWeight={600} fontSize={16}>
                {field.label}
              </Typography>
            </Grid>
          ) : field.type === "divider" ? (
            <Grid
              item
              xs={12}
              key={index}
              sx={{ borderBottom: "1px solid rgb(0,0,0,0.12)", mb: 1 }}
            ></Grid>
          ) : field.type === "text" ? (
            <Grid item xs={12} md={field.md} key={field.name}>
              <Typography variant="body2" fontWeight={600} mb={1}>
                {field.label}
              </Typography>
              <TextField
                name={field.name}
                placeholder={field.placeholder}
                fullWidth
                value={formik.values[field.name]}
                onChange={(e) =>
                  formik.setFieldValue(field.name, e.target.value)
                }
              />
            </Grid>
          ) : field.type === "select" ? (
            <Grid item xs={12} md={field.md} key={field.name}>
              <Typography variant="body2" fontWeight={600} mb={1}>
                {field.label}
              </Typography>

              <TextField
                select
                fullWidth
                value={formik.values[field.name]}
                onChange={(e) =>
                  formik.setFieldValue(field.name, e.target.value)
                }
                InputProps={{
                  startAdornment: formik.values[field.name] && (
                    <Cancel
                      onClick={() => {
                        // ! is not defined
                        // setTypeFilter("");
                      }}
                      sx={{
                        fontSize: 14,
                        color: "base.base50",
                        cursor: "pointer",
                        transform: "translateX(-4px)",
                        "&:hover": {
                          color: "base.base60",
                        },
                      }}
                    />
                  ),
                }}
              >
                {field.data.map((option) => (
                  <MenuItem key={option.slug} value={option.slug}>
                    <Typography fontSize={14}>{option.title}</Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : field.type === "photo" ? (
            <Grid xs={12} item key={field.name}>
              <Typography variant="body2" fontWeight={500} fontSize={14}>
                {field.label}
              </Typography>
              <Stack
                sx={{
                  width: 112,
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    width: "fit-content",
                    backgroundColor: "base.base20",
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ height: 96, width: 96, position: "relative" }}>
                    <Image
                      alt="Image"
                      src={`https://api-staging.sisva.id/file/v1/files/${
                        formik.values[field.name]
                      }?school_id=${school.id}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                </Box>
                <label htmlFor="image-input">
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ m: "8px 0 4px" }}
                  >
                    Ubah Foto
                    <input
                      name={"logo_uri"}
                      accept="image/*"
                      id="image-input"
                      type="file"
                      style={{
                        position: "absolute",
                        opacity: "0",
                        border: "1px solid red",
                      }}
                    />
                  </Button>
                </label>
                <Button fullWidth variant="outlined" size="small">
                  Hapus
                </Button>
              </Stack>
            </Grid>
          ) : null
        )}
      </>
    );
};
