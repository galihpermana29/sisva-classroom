import { Stack, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

export const TimeSelect = () => {
  return (
    <Stack
      alignItems="center"
      flexDirection="row"
      justifyContent="center"
      gap={2}
    >
      <Stack spacing={1}>
        <Typography fontWeight={600} variant="body2">
          Jam Mulai
        </Typography>
        <TimePicker />
      </Stack>
      <Stack spacing={1}>
        <Typography fontWeight={600} variant="body2">
          Jam Selesai
        </Typography>
        <TimePicker />
      </Stack>
    </Stack>
  );
};
