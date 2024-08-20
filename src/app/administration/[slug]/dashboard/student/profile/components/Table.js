import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Image from 'next/image';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { BorderColorRounded, DeleteForeverRounded } from '@mui/icons-material';
import Link from 'next/link';
import { types, permissions } from '@/globalcomponents/Variable';
import { useState } from 'react';
import { useParams } from 'next/navigation';

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
            variant='outlined'
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
                  <Image
                    alt='Web Image'
                    fill
                    sizes='100%'
                    style={{ objectFit: 'cover' }}
                    src={`https://api-staging.sisva.id/file/v1/files/${params.value.data.profile_image_uri}?school_id=0a49a174-9ff5-464d-86c2-3eb1cd0b284e`}
                  />
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
            </Stack>
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
        }}
      >
        {params.value[0] !== '' ? (
          <Image
            alt='Web Image'
            fill
            sizes='100%'
            style={{ objectFit: 'cover' }}
            src={`https://api-staging.sisva.id/file/v1/files/${params.value[0]}?school_id=0a49a174-9ff5-464d-86c2-3eb1cd0b284e`}
          />
        ) : (
          params.value[1].toUpperCase().slice(0, 1)
        )}
      </Avatar>
    ),
  },
  { field: 'name', headerName: 'Nama', flex: 1 },
  { field: 'username', headerName: 'Username', flex: 1 },
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
            color='primary'
          />
        );
      })}
    </Stack>
  );
}

function ActionButton({ params }) {
  const { slug } = useParams();

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <IconButton
        component={Link}
        href={`/administration/${slug}/dashboard/student/profile/${params.value.data.id}`}
        sx={{
          borderRadius: 2,
          backgroundColor: 'base.base30',
          '&:hover': {
            backgroundColor: 'base.base40',
          },
          height: 'fit-content',
        }}
      >
        <BorderColorRounded
          sx={{ fontSize: { xs: 15, lg: 18 }, color: 'base.base50' }}
        />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: 2,
          ml: 1,
          backgroundColor: 'warning.main',
          '&:hover': {
            backgroundColor: 'warning.dark',
          },
        }}
        onClick={() => {
          params.value.setOpenDeleteModal(true);
          params.value.setActiveRow(params.value.data);
        }}
      >
        <DeleteForeverRounded
          sx={{ color: 'white', fontSize: { xs: 16, lg: 18 } }}
        />
      </IconButton>
    </Stack>
  );
}

export default function DataTable({ data, deleteUser = () => {} }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [activeRow, setActiveRow] = useState({});

  let rows = [];

  data.map((data) => {
    let tempObject = {
      id: data.id,
      name: data.name,
      username: data.username,
      type: data.type,
      permissions: data.permissions,
      profile_image_uri: [data.profile_image_uri, data.name],
      action: {
        data: data,
        setActiveRow: setActiveRow,
        setOpenDeleteModal: setOpenDeleteModal,
      },
      card: {
        data: data,
        setActiveRow: setActiveRow,
        setOpenDeleteModal: setOpenDeleteModal,
      },
    };
    rows.push(tempObject);
  });

  return (
    <div style={{ height: '100%', width: '100%' }}>
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
              Hapus Siswa
            </Typography>
          </Box>

          <Typography sx={{ mt: 1, fontSize: 14 }}>
            Anda akan menghapus siswa berikut:
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
                  alt='Web Image'
                  fill
                  sizes='100%'
                  style={{ objectFit: 'cover' }}
                  src={`https://api-staging.sisva.id/file/v1/files/${activeRow.profile_image_uri}?school_id=0a49a174-9ff5-464d-86c2-3eb1cd0b284e`}
                />
              ) : (
                activeRow.name.toUpperCase().slice(0, 1)
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
              variant='outlined'
              sx={{ flex: 1, mr: 1 }}
              onClick={() => {
                setOpenDeleteModal(false);
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
                setOpenDeleteModal(false);
                deleteUser(activeRow);
              }}
            >
              Hapus
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
                type: false,
                permissions: false,
                action: false,
              }
        }
      />
    </div>
  );
}
