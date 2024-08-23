import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import { ModalBody } from "@/components/CustomModal";
import Image from "next/image";

function ErrorJadwalKelasModal({ open, handleClose }) {
  console.log(open);
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBody
        handleClose={handleClose}
        content={
          <Stack
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Box position={"relative"} width={"150px"} height={"150px"}>
              <Image src={"/images/conflict.gif"} fill alt="Conflict GIF" />
            </Box>
            <Stack>
              <Typography
                fontSize={"24px"}
                fontWeight={500}
                textAlign={"center"}
              >
                Konflik Waktu Mata Pelajaran!
              </Typography>
              <Typography color={"#98A2B3"} textAlign={"center"}>
                Terdapat mata pelajaran terjadwal bersamaan. Periksa dan
                sesuaikan jadwal.
              </Typography>
            </Stack>
            <Box marginTop={"16px"} width={"100%"}>
              <Button onClick={handleClose} variant="contained" fullWidth>
                Kembali
              </Button>
            </Box>
          </Stack>
        }
      />
    </Modal>
  );
}

export default ErrorJadwalKelasModal;
