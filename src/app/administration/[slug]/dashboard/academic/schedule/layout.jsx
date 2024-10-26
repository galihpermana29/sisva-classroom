import { Stack, Typography } from "@mui/material";

const DashboardAcademicLayout = ({ children }) => {
  return (
    <Stack
      gap={3}
      padding={{ xs: "0rem", lg: "2rem" }}
    >
      <LayoutTitle />
      {children}
    </Stack>
  );
};

const LayoutTitle = () => {
  return (
    <Typography
      display={{ xs: "none", lg: "block" }}
      fontWeight={600}
      fontSize={20}
      lineHeight="120%"
    >
      Jadwal Pelajaran
    </Typography>
  );
};

export default DashboardAcademicLayout;
