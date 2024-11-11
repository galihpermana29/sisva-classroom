import { Typography } from "@mui/material";

export const KelasLearningCell = ({ data }) => {
  return (
    <div className="flex flex-col gap-0">
      <Typography color="#1D2939" variant="body1" fontWeight={600}>
        {data.Subject}
      </Typography>
      <Typography color="#1D2939" variant="subtitle2" fontWeight={300}>
        {data.TeacherName}
      </Typography>
    </div>
  );
};
