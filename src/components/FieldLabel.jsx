import { Stack, Typography } from "@mui/material";

export const FieldLabel = ({ name, children, className }) => {
  return (
    <Stack className={className} width="100%" gap={1}>
      <Typography fontWeight={600} variant="body2">
        {name}
      </Typography>
      {children}
    </Stack>
  );
};
