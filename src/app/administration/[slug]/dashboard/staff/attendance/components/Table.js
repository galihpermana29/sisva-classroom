import { useSchool } from '@/app/administration/[slug]/SchoolContext';
import { permissions, types } from '@/globalcomponents/Variable';
import { BorderColorRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';

const columns = [
  {
    field: 'card',
    headerName: '',
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      let tempType;
      types.map((item) => {
        if (item.slug === params.value.data.type) {
          tempType = item.title;
        }
      });
      return (
        <Box sx={{ width: '100%', mx: 2, py: 0.5 }}>
          <Stack
            component={Paper}
            variant="outlined"
            sx={{
              justifyContent: 'flex-start',
              borderRadius: 2,
              p: 2,
            }}
          >
            <Stack direction={'row'} justifyContent={'space-between'} flex={1}>
              <Stack direction={'row'} alignItems={'center'}>
                <Avatar
                  sx={{
                    width: '40px',
                    height: '40px',
                    position: 'relative',
                    mr: 1,
                  }}
                >
                  {params.value.data.profile_image_uri !== '' ? (
                    <Image
                      alt="Web Image"
                      fill
                      sizes="100%"
                      style={{ objectFit: 'cover' }}
                      src={`https://api-staging.sisva.id/file/v1/files/${params.value.data.profile_image_uri}?school_id=0a49a174-9ff5-464d-86c2-3eb1cd0b284e`}
                    />
                  ) : (
                    params.value.data.nametoUpperCase().slice(0, 1)
                  )}
                </Avatar>
                <Typography
                  sx={{
                    color: 'black',
                  }}
                >
                  {params.value.data.name}
                </Typography>
              </Stack>
              <ActionButton params={params} />
            </Stack>

            <Stack
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                mt: 2,
              }}
            >
              <Stack sx={{ flex: 1 }}>
                <Typography sx={{ color: 'base.base50', fontSize: 12 }}>
                  Username
                </Typography>
                <Typography sx={{ fontSize: 14, lineHeight: '14px' }}>
                  {params.value.data.username}
                </Typography>
              </Stack>
              {/* <Stack sx={{ flex: 1 }}> */}
              {/* <Typography sx={{ color: "base.base50", fontSize: 12 }}>
                  Status
                </Typography> */}
              {params.value.data.status === 'sick' ? (
                <Chip
                  sx={{
                    fontSize: 12,
                    width: 60,
                    color: 'white',
                    backgroundColor: 'orange',
                  }}
                  label="Sakit"
                />
              ) : params.value.data.status === 'absent' ? (
                <Chip
                  sx={{
                    fontSize: 12,
                    width: 60,
                    color: 'white',
                    backgroundColor: 'warning.main',
                  }}
                  label="Alpa"
                />
              ) : params.value.data.status === 'sick' ? (
                <Chip
                  sx={{
                    fontSize: 12,
                    width: 60,
                    color: 'white',
                    backgroundColor: 'orange',
                  }}
                  label="Sakit"
                />
              ) : null}
            </Stack>
            {/* </Stack> */}
          </Stack>
        </Box>
      );
    },
  },
  {
    field: 'profile_image_uri',
    headerName: '',
    width: 70,
    sortable: false,
    renderCell: (params) => (
      <Avatar
        sx={{
          width: 40,
          height: 40,
          my: 1.5,
          ml: 2,
          position: 'relative',
          display: 'flex',
          // justifyContent: 'flex-end',
        }}
      >
        {params.value.profile_image_uri !== '' ? (
          <Image
            alt="Web Image"
            fill
            sizes="100%"
            style={{ objectFit: 'cover' }}
            src={`https://api-staging.sisva.id/file/v1/files/${params.value.profile_image_uri}?school_id=0a49a174-9ff5-464d-86c2-3eb1cd0b284e`}
          />
        ) : (
          params.value.name.toUpperCase().slice(0, 1)
        )}
      </Avatar>
    ),
  },
  { field: 'name', headerName: 'Nama', flex: 1 },
  { field: 'username', headerName: 'Username', flex: 1 },
  {
    field: 'status',
    headerName: 'Status',
    width: 70,
    flex: 1,
    renderCell: (params) => {
      if (params.value === 'sick') {
        return (
          <Chip
            sx={{
              fontSize: 12,
              width: 60,
              color: 'white',
              backgroundColor: 'orange',
            }}
            label="Sakit"
          />
        );
      } else if (params.value === 'absent') {
        return (
          <Chip
            sx={{
              fontSize: 12,
              width: 60,
              color: 'white',
              backgroundColor: 'warning.main',
            }}
            label="Alpa"
          />
        );
      } else if (params.value === 'leave') {
        return (
          <Chip
            sx={{
              fontSize: 12,
              width: 60,
              color: 'white',
              backgroundColor: 'orange',
            }}
            label="Izin"
          />
        );
      } else return null;
    },
  },
  {
    field: 'action',
    headerName: 'Aksi',
    sortable: false,
    width: 120,
    renderCell: (params) => {
      return <ActionButton params={params} />;
    },
  },
];

function ChipList({ params }) {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden',
        m: '8px 0',
      }}
    >
      {params.map((permission, index) => {
        let tempPermission;
        permissions.map((item) => {
          if (item.slug === permission) {
            tempPermission = item.title;
          }
        });
        return (
          <Chip
            key={index}
            sx={{
              m: { xs: '2px 4px 2px 0', lg: '2px' },
              fontSize: 12,
            }}
            label={tempPermission}
            color="primary"
          />
        );
      })}
    </Stack>
  );
}

function ActionButton({ params }) {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <IconButton
        sx={{
          borderRadius: 2,
          backgroundColor: 'base.base30',
          '&:hover': {
            backgroundColor: 'base.base40',
          },
          height: 'fit-content',
        }}
        onClick={() => {
          params.value.setOpenEditModal(true);
          params.value.setActiveRow(params.value.data);
          params.value.formik.setValues({
            id: params.value.data.id,
            status: params.value.data.status,
          });
        }}
      >
        <BorderColorRounded
          sx={{ fontSize: { xs: 15, lg: 18 }, color: 'base.base50' }}
        />
      </IconButton>
    </Stack>
  );
}

export default function DataTable({ data, formik }) {
  const school = useSchool();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const [openEditModal, setOpenEditModal] = useState(false);
  const [activeRow, setActiveRow] = useState({});

  let rows = [];

  data.map((data) => {
    let tempObject = {
      id: data.id,
      name: data.name,
      username: data.username,
      status: data.status,
      profile_image_uri: {
        profile_image_uri: data.profile_image_uri,
        name: data.name,
      },
      action: {
        data: data,
        setActiveRow: setActiveRow,
        setOpenEditModal: setOpenEditModal,
        formik: formik,
      },
      card: {
        data: data,
        setActiveRow: setActiveRow,
        setOpenEditModal: setOpenEditModal,
        formik: formik,
      },
    };
    rows.push(tempObject);
  });

  const absentOpt = [
    { slug: 'present', show: 'Hadir' },
    { slug: 'sick', show: 'Sakit' },
    { slug: 'leave', show: 'Izin' },
    { slug: 'absent', show: 'Alpha' },
  ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Modal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          formik.setFieldValue('status', '');
        }}
      >
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
              Absensi
            </Typography>
          </Box>

          <Typography sx={{ mt: 1, fontSize: 14 }}>
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Typography>
          <Stack
            sx={{
              backgroundColor: 'base.base20',
              p: 1,
              borderRadius: 2,
              flexDirection: 'row',
              alignItems: 'center',
              mt: 1,
              mb: 1,
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
                  alt="Image"
                  src={`https://api-staging.sisva.id/file/v1/files/${activeRow.profile_image_uri}?school_id=${school.id}`}
                  layout={'fill'}
                  objectFit={'cover'}
                />
              ) : (
                activeRow?.name.toUpperCase().slice(0, 1)
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
          <Stack sx={{ mb: 1 }} key={'status'}>
            <TextField
              select
              value={formik.values.status}
              onChange={(e) => {
                formik.setFieldValue('id', activeRow.id);
                formik.setFieldValue('status', e.target.value);
              }}
              sx={{ flex: { xs: 1, lg: 0 } }}
            >
              {absentOpt.map((option, idx) => (
                <MenuItem key={idx} value={option.slug}>
                  <Typography fontSize={14}>{option.show}</Typography>
                </MenuItem>
              ))}
            </TextField>
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
                setOpenEditModal(false);
                formik.setFieldValue('status', '');
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
                formik.handleSubmit();
                setOpenEditModal(false);
              }}
            >
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Modal>
      {isMobile ? (
        <style jsx global>{`
          .MuiDataGrid-root .MuiDataGrid-cell {
            padding: 0;
            border-bottom: none !important;
          }
          .MuiDataGrid-root .MuiDataGrid-cell:focus-within {
            outline: none !important;
          }
          .MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within {
            outline: none !important;
          }
          .MuiDataGrid-root {
            border-radius: 0;
          }
          .MuiDataGrid-columnHeaders {
            display: none;
          }
          .MuiDataGrid-virtualScroller {
            padding: 8px 0px;
          }
          .MuiToolbar-root {
            width: 100%;
          }
        `}</style>
      ) : (
        <style jsx global>{`
          .MuiDataGrid-row.Mui-even {
            background-color: #f9fafb;
          }
          .MuiDataGrid-row.Mui-odd {
            background-color: #f2f4f7;
          }
          .MuiDataGrid-root .MuiDataGrid-cell {
            padding: 0;
            padding-left: 10px;
          }
          .MuiDataGrid-root .MuiDataGrid-cell:focus-within {
            outline: none !important;
          }
          .MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within {
            outline: none !important;
          }
          .MuiDataGrid-root {
            border-radius: 0;
          }
        `}</style>
      )}
      <DataGrid
        rows={rows}
        getRowHeight={() => 'auto'}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[10, 20, 50]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd'
        }
        disableRowSelectionOnClick
        disableColumnMenu
        columnVisibilityModel={
          !isMobile
            ? {
                card: false,
              }
            : {
                profile_image_uri: false,
                name: false,
                username: false,
                status: false,
                permissions: false,
                action: false,
              }
        }
      />
    </div>
  );
}
