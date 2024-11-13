"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import Container from "./components/Container";

export default function RootLayout({ children }) {
  const { slug } = useParams();
  const { data: currentUser, isLoading } = useCurrentUser(slug);

  if (isLoading || !currentUser) return <></>;

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
