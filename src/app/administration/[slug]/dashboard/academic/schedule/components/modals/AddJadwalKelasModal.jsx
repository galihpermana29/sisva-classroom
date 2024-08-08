import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { ModalBody } from "@/components/CustomModal";
import { JadwalKelasForm } from "../forms/jadwal-kelas";

function AddJadwalKelasModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} disableElevation variant="contained">
        Tambah
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal tambah jam sekolah"
        aria-describedby="Tambah jam sekolah"
      >
        <ModalBody
          title="Tambah Jadwal Kelas"
          handleClose={handleClose}
          content={<JadwalKelasForm handleClose={handleClose} />}
        />
      </Modal>
    </>
  );
}

export default AddJadwalKelasModal;
