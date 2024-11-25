import { Tooltip, Typography } from "@mui/material";

export const NonLearningCell = ({ data }) => {
  return (
    <Tooltip
      className="flex items-center justify-center my-auto"
      title={data.Subject}
    >
      <Typography color="#1D2939" variant="body1" fontWeight={600}>
        {data.Subject}
      </Typography>
    </Tooltip>
  );
};
