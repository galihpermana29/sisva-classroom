import { MenuIcon } from "@/assets/SVGs";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useSchool } from "../../SchoolContext";
import UserMenu from "./UserMenu";

export default function Header({ activePathname, slug, setNavigationOpen }) {
  const school = useSchool();

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
      }
    });
    return title;
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
        href={`/administration/${slug}/dashboard`}
        sx={{
          display: { xs: "none", lg: "flex" },
          flexDirection: "row",
          height: "100%",
          alignItems: "center",
        }}
      >
        {school.logo_url && (
          <Image alt="Web Image" src={school.logo_url} height={36} width={36} />
        )}
        <Typography fontWeight="700" ml={1} fontSize={18}>
          {school.name}
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
      <UserMenu slug={slug} school={school} />
    </Stack>
  );
}
