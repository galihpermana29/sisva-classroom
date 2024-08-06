import { Paper, Stack, TextField, Typography } from "@mui/material";

export const BobotSKS = () => {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      gap={2}
      className="p-6"
      sx={{ flexDirection: "col", borderRadius: 2 }}
    >
      <Typography fontWeight={600} variant="body1">
        Bobot SKS
      </Typography>
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <TextField
          sx={{ borderRadius: 4, width: "4em" }}
          variant="outlined"
          size="small"
        />
        <Typography variant="body1">Menit</Typography>
      </Stack>
    </Stack>
  );
};
