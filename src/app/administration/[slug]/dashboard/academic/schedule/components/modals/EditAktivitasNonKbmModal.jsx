import { Modal } from "@mui/material";

import { ModalBody } from "@/components/CustomModal";

import { AktivitasNonKbmForm } from "../forms/aktivitas-non-kbm";

function EditAktivitasNonKbmModal({ data, open, handleClose }) {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal edit aktivitas non KBM"
        aria-describedby="Edit aktivitas non KBM"
      >
        <ModalBody
          title="Aktivitas Non KBM"
          handleClose={handleClose}
          content={
            <AktivitasNonKbmForm
              handleClose={handleClose}
              initialValues={data}
              edit
            />
          }
        />
      </Modal>
    </>
  );
}

export default EditAktivitasNonKbmModal;
