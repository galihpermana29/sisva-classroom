"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Box } from "@mui/material";
import Container from "./components/Container";

export default function RootLayout({ children }) {
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading) return <></>;

  return (
    <Box
      sx={{
        height: "100vh",
        maxHeight: "100vh",
        width: "100%",
      }}
    >
      <Container>
        <div className="max-h-[90vh] overflow-auto h-full">{children}</div>
      </Container>
    </Box>
  );
}
