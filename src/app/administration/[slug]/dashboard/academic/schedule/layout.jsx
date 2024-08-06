import { Typography, Stack } from "@mui/material";

const DashboardAcademicLayout = ({ children }) => {
  return (
    <Stack gap={3} padding="2rem">
      <LayoutTitle />
      {children}
    </Stack>
  );
};

const LayoutTitle = () => {
  return (
    <Typography fontWeight={600} fontSize={20} lineHeight="120%">
      Jadwal Pelajaran
    </Typography>
  );
};

export default DashboardAcademicLayout;
