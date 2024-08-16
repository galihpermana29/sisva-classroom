import { Paper, Stack } from "@mui/material";

/** @description Component showing the main content of tagihan pengguna tab */
export const TagihanPengguna = () => {
  return (
    <Stack
      flexDirection="column"
      flexGrow={1}
    >
      <Stack
        paddingY={{ xs: 2, lg: 0 }}
        paddingX={2}
        flexGrow={1}
      >
        Tagihan Pengguna
      </Stack>
      <Stack
        padding={2}
        component={Paper}
        position="sticky"
        bottom={0}
      >
        Footer pagination
      </Stack>
    </Stack>
  );
};
