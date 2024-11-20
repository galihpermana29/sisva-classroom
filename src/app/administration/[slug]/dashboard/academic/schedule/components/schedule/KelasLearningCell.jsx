import { Tooltip, Typography } from "@mui/material";

export const KelasLearningCell = ({ data }) => {
  return (
    <Tooltip
      className="flex flex-col gap-0"
      title={`${data.Subject} - ${data.TeacherName}`}
    >
      <Typography color="#1D2939" variant="body1" fontWeight={600}>
        {data.Subject}
      </Typography>
      <Typography color="#1D2939" variant="subtitle2" fontWeight={300}>
        {data.TeacherName}
      </Typography>
    </Tooltip>
  );
};
