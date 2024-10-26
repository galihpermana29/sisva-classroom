import { ModalBody } from "@/components/CustomModal";
import { Button, Modal } from "@mui/material";
import { useState } from "react";
import JadwalKeseluruhanOptionalFilterForm from "../forms/jadwal-keseluruhan-optional-filters";
import FilterIcon from "../icons/FilterIcon";

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
        endIcon={<FilterIcon />}
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
