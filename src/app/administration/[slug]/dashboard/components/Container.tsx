"use client";

import {
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import SchoolLogoBlue from "@/assets/School-Logo-Blue.png";
import {
  AcademicIcon,
  FinanceIcon,
  InformationIcon,
  ReportIcon,
  SchoolIcon,
  StaffIcon,
  StudentIcon,
} from "@/assets/SVGs";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import Header from "./Header";

export const metadata = {
  title: "Beranda | Sisva",
  description: "Sisva | Solusi Digitalisasi dan Modernisasi Sekolah",
};

export default function Container(props) {
  const { slug } = useParams();
  const pathname = usePathname();
  let [navigationOpen, setNavigationOpen] = useState(false);
  let [activePathname, setActivePathname] = useState("");

  useEffect(() => {
    setActivePathname(pathname);
  }, [pathname]);

  function Navigation() {
    function NavigationContent() {
      let navigationData = [
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
            {
              title: "Ekstrakurikuler",
              slug: "extracurricular",
            },
            {
              title: "Jadwal Pelajaran",
              slug: "schedule",
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
                    href={`/administration/${slug}/dashboard/${props.item.slug}/${child.slug}`}
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
                        : "text"
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
            href={`/administration/${slug}/${props.item.slug}`}
            onClick={() => setNavigationOpen(false)}
            sx={{
              width: "100%",
              fontSize: 20,
              justifyContent: "flex-start",
              padding: "8px 16px",
            }}
            variant={
              activePathname.endsWith(props.item.slug) ? "contained" : "text"
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
              href={`/administration/${slug}/dashboard`}
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
            overflowY: "auto",
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
      <Header
        activePathname={activePathname}
        slug={slug}
        setNavigationOpen={setNavigationOpen}
      />
      <Navigation />
      <Box
        sx={{
          height: "100%",
          width: "100%",
          pl: { xs: 0, lg: "280px" },
          pt: "70px",
          backgroundColor: "base.base20",
          overflow: "auto",
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
