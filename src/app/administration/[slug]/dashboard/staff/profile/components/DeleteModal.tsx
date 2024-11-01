import {
  Avatar,
  Box,
  Button,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { Dispatch, memo, SetStateAction } from 'react';

interface DeleteModalProps {
  activeRow: any;
  deleteUser: (userData: any) => void;
  openDeleteModal: boolean;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
}

function DeleteModal({
  activeRow,
  deleteUser,
  openDeleteModal,
  setOpenDeleteModal,
}: DeleteModalProps) {
  return (
    <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
      <Stack
        component={Paper}
        elevation={2}
        sx={{
          borderRadius: 2,
          zIndex: 20,
          margin: 'auto',
          position: 'fixed',
          height: 'fit-content',
          width: '360px',
          maxWidth: '80%',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          p: 2,
        }}
      >
        <Box>
          <Typography fontWeight={600} fontSize={16}>
            Hapus Karyawan
          </Typography>
        </Box>

        <Typography sx={{ mt: 1, fontSize: 14 }}>
          Anda akan menghapus karyawan berikut:
        </Typography>
        <Stack
          sx={{
            backgroundColor: 'base.base20',
            p: 1,
            borderRadius: 2,
            flexDirection: 'row',
            alignItems: 'center',
            mt: 1,
            mb: 2,
          }}
        >
          <Avatar
            sx={{
              width: '40px',
              height: '40px',
              position: 'relative',
              mr: 1,
            }}
          >
            {activeRow.profile_image_uri !== '' ? (
              <Image
                alt="Web Image"
                fill
                sizes="100%"
                style={{ objectFit: 'cover' }}
                src={`https://api-staging.sisva.id/file/v1/files/${activeRow.profile_image_uri}?school_id=0a49a174-9ff5-464d-86c2-3eb1cd0b284e`}
              />
            ) : (
              activeRow.name?.toUpperCase().slice(0, 1)
            )}
          </Avatar>
          <Stack justifyContent={'center'}>
            <Typography
              sx={{
                color: 'black',
                fontWeight: 600,
              }}
            >
              {activeRow.name}
            </Typography>
            <Typography sx={{ fontSize: 14, lineHeight: '16px' }}>
              {activeRow.username}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          sx={{
            flexDirection: 'row',
          }}
        >
          <Button
            variant="outlined"
            sx={{ flex: 1, mr: 1 }}
            onClick={() => {
              setOpenDeleteModal(false);
            }}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            sx={{
              flex: 1,
              backgroundColor: 'warning.main',
              '&:hover': {
                backgroundColor: 'warning.dark',
              },
            }}
            onClick={() => {
              setOpenDeleteModal(false);
              deleteUser(activeRow);
            }}
          >
            Hapus
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}

export default memo(DeleteModal);
