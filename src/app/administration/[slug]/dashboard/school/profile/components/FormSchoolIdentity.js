import { useState } from 'react';

import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import checklist from '@/assets/Checklist.png';

import Image from 'next/image';

export const FormSchoolIdentity = ({ formik, editing }) => {
  const [openModal, setOpenModal] = useState(false);

  console.log(formik.values['theme_json_text']);

  function ModalTema() {
    let [activeColor, setActiveColor] = useState(
      formik.values['theme_json_text']
    );
    const ColorTheme = [
      '#C84935',
      '#FC830C',
      '#FBE700',
      '#8F19E3',
      '#008CD5',
      '#5BB8D4',
      '#459589',
      '#927161',
      '#677B8A',
    ];
    return (
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Stack
          component={Paper}
          elevation={2}
          sx={{
            padding: 2,
            borderRadius: 2,
            zIndex: 20,
            margin: 'auto',
            position: 'fixed',
            height: 'fit-content',
            width: 'fit-content',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <Typography fontWeight={600} fontSize={16}>
            Pilih Warna Tema
          </Typography>
          <Grid
            sx={{ width: 184 }}
            container
            xs={12}
            item
            justifyContent={'center'}
          >
            <Grid item xs={12} sx={{}}>
              <Grid
                container
                columnGap={1}
                rowGap={1}
                justifyContent={'center'}
                sx={{ maxWidth: '100%', width: 300, paddingY: '10px' }}
              >
                {ColorTheme.map((color) => (
                  <Grid
                    item
                    key={color}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      onClick={() => setActiveColor(color)}
                      display={'flex'}
                      alignItems={'center'}
                      borderRadius={'8px'}
                      justifyContent={'center'}
                      sx={{
                        width: '56px',
                        height: '56px',
                        backgroundColor: color,
                        cursor: 'pointer',
                      }}
                    >
                      {activeColor === color && (
                        <Image alt='cek' src={checklist} />
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Stack
            sx={{
              flexDirection: 'row',
            }}
          >
            <Button
              variant='outlined'
              sx={{ flex: 1, mr: 1 }}
              onClick={() => setOpenModal(false)}
            >
              Batal
            </Button>
            <Button
              variant='contained'
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenModal(false);
                formik.setFieldValue('theme_json_text', activeColor);
              }}
            >
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Modal>
    );
  }

  if (!editing) {
    return (
      <>
        <ModalTema open={openModal} />
        <Grid xs={12} item>
          <Typography variant='body2' fontWeight={500} fontSize={14}>
            Gambar Latar
          </Typography>

          <Box
            sx={{
              mt: 1,
              p: 1,
              width: 'fit-content',
              backgroundColor: 'base.base20',
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                height: 96,
                width: 96,
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Image
                alt='Image'
                src={formik.values['landing_image_uri']}
                layout='fill'
                objectFit='cover'
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2' fontWeight={500}>
            Warna Tema
          </Typography>
          <Box
            sx={{
              p: 1,
              mt: 0.5,
              borderRadius: 2,
              backgroundColor: 'base.base20',
              width: 'fit-content',
            }}
          >
            <Box
              sx={{
                height: 24,
                width: 64,
                borderRadius: 1,
                backgroundColor: formik.values['theme_json_text'],
                paddingBottom: '15px',
              }}
            ></Box>
          </Box>
        </Grid>
      </>
    );
  } else
    return (
      <>
        <ModalTema />
        <Grid xs={12} item>
          <Typography variant='body2' fontWeight={500} fontSize={14}>
            Gambar Latar
          </Typography>
          <Stack
            sx={{
              mt: 1,
              width: 112,
            }}
          >
            <Box
              sx={{
                p: 1,
                width: 'fit-content',
                backgroundColor: 'base.base20',
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  height: 96,
                  width: 96,
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Image
                  alt='Image'
                  src={formik.values['landing_image_uri']}
                  layout='fill'
                  objectFit='cover'
                />
              </Box>
            </Box>
            <label htmlFor='image-input'>
              <Button
                fullWidth
                variant='outlined'
                size='small'
                sx={{ m: '8px 0 4px' }}
              >
                Ubah Foto
                <input
                  name={'logo_uri'}
                  accept='image/*'
                  id='image-input'
                  type='file'
                  style={{
                    position: 'absolute',
                    opacity: '0',
                    border: '1px solid red',
                  }}
                  // onChange={handleImageChange}
                />
              </Button>
            </label>
            <Button fullWidth variant='outlined' size='small'>
              Hapus
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack width={112}>
            <Typography variant='body2' fontWeight={500}>
              Warna Tema
            </Typography>
            <Box
              sx={{
                p: 1,
                mt: 0.5,
                borderRadius: 2,
                mb: 0.5,
                backgroundColor: 'base.base20',
                width: 'fit-content',
              }}
            >
              <Box
                sx={{
                  height: 24,
                  width: 96,
                  borderRadius: 1,
                  backgroundColor: formik.values['theme_json_text'],
                  paddingBottom: '15px',
                }}
              ></Box>
            </Box>

            <Button
              onClick={() => setOpenModal(true)}
              fullWidth
              variant='outlined'
              size='small'
            >
              Ubah Tema
            </Button>
          </Stack>
        </Grid>
      </>
    );
};
