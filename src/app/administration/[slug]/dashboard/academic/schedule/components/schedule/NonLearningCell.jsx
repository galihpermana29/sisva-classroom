import { Typography } from "@mui/material";

export const NonLearningCell = ({ data }) => {
  return (
    <div className="flex items-center justify-center my-auto">
      <Typography color="#1D2939" variant="body1" fontWeight={600}>
        {data.Subject}
      </Typography>
    </div>
  );
};
