"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Stack,
  ButtonBase,
  Typography,
  colors,
} from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import useTheme from "@mui/material/styles/useTheme";

import SchoolLogoBlue from "@/assets/School-Logo-Blue.png";
import Home from "@/assets/classroom/Home";
import Classroom from "@/assets/classroom/Classroom";
import Profile from "@/assets/classroom/Profile";
import styles from "./Container.module.css";

import {
  ArrowBackIosNewRounded,
  LogoutRounded,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  AcademicIcon,
  DashboardIcon,
  FinanceIcon,
  InformationIcon,
  MenuIcon,
  ReportIcon,
  SchoolIcon,
  StaffIcon,
  StudentIcon,
} from "@/assets/SVGs";
import Head from "next/head";

export const metadata = {
  title: "Beranda | Sisva",
  description: "Sisva | Solusi Digitalisasi dan Modernisasi Sekolah",
};

export default function Container(props) {
  const pathname = usePathname();
  let [navigationOpen, setNavigationOpen] = useState(false);
  let [navigationOpenList, setNavigationOpenList] = useState([]);
  let [activePathname, setActivePathname] = useState("");

  let theme = useTheme();

  useEffect(() => {
    setActivePathname(pathname);
  }, [pathname]);

  function Header() {
    function renderTitle() {
      let nav =
        activePathname.split("/").slice(-1)[0] !== "dashboard"
          ? activePathname.split("/").slice(-2, -1) +
            "/" +
            activePathname.split("/").slice(-1)
          : activePathname.split("/").slice(-1)[0];

      let title;

      let titleList = [
        {
          title: "Beranda",
          slug: "dashboard",
        },
        {
          title: "Profil Sekolah",
          slug: "school/profile",
        },
        {
          title: "Daftar Karyawan",
          slug: "staff/profile",
        },
        {
          title: "Kehadiran Karyawan",
          slug: "staff/attendance",
        },
        {
          title: "Program Studi",
          slug: "academic/study-program",
        },
        {
          title: "Kurikulum",
          slug: "academic/curriculum",
        },
        {
          title: "Periode",
          slug: "academic/period",
        },
        {
          title: "Guru",
          slug: "academic/teacher",
        },
        {
          title: "Kelas",
          slug: "academic/class",
        },
        {
          title: "Jadwal Pelajaran",
          slug: "academic/schedule",
        },
        {
          title: "Ekstrakurikuler",
          slug: "academic/extracurricular",
        },
        {
          title: "Daftar Siswa",
          slug: "student/profile",
        },
        {
          title: "Kehadiran Siswa",
          slug: "student/attendance",
        },
        {
          title: "Alumni",
          slug: "student/alumni",
        },

        {
          title: "Template Rapot",
          slug: "report/template",
        },
        {
          title: "Buat Rapot",
          slug: "report/create",
        },
        {
          title: "Edit Rapot",
          slug: "report/edit",
        },
        {
          title: "Lihat Rapot",
          slug: "report/view",
        },
        {
          title: "Pengumuman",
          slug: "information/announcement",
        },
        {
          title: "Invoice",
          slug: "finance/invoice",
        },
      ];

      titleList.map((item) => {
        if (item.slug === nav) {
          title = item.title;
          // setActiveTitle(item.title);
        }
      });
      return title;
    }


    function NavMenu() {
      const navData = [
        {
          label: "Beranda",
          icon: Home,
          href: "home",
        },
        {
          label: "Kelas",
          icon: Classroom,
          href: "class",
        },
        {
          label: "Profil",
          icon: Profile,
          href: "profile",
        },
      ];

      const router = useRouter();
      return (
        <Stack direction="row" height="100%" alignItems="center" width={{xs:"100%", lg:"fit-content"}}>
          {navData.map((item) => (
            <ButtonBase
              key={item.label}
              sx={{
                flex: 1,
                height: "60px",
                borderRadius: 3,
                textTransform: "capitalize",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width:80,
                px: 3,
              }}
              href={item.href}
            >
              <item.icon
                className={styles.navigationButtonIcon}
                color={pathname.split("/").slice(-1)[0] === item.href ? theme.palette.primary.main : "#5E5E5E"}
              />
              <span className={styles.navigationButtonText}>{item.label}</span>
            </ButtonBase>
          ))}
        </Stack>
      );
    }

    return (
      <Stack
        component={Paper}
        elevation={1}
        sx={{
          height: 70,
          bottom:{ xs: 0, lg: "auto" },
          padding: { xs: 1, md: "0 32px" },
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          position: "fixed",
          zIndex: 10,
        }}
      >
        <Stack
          component={Link}
          href="/classroom/SEKOLAHSISVA/home"
          sx={{
            flexDirection: "row",
            height: "100%",
            alignItems: "center",
            display:{xs:"none", lg:"flex"}
          }}
        >
          <Image alt="Web Image" src={SchoolLogoBlue} height={36} width={36} />
          <Typography fontWeight="700" ml={1} fontSize={18}>
            Sekolah Sisva
          </Typography>
        </Stack>
        
        <NavMenu />
      </Stack>
    );
  }

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <Header />
      {/* <Navigation /> */}
      <Box
        sx={{
          minHeight: "100%",
          width: "100%",
          display:"flex",
          justifyContent:"center",
          pt: {xs:0,lg:"70px"},
          pb: {xs:70,lg:0},
          backgroundColor: "base.base20",
          overflow: "hidden",
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
