import { ModalBody } from "@/components/CustomModal";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, Modal } from "@mui/material";
import { useState } from "react";
import JadwalKeseluruhanOptionalFilterForm from "../forms/jadwal-keseluruhan-optional-filters";

function JadwalKeseluruhanOptionalFiltersModal({
  tingkatanData,
  kelasData,
  hariData,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        disableElevation
        variant="outlined"
        endIcon={<FilterListIcon />}
      >
        Lainnya
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal tambah aktivitas non KBM"
        aria-describedby="Tambah aktivitas non KBM"
      >
        <ModalBody
          title="Filter Lainnya"
          handleClose={handleClose}
          content={
            <JadwalKeseluruhanOptionalFilterForm
              handleClose={handleClose}
              tingkatanData={tingkatanData}
              kelasData={kelasData}
              hariData={hariData}
            />
          }
        />
      </Modal>
    </div>
  );
}

export default JadwalKeseluruhanOptionalFiltersModal;
