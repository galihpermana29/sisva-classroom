import { Paper, Stack, TextField, Typography } from "@mui/material";

export const BobotSKS = () => {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      gap={2}
      sx={{
        flexDirection: "col",
        paddingX: 4,
        paddingY: 3,
        borderRadius: 2,
      }}
    >
      <Typography fontWeight={600} fontSize={16} lineHeight="120%">
        Bobot SKS
      </Typography>
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <TextField sx={{ borderRadius: 4, width: "4em" }} variant="outlined" />
        <Typography fontSize={14}>Menit</Typography>
      </Stack>
    </Stack>
  );
};
