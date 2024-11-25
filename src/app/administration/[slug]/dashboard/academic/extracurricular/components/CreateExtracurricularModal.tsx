import {
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";

import { FormAddExtracurriculer } from "./FormAddExtracurriculer";

function CreateExtracurricularModal({
  emptyData,
  formik,
  openCreateExtracurriculum,
  setOpenCreateExtracurriculum,
  teacherList,
}) {
  return (
    <Modal
      open={openCreateExtracurriculum}
      onClose={() => {
        setOpenCreateExtracurriculum(false);
        formik.setValues(emptyData);
      }}
    >
      <Stack
        component={Paper}
        elevation={2}
        sx={{
          borderRadius: 2,
          zIndex: 20,
          margin: "auto",
          position: "fixed",
          height: "fit-content",
          width: "360px",
          maxWidth: "80%",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <Box
          sx={{
            padding: 2,
          }}
        >
          <Typography fontWeight={600} fontSize={16}>
            Tambah Ekstrakulikuler
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ maxHeight: "70vh", overflowY: "auto", px: 2 }}>
          <FormAddExtracurriculer formik={formik} teacherList={teacherList} />
        </Box>
        <Divider />
        <Stack
          sx={{
            flexDirection: "row",
            p: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{ flex: 1, mr: 1 }}
            onClick={() => {
              setOpenCreateExtracurriculum(false);
              formik.setValues(emptyData);
            }}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            sx={{ flex: 1 }}
            onClick={() => {
              setOpenCreateExtracurriculum(false);
              formik.handleSubmit();
            }}
          >
            Simpan
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}

export default memo(CreateExtracurricularModal);
