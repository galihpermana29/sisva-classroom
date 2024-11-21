import { usePeriods } from "@/hooks/query/academic/usePeriods";
import { BorderColorRounded, DeleteForeverRounded } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

export default function ActionButtons({ params }) {
  const { data: periods } = usePeriods();
  const isShowDelete =
    periods.find((data) => data.id === params.value.data.period_id)?.status ===
    "inactive";

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        mt: { xs: 2, lg: 0 },
      }}
    >
      <IconButton
        sx={{
          borderRadius: 2,
          backgroundColor: "base.base30",
          "&:hover": {
            backgroundColor: "base.base40",
          },
          height: "fit-content",
          width: { xs: 90, lg: "fit-content" },
        }}
        onClick={() => {
          params.value.setOpenEditModal(true);
          params.value.setActiveRow(params.value.data);
          params.value.formik.setValues({
            id: params.value.data.id,
            name: params.value.data.class,
            homeroom_teacher_id: params.value.data.guardian_id,
            homeroom_teacher: params.value.data.guardian,
            period_id: params.value.data.period_id,
            period: params.value.data.period,
            study_program_id: params.value.data.study_program_id,
            study_program: params.value.data.study_program,
            grade: params.value.data.grade,
          });
        }}
      >
        <BorderColorRounded
          sx={{ fontSize: { xs: 15, lg: 18 }, color: "base.base50" }}
        />
        <Typography
          sx={{ fontSize: 14, ml: 1, display: { xs: "flex", lg: "none" } }}
        >
          Edit
        </Typography>
      </IconButton>
      {isShowDelete && (
        <IconButton
          sx={{
            borderRadius: 2,
            ml: 1,
            backgroundColor: "warning.main",
            "&:hover": {
              backgroundColor: "warning.dark",
            },
            width: { xs: 90, lg: "fit-content" },
          }}
          onClick={() => {
            params.value.setOpenDeleteModal(true);
            params.value.setActiveRow(params.value.data);
          }}
        >
          <DeleteForeverRounded
            sx={{ color: "white", fontSize: { xs: 16, lg: 18 } }}
          />
          <Typography
            sx={{
              fontSize: 14,
              ml: 1,
              display: { xs: "flex", lg: "none" },
              color: "white",
            }}
          >
            Delete
          </Typography>
        </IconButton>
      )}
    </Stack>
  );
}
