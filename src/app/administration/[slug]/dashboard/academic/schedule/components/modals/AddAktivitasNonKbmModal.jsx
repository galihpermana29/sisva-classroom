import { ModalBody } from "@/components/CustomModal";
import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { AktivitasNonKbmForm } from "../forms/aktivitas-non-kbm";
import { useFilterStatus } from "../../hooks/filters/useFilterStatus";

function AddAktivitasNonKbmModal() {
  const [open, setOpen] = useState(false);

  const { periode } = useFilterStatus();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        disabled={!Boolean(periode)}
        onClick={handleOpen}
        disableElevation
        variant="contained"
      >
        Tambah
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal tambah aktivitas non KBM"
        aria-describedby="Tambah aktivitas non KBM"
      >
        <ModalBody
          title="Aktivitas Non KBM"
          handleClose={handleClose}
          content={<AktivitasNonKbmForm handleClose={handleClose} />}
        />
      </Modal>
    </>
  );
}

export default AddAktivitasNonKbmModal;
