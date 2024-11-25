"use client";

import {
  ArrowBackIosNewRounded,
  BorderColorRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

import { FormStaffBasic } from "./components/FormStaffBasic";
import { FormStaffBiodata } from "./components/FormStaffBiodata";
import { FormStaffPassword } from "./components/FormStaffPassword";

export default function StaffProfileContent() {
  const { slug } = useParams();

  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const [initialData, setinitialData] = useState({
    name: "Agung Prabowo",
    username: "agung.prabowo",
    type: "staff",
    permissions: [
      "school",
      "staff",
      "academic",
      "student",
      "report",
      "information",
      "finance",
    ],
    email: "agung.prabowo@sisva.sch.id",
    phone: "082114451440",
    gender: "male",
    nationality: "wni",
    personal_id: "3276081004960001",
    education_id: "5247-1239-4391-2494",
    religion: "islam",
    address:
      "Perumahan Bagya C10, RT/RW 002/002, Cilodong, Kalibaru, Depok, Jawa Barat",
    profile_image_uri:
      "https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    old_password: "",
    confirm_old_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const formik = useFormik({
    initialValues: { ...initialData },
  });

  let [editing, setEditing] = useState(false);

  let tabs = [
    {
      title: "Akun",
      component: <FormStaffBasic formik={formik} editing={editing} />,
    },
    {
      title: "Biodata",
      component: <FormStaffBiodata formik={formik} editing={editing} />,
    },
    {
      title: "Password",
      component: (
        <FormStaffPassword
          formik={formik}
          editing={editing}
          setEditing={setEditing}
          containerRef={containerRef}
          initialData={initialData}
        />
      ),
    },
  ];
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
        <IconButton
          component={Link}
          href={`/administration/${slug}/dashboard/staff/profile/`}
          sx={{ borderRadius: 2, mr: 1 }}
        >
          <ArrowBackIosNewRounded />
        </IconButton>
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
          Profil Karyawan
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
        <Avatar sx={{ height: 70, width: 70, position: "relative", mr: 2 }}>
          <Image
            alt="Image"
            src={
              "https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            }
            layout={"fill"}
            objectFit={"cover"}
          />
        </Avatar>
        <Stack>
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
            Agung Prabowo
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 6500 }}>
            agung.prabowo
          </Typography>
        </Stack>
      </Stack>
      <Stack
        component={Paper}
        ref={containerRef}
        variant="outlined"
        sx={{
          borderRadius: 2,
          flex: 1,
          overflowY: "hidden",
          maxHeight: "100%",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            borderBottom: "1px solid rgb(0,0,0,0.12)",
            // height: 54,
            overflowX: "auto",
          }}
        >
          {tabs.map((item, index) => {
            return (
              <Button
                key={index}
                sx={{
                  p: { xs: "16px 12px", lg: 2 },
                  minWidth: { xs: 100, lg: 110 },
                  // height: 54,
                  borderBottom: "2px solid",
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderColor:
                    activeTab === index ? "primary.main" : "transparent",
                }}
                onClick={() => {
                  setActiveTab(index);
                  setEditing(false);
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
              </Button>
            );
          })}
        </Stack>
        <Stack
          ref={containerRef}
          variant="outlined"
          sx={{
            flex: 1,
            overflowY: "scroll",
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
              display: !editing && activeTab !== 2 ? "flex" : "none",
              padding: "8px 14px",
              position: "fixed",
              width: "fit-content",
              justifySelf: "flex-end",
              right: { xs: 32, md: 48, lg: 64 },
              mt: 2,
              backgroundColor: "white",
            }}
          >
            <Box component={"span"}>Edit</Box>
          </Button>
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
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid container columnSpacing={4} rowSpacing={2}>
                          {tabs[activeTab].component}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Stack
              sx={{
                display: editing && activeTab !== 2 ? "flex" : "none",
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
      </Stack>
    </Stack>
  );
}
