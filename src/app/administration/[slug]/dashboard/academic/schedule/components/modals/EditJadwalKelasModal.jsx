import { Modal } from "@mui/material";

import { ModalBody } from "@/components/CustomModal";

import { JadwalKelasForm } from "../forms/jadwal-kelas";

function EditJadwalKelasModal({ data, open, handleClose }) {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal edit jadwal kelas"
        aria-describedby="Edit jadwal kelas"
      >
        <ModalBody
          title="Edit Jadwal Kelas"
          handleClose={handleClose}
          content={
            <JadwalKelasForm
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

export default EditJadwalKelasModal;
