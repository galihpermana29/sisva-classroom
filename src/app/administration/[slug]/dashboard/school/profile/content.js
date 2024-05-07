"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Divider,
  Grid,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SchoolLogo from "@/assets/School-Logo-Blue.png";
import LandingImage from "@/assets/Login-Library.png";

import formOneIcon from "@/assets/Icon-Paragraph.svg";
import formThreeIcon from "@/assets/Icon-Document.svg";
import formTwoIcon from "@/assets/Icon-Media.svg";
import { BorderColorRounded } from "@mui/icons-material";

import { useFormik } from "formik";

import { FormSchoolDetails } from "./components/FormSchoolDetails";
import { FormSchoolType } from "./components/FormSchoolType";
import { FormSchoolIdentity } from "./components/FormSchoolIdentity";
import { schoolProfileFormValidation } from "./components/FormValidation";

export default function SchoolProfileContent() {
  const containerRef = useRef(null);

  const [initialData, setinitialData] = useState({
    name: "Sekolah Sisva",
    abbreviation: "-",
    identifier_value: "3276081105",
    code: "SEKOLAHSISVA",
    email: "sekolahsisva@sch.id",
    phone: "0811265665",
    address: "Perumahan Nuansa Telaga Kalibaru Blok E28, Depok, Jawa Barat",
    logo_uri: SchoolLogo,
    education_type: "public",
    education_level: "highschool",
    ownership_type: "private",
    landing_image_uri: LandingImage,
    theme_color: "#008CD5",
  });
  const formik = useFormik({
    initialValues: { ...initialData },
    validationSchema: schoolProfileFormValidation,
  });

  let [editing, setEditing] = useState(false);
  return (
    <Stack sx={{ height: "100%", width: "100%", p: { xs: 2, lg: 4 } }}>
      <Stack
        sx={{
          flexDirection: "row",
          display: { xs: "none", lg: "flex" },
          mb: 2,
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
          Profil Sekolah
        </Typography>
      </Stack>
      <Stack
        component={Paper}
        variant="outlined"
        sx={{
          padding: { xs: "16px", md: "16px 32px" },
          borderRadius: 2,
          flexDirection: "row",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ height: 70, width: 70, position: "relative", mr: 2 }}>
          <Image
            alt="Image"
            src={SchoolLogo}
            layout={"fill"}
            objectFit={"contain"}
          />
        </Box>
        <Stack>
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
            Sekolah Sisva
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 6500 }}>
            SEKOLAHSISVA
          </Typography>
        </Stack>
      </Stack>
      <Stack
        component={Paper}
        ref={containerRef}
        variant="outlined"
        sx={{
          borderRadius: 2,
          overflowY: "scroll",
          flex: 1,
          maxHeight: "100%",
          position: "relative",
          pb: 2,
        }}
      >
        {" "}
        <Button
          variant="outlined"
          size="small"
          fullWidth={false}
          startIcon={<BorderColorRounded />}
          onClick={() => {
            setEditing(true);
            containerRef.current.scrollTo({ top: 0 });
          }}
          sx={{
            display: !editing ? "flex" : "none",
            padding: "8px 14px",
            position: "fixed",
            width: "fit-content",
            justifySelf: "flex-end",
            right: { xs: 32, md: 48, lg: 64 },
            mt: 2,
            backgroundColor: "white",
          }}
        >
          <Box  component={"span"}>
            Edit
          </Box>
        </Button>
        <Stack direction={"row"} width="100%">
          <Stack width="100%">
            <Grid container>
              <Grid item xs={12}>
                <Grid
                  container
                  justifyContent={"space-between"}
                  sx={{
                    padding: "16px",
                    mt: 1,
                  }}
                >
                  <Grid item xs={11}>
                    <Grid container>
                      <Grid
                        item
                        sx={{
                          marginRight: "20px",
                          marginTop: "5px",
                          mb: "8px",
                        }}
                      >
                        <Image
                          src={formOneIcon}
                          height={20}
                          width={20}
                          alt="icon"
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Grid container columnSpacing={4} rowSpacing={2}>
                          <FormSchoolDetails
                            formik={formik}
                            editing={editing}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  justifyContent={"space-between"}
                  sx={{
                    padding: "16px",
                    mt: 1,
                  }}
                >
                  <Grid item xs={11}>
                    <Grid container>
                      <Grid
                        item
                        sx={{
                          marginRight: "20px",
                          marginTop: "5px",
                          mb: "8px",
                        }}
                      >
                        <Image
                          src={formTwoIcon}
                          height={20}
                          width={20}
                          alt="icon"
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Grid container columnSpacing={4} rowSpacing={2}>
                          <FormSchoolType formik={formik} editing={editing} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  justifyContent={"space-between"}
                  sx={{
                    padding: "16px",
                    mt: 1,
                  }}
                >
                  <Grid item xs={11}>
                    <Grid container>
                      <Grid
                        item
                        sx={{
                          marginRight: "20px",
                          marginTop: "5px",
                          mb: "8px",
                        }}
                      >
                        <Image
                          src={formThreeIcon}
                          height={20}
                          width={20}
                          alt="icon"
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Grid container columnSpacing={4} rowSpacing={2}>
                          <FormSchoolIdentity
                            formik={formik}
                            editing={editing}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
        <Stack
          sx={{
            display: editing ? "flex" : "none",
            flexDirection: "row",
            justifyContent: "flex-end",
            p: { sm: "0 16px", md: "0 32px" },
            mb: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{ mr: 1, width: 120 }}
            onClick={() => {
              setEditing(false);
              formik.setValues(initialData);
              containerRef.current.scrollTo({ top: 0 });
            }}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            sx={{ width: 120 }}
            onClick={() => {
              setEditing(false);
              containerRef.current.scrollTo({ top: 0 });
            }}
          >
            Simpan
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
