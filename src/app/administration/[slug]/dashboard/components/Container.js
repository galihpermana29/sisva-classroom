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
  Typography,
} from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";

import SchoolLogoBlue from "@/assets/School-Logo-Blue.png";
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

    function UserMenu() {
      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      return (
        <Box>
          <Head>
            <title>{`${pathname} | Sisva`}</title>
            <meta name="description" content="Sisva" />
          </Head>
          <Stack
            component={Button}
            id="profile-button"
            aria-controls={open ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              height: 50,
            }}
          >
            <Avatar
              sx={{
                width: "36px",
                height: "36px",
                position: "relative",
                mr: 1,
                ml: 1,
              }}
            >
              <Image
                alt="Web Image"
                fill
                sizes="100%"
                style={{ objectFit: "cover" }}
                src={
                  "https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                }
              />
              {/* A */}
            </Avatar>
            <Typography
              sx={{
                display: { xs: "none", lg: "block" },
                color: "black",
                fontWeight: 600,
                mr: 1,
              }}
            >
              Agung Prabowo
            </Typography>
          </Stack>
          <Menu
            id="profile-menu"
            aria-labelledby="profile-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Stack
              sx={{
                maxWidth: 280,
                flexDirection: "row",
                alignItems: "center",
                p: "0 8px 8px",
              }}
            >
              <Avatar
                sx={{
                  width: "36px",
                  height: "36px",
                  position: "relative",
                  mr: 1,
                  ml: 1,
                }}
              >
                <Image
                  alt="Web Image"
                  fill
                  sizes="100%"
                  style={{ objectFit: "cover" }}
                  src={
                    "https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  }
                />

                {/* A */}
              </Avatar>
              <Typography color="black" fontWeight={600} mr={1}>
                Agung Prabowo
              </Typography>
            </Stack>
            <Divider />
            <MenuItem
              component={Link}
              href="/administration/SEKOLAHSISVA/dashboard/staff/profile/agung.prabowo"
              sx={{ maxWidth: 280 }}
            >
              <Stack flexDirection={"row"}>
                <SettingsOutlined />{" "}
                <Typography sx={{ ml: 1 }}>Profil Saya</Typography>
              </Stack>
            </MenuItem>
            <MenuItem
              component={Link}
              href="/administration/SEKOLAHSISVA/auth/login"
              sx={{ maxWidth: 280 }}
            >
              <Stack flexDirection={"row"}>
                <LogoutRounded /> <Typography sx={{ ml: 1 }}>Keluar</Typography>
              </Stack>
            </MenuItem>
          </Menu>
        </Box>
      );
    }

    return (
      <Stack
        component={Paper}
        elevation={1}
        sx={{
          height: 70,
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
          href="/administration/SEKOLAHSISVA/dashboard"
          sx={{
            display: { xs: "none", lg: "flex" },
            flexDirection: "row",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Image alt="Web Image" src={SchoolLogoBlue} height={36} width={36} />
          <Typography fontWeight="700" ml={1} fontSize={18}>
            Sekolah Sisva
          </Typography>
        </Stack>
        <Stack
          sx={{
            display: { xs: "flex", lg: "none" },
            flexDirection: "row",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Box
            component={Button}
            sx={{ fontSize: 24, height: 50 }}
            onClick={() => setNavigationOpen(true)}
          >
            <MenuIcon />
          </Box>
          <Typography fontWeight="700" ml={1} fontSize={{ xs: 16, md: 18 }}>
            {renderTitle()}
          </Typography>
        </Stack>
        <UserMenu />
      </Stack>
    );
  }

  function Navigation() {
    function NavigationContent() {
      let navigationData = [
        // {
        //   title: "Beranda",
        //   slug: "dashboard",
        //   icon: <DashboardIcon />,
        //   children: [],
        // },
        {
          title: "Sekolah",
          slug: "school",
          icon: <SchoolIcon />,
          children: [
            {
              title: "Profil Sekolah",
              slug: "profile",
            },
          ],
        },
        {
          title: "Karyawan",
          slug: "staff",
          icon: <StaffIcon />,
          children: [
            {
              title: "Daftar Karyawan",
              slug: "profile",
            },
            {
              title: "Kehadiran Karyawan",
              slug: "attendance",
            },
          ],
        },
        {
          title: "Siswa",
          slug: "student",
          icon: <StudentIcon />,
          children: [
            {
              title: "Daftar Siswa",
              slug: "profile",
            },
            {
              title: "Kehadiran Siswa",
              slug: "attendance",
            },
            {
              title: "Alumni",
              slug: "alumni",
            },
          ],
        },
        {
          title: "Akademik",
          slug: "academic",
          icon: <AcademicIcon />,
          children: [
            {
              title: "Program Studi",
              slug: "study-program",
            },
            {
              title: "Kurikulum",
              slug: "curriculum",
            },
            {
              title: "Periode",
              slug: "period",
            },
            {
              title: "Guru",
              slug: "teacher",
            },
            {
              title: "Kelas",
              slug: "class",
            },
            // {
            //   title: "Jadwal Pelajaran",
            //   slug: "schedule",
            // },
            {
              title: "Ekstrakurikuler",
              slug: "extracurricular",
            },
          ],
        },
        {
          title: "Rapot",
          slug: "report",
          icon: <ReportIcon />,
          children: [
            {
              title: "Template Rapot",
              slug: "template",
            },
            {
              title: "Buat Rapot",
              slug: "create",
            },
            // {
            //   title: "Edit Rapot",
            //   slug: "edit",
            // },
            // {
            //   title: "Lihat Rapot",
            //   slug: "view",
            // },
          ],
        },
        {
          title: "Informasi",
          slug: "information",
          icon: <InformationIcon />,
          children: [
            {
              title: "Pengumuman",
              slug: "announcement",
            },
          ],
        },
        {
          title: "Keuangan",
          slug: "finance",
          icon: <FinanceIcon />,
          children: [
            {
              title: "Invoice",
              slug: "invoice",
            },
          ],
        },
      ];

      function NestedMenu(props) {
        let [open, setOpen] = useState(
          activePathname.includes(props.item.slug) ? true : false
        );
        return (
          <Stack
            sx={{
              width: "100%",
              backgroundColor: open ? "base.base20" : "none",
              borderRadius: 2,
            }}
          >
            <Button
              sx={{
                width: "100%",
                fontSize: 20,
                justifyContent: "flex-start",
                padding: "8px 16px",
              }}
              onClick={() => {
                if (!activePathname.includes(props.item.slug)) {
                  setOpen(!open);
                }
              }}
            >
              <Box
                sx={{
                  height: 30,
                  width: 30,
                  fontSize: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: activePathname.includes(props.item.slug)
                    ? "primary.main"
                    : "base.base50",
                }}
              >
                {props.item.icon}
              </Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  ml: 2,
                  color: activePathname.includes(props.item.slug)
                    ? "primary.main"
                    : "base.base50",
                  flex: 1,
                  textAlign: "left",
                }}
              >
                {props.item.title}
              </Typography>
              <ArrowBackIosNewRounded
                sx={{
                  color: "base.base50",
                  fontSize: 18,
                  transform: open ? "rotate(90deg)" : "rotate(-90deg)",
                }}
              />
            </Button>
            <Stack
              gap={"8px"}
              mt={1}
              display={open ? "flex" : "none"}
              mr={2}
              mb={2}
            >
              {props.item.children.map((child) => {
                return (
                  <Button
                    component={Link}
                    onClick={() => setNavigationOpen(false)}
                    href={`/administration/SEKOLAHSISVA/dashboard/${props.item.slug}/${child.slug}`}
                    key={child.slug}
                    sx={{
                      maxWidth: "100%",
                      fontSize: 20,
                      justifyContent: "flex-start",
                      ml: "46px",
                    }}
                    variant={
                      activePathname.includes(
                        `${props.item.slug}/${child.slug}`
                      )
                        ? "contained"
                        : ""
                    }
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: activePathname.includes(
                          `${props.item.slug}/${child.slug}`
                        )
                          ? "white"
                          : "base.base50",
                      }}
                    >
                      {child.title}
                    </Typography>
                  </Button>
                );
              })}
            </Stack>
          </Stack>
        );
      }

      function SingleMenu(props) {
        return (
          <Button
            component={Link}
            href={`/administration/SEKOLAHSISVA/${props.item.slug}`}
            onClick={() => setNavigationOpen(false)}
            sx={{
              width: "100%",
              fontSize: 20,
              justifyContent: "flex-start",
              padding: "8px 16px",
            }}
            variant={
              activePathname.endsWith(props.item.slug) ? "contained" : ""
            }
          >
            <Box
              sx={{
                height: 30,
                width: 30,
                fontSize: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: activePathname.endsWith(props.item.slug)
                  ? "white"
                  : "base.base50",
              }}
            >
              {props.item.icon}
            </Box>
            <Typography
              sx={{
                fontWeight: 600,
                ml: 2,
                color: activePathname.endsWith(props.item.slug)
                  ? "white"
                  : "base.base50",
              }}
            >
              {props.item.title}
            </Typography>
          </Button>
        );
      }
      return (
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            gap: "8px",
            p: "16px",
            mt: "16px",
          }}
        >
          {navigationData.map((item) => {
            if (item.children.length > 0) {
              return <NestedMenu key={item.slug} item={item} />;
            } else {
              return <SingleMenu key={item.slug} item={item} />;
            }
          })}
        </Stack>
      );
    }
    return (
      <Box>
        <Modal
          open={navigationOpen}
          onClose={() => {
            setNavigationOpen(false);
          }}
        >
          <Stack
            component={Paper}
            elevation={2}
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100vh",
              width: 280,
              maxWidth: "80%",
              zIndex: { xs: 100, lg: 1 },
            }}
          >
            <Stack
              component={Link}
              href="/administration/SEKOLAHSISVA/dashboard"
              sx={{
                flexDirection: "row",
                minHeight: 70,
                width: "100%",
                alignItems: "center",
                pl: 4,
                pr: 2,
                // mt: 2,
              }}
            >
              <Image
                alt="Web Image"
                src={SchoolLogoBlue}
                height={36}
                width={36}
              />
              <Typography fontWeight="700" ml={1} fontSize={18}>
                Sekolah Sisva
              </Typography>
            </Stack>
            <Divider />
            <Box
              sx={{
                maxHeight: "100%",
                width: "100%",
                overflowY: "scroll",
              }}
            >
              <NavigationContent />
            </Box>
          </Stack>
        </Modal>

        <Stack
          component={Paper}
          elevation={2}
          sx={{
            display: { xs: "none", lg: "flex" },
            position: "fixed",
            left: 0,
            top: 0,
            height: "100vh",
            width: 280,
            maxWidth: "80%",
            pt: "70px",

            maxHeight: "100%",
            overflowY: "scroll",
            zIndex: { xs: 100, lg: 1 },
          }}
        >
          <NavigationContent />
        </Stack>
      </Box>
    );
  }
  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <Header />
      <Navigation />
      <Box
        sx={{
          height: "100%",
          width: "100%",
          pl: { xs: 0, lg: "280px" },
          pt: "70px",
          backgroundColor: "base.base20",
          overflow: "hidden",
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
