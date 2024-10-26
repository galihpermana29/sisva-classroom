'use client';

import {
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Modal,
    Paper,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import Image from 'next/image';

import {
    formChangePasswordFields,
    formResetPasswordFields,
} from '@/globalcomponents/FormFields';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

export const FormStudentPassword = ({
  formik,
  editing,
  setEditing,
  containerRef,
  initialData,
}) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [action, setAction] = useState('');
  const [activeUser, setActiveUser] = useState({});

  const [openResetModal, setOpenResetModal] = useState('');

  function renderType(name) {
    if (name === 'old_password') {
      return showOldPassword ? 'text' : 'password';
    } else if (name === 'new_password') {
      return showNewPassword ? 'text' : 'password';
    } else if (name === 'new_password_confirm') {
      return showConfirmNewPassword ? 'text' : 'password';
    }
  }

  if (!editing) {
    return (
      <>
        <Grid item xs={12} md={12}>
          <Stack direction={'row'}>
            <Button
              onClick={() => {
                setEditing(true);
                setAction('change');
              }}
              variant='contained'
            >
              Ubah Password
            </Button>
            <Button
              onClick={() => {
                setEditing(true);
                setAction('reset');
              }}
              sx={{
                ml: 1,
                backgroundColor: 'warning.main',
                '&:hover': { backgroundColor: 'warning.dark' },
              }}
              variant='contained'
            >
              Reset Password
            </Button>
          </Stack>
        </Grid>
      </>
    );
  } else
    return (
      <>
        {action === 'change'
          ? formChangePasswordFields.map((field) =>
              field.type === 'password' ? (
                <Grid item xs={12} md={field.md} key={field.name}>
                  <Typography variant='body2' fontWeight={600} mb={0.5}>
                    {field.label}
                  </Typography>
                  <TextField
                    type={renderType(field.name)}
                    name={field.name}
                    placeholder={field.placeholder}
                    fullWidth
                    value={formik.values[field.name]}
                    onChange={(e) =>
                      formik.setFieldValue(field.name, e.target.value)
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => {
                              if (field.name === 'old_password') {
                                setShowOldPassword(!showOldPassword);
                              } else if (field.name === 'new_password') {
                                setShowNewPassword(!showNewPassword);
                              } else if (
                                field.name === 'new_password_confirm'
                              ) {
                                setShowConfirmNewPassword(
                                  !showConfirmNewPassword
                                );
                              }
                            }}
                          >
                            {field.name === 'old_password' &&
                              (showOldPassword ? (
                                <VisibilityOff sx={{ fontSize: 16 }} />
                              ) : (
                                <Visibility sx={{ fontSize: 16 }} />
                              ))}
                            {field.name === 'new_password' &&
                              (showNewPassword ? (
                                <VisibilityOff sx={{ fontSize: 16 }} />
                              ) : (
                                <Visibility sx={{ fontSize: 16 }} />
                              ))}
                            {field.name === 'new_password_confirm' &&
                              (showConfirmNewPassword ? (
                                <VisibilityOff sx={{ fontSize: 16 }} />
                              ) : (
                                <Visibility sx={{ fontSize: 16 }} />
                              ))}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              ) : null
            )
          : formResetPasswordFields.map((field) =>
              field.type === 'password' ? (
                <Grid item xs={12} md={field.md} key={field.name}>
                  <Typography variant='body2' fontWeight={600} mb={0.5}>
                    {field.label}
                  </Typography>
                  <TextField
                    type={renderType(field.name)}
                    name={field.name}
                    placeholder={field.placeholder}
                    fullWidth
                    value={formik.values[field.name]}
                    onChange={(e) =>
                      formik.setFieldValue(field.name, e.target.value)
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => {
                              if (field.name === 'old_password') {
                                setShowOldPassword(!showOldPassword);
                              } else if (field.name === 'new_password') {
                                setShowNewPassword(!showNewPassword);
                              } else if (
                                field.name === 'new_password_confirm'
                              ) {
                                setShowConfirmNewPassword(
                                  !showConfirmNewPassword
                                );
                              }
                            }}
                          >
                            {field.name === 'old_password' &&
                              (showOldPassword ? (
                                <VisibilityOff sx={{ fontSize: 16 }} />
                              ) : (
                                <Visibility sx={{ fontSize: 16 }} />
                              ))}
                            {field.name === 'new_password' &&
                              (showNewPassword ? (
                                <VisibilityOff sx={{ fontSize: 16 }} />
                              ) : (
                                <Visibility sx={{ fontSize: 16 }} />
                              ))}
                            {field.name === 'new_password_confirm' &&
                              (showConfirmNewPassword ? (
                                <VisibilityOff sx={{ fontSize: 16 }} />
                              ) : (
                                <Visibility sx={{ fontSize: 16 }} />
                              ))}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              ) : null
            )}
        <Stack
          sx={{
            // display: editing && activeTab !== 2 ? "flex" : "none",
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
            mt: 2,
          }}
        >
          <Button
            variant='outlined'
            sx={{ mr: 1, width: 120 }}
            onClick={() => {
              setEditing(false);
              formik.setValues(initialData);
              containerRef.current.scrollTo({ top: 0 });
              setShowOldPassword(false);
              setShowNewPassword(false);
              setShowConfirmNewPassword(false);
            }}
          >
            Batal
          </Button>
          <Button
            variant='contained'
            sx={{ display: action === 'change' ? 'flex' : 'none', width: 120 }}
            onClick={() => {
              setEditing(false);
              formik.setValues(initialData);
              containerRef.current.scrollTo({ top: 0 });
              setShowOldPassword(false);
              setShowNewPassword(false);
              setShowConfirmNewPassword(false);
            }}
          >
            Simpan
          </Button>
          <Button
            variant='contained'
            sx={{
              display: action === 'reset' ? 'flex' : 'none',
              width: 120,
              backgroundColor: 'warning.main',
              '&:hover': { backgroundColor: 'warning.dark' },
            }}
            onClick={() => {
              setActiveUser({
                profile_image_uri: formik.values['profile_image_uri'],
                name: formik.values['name'],
                username: formik.values['username'],
              });
              setOpenResetModal(true);
              formik.setValues(initialData);
              containerRef.current.scrollTo({ top: 0 });
              setShowOldPassword(false);
              setShowNewPassword(false);
              setShowConfirmNewPassword(false);
            }}
          >
            Reset
          </Button>
          <Modal open={openResetModal} onClose={() => setOpenResetModal(false)}>
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
                  Reset Password
                </Typography>
              </Box>

              <Typography sx={{ mt: 1, fontSize: 14 }}>
                Anda akan mereset password karyawan berikut:
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
                  <Image
                    alt='Web Image'
                    fill
                    sizes='100%'
                    style={{ objectFit: 'cover' }}
                    src={`https://api-staging.sisva.id/file/v1/files/${activeUser.profile_image_uri}?school_id=0a49a174-9ff5-464d-86c2-3eb1cd0b284e`}
                  />
                </Avatar>
                <Stack justifyContent={'center'}>
                  <Typography
                    sx={{
                      color: 'black',
                      fontWeight: 600,
                    }}
                  >
                    {activeUser.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14, lineHeight: '16px' }}>
                    {activeUser.username}
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                sx={{
                  flexDirection: 'row',
                }}
              >
                <Button
                  variant='outlined'
                  sx={{ flex: 1, mr: 1 }}
                  onClick={() => {
                    setOpenResetModal(false);
                  }}
                >
                  Batal
                </Button>
                <Button
                  variant='contained'
                  sx={{
                    flex: 1,
                    backgroundColor: 'warning.main',
                    '&:hover': {
                      backgroundColor: 'warning.dark',
                    },
                  }}
                  onClick={() => {
                    setOpenResetModal(false);
                    setEditing(false);
                  }}
                >
                  Hapus
                </Button>
              </Stack>
            </Stack>
          </Modal>
        </Stack>
      </>
    );
};
