import {
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { type Dispatch, memo, type SetStateAction } from "react";

import { FormAddStaff } from "./FormAddStaff";

interface CreateModalProps {
  formik: any;
  initialData: {
    name: string;
    type: string;
    permissions: any[];
    password: string;
    password_confirm: string;
  };
  openCreateModal: boolean;
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
}

function CreateModal({
  formik,
  initialData,
  openCreateModal,
  setOpenCreateModal,
}: CreateModalProps) {
  return (
    <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
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
            Tambah Karyawan
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ maxHeight: "70vh", overflowY: "auto", px: 2 }}>
          <FormAddStaff formik={formik} />
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
              setOpenCreateModal(false);
              formik.setValues(initialData);
            }}
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ flex: 1 }}
            onClick={() => {
              formik.handleSubmit();
              setOpenCreateModal(false);
            }}
          >
            Simpan
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}

export default memo(CreateModal);
