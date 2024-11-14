import { ModalBody } from "@/components/CustomModal";
import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { useFilterStatus } from "../../hooks/filters/useFilterStatus";
import { JadwalKelasForm } from "../forms/jadwal-kelas";

function AddJadwalKelasModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { periode, prodi, tingkat, hari, kelas } = useFilterStatus();

  const initialValues =
    Boolean(periode) && Boolean(prodi)
      ? {
          period_id: periode ?? "",
          study_program_id: parseInt(prodi) ?? "",
          grade: tingkat ?? "",
          student_group_id: Boolean(kelas) ? parseInt(kelas) : "",
          class_id: "",
          day: parseInt(hari) ?? "",
          start_time: null,
          end_time: null,
          subject_id: "",
        }
      : undefined;

  return (
    <>
      <Button onClick={handleOpen} disableElevation variant="contained">
        Tambah
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal tambah jadwal kelas"
        aria-describedby="Tambah jadwal kelas"
      >
        <ModalBody
          title="Tambah Jadwal Kelas"
          handleClose={handleClose}
          content={
            <JadwalKelasForm
              initialValues={initialValues}
              handleClose={handleClose}
            />
          }
        />
      </Modal>
    </>
  );
}

export default AddJadwalKelasModal;
