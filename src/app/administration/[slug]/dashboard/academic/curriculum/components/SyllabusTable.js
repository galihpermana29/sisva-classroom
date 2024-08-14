import { subject_types } from '@/globalcomponents/Variable';
import { BorderColorRounded, DeleteForeverRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { FormAddSyllabus } from './FormAddSyllabus';

const columns = [
  {
    field: 'card',
    headerName: '',
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      let tempType;
      subject_types.map((item) => {
        if (item.slug === params.value.data.subject_type) {
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
            <Stack sx={{ width: '100%' }}>
              <Stack
                sx={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgb(0,0,0,0.12)',
                  px: 1,
                  py: '10px',
                  backgroundColor: 'base.base10',
                }}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}
                >
                  Kurikulum
                </Typography>
                <Typography sx={{ fontSize: 14, textAlign: 'right' }}>
                  {params.value.data.name}
                </Typography>
              </Stack>

              <Stack
                sx={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgb(0,0,0,0.12)',
                  px: 1,
                  py: '10px',
                  backgroundColor: 'base.base20',
                }}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}
                >
                  Program Studi
                </Typography>
                {params.value.data.study_program}
              </Stack>
              <Stack
                sx={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgb(0,0,0,0.12)',
                  px: 1,
                  py: '10px',
                  backgroundColor: 'base.base10',
                }}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}
                >
                  Mata Pelajaran
                </Typography>
                <Typography sx={{ fontSize: 14, textAlign: 'right' }}>
                  {params.value.data.subject}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgb(0,0,0,0.12)',
                  px: 1,
                  py: '10px',
                  backgroundColor: 'base.base20',
                }}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}
                >
                  Tingkatan
                </Typography>
                <Typography sx={{ fontSize: 14, textAlign: 'right' }}>
                  {params.value.data.grade}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgb(0,0,0,0.12)',
                  px: 1,
                  py: '10px',
                  backgroundColor: 'base.base10',
                }}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}
                >
                  Silabus
                </Typography>
                <Button small variant='outlined' sx={{ fontSize: 13 }}>
                  <a
                    href='/17189757176d1d2d03182252039b56.pdf'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Lihat
                  </a>
                </Button>
              </Stack>
            </Stack>
            <ActionButton params={params} />
          </Stack>
        </Box>
      );
    },
  },
  { field: 'name', headerName: 'Kurikulum', flex: 1.3 },
  {
    field: 'study_program',
    headerName: 'Program Studi',
    flex: 1,
  },
  { field: 'subject', headerName: 'Mata Pelajaran', flex: 1.5 },
  {
    field: 'grade',
    headerName: 'Tingkatan',
    flex: 1,
  },
  {
    field: 'syllabus_uri',
    headerName: 'Silabus',
    sortable: false,
    flex: 1,
    renderCell: (params) => {
      return (
        <Button small variant='outlined' sx={{ fontSize: 13 }}>
          {' '}
          <a
            href={`https://api-staging.sisva.id/file/v1/files/${params.row.syllabus_uri}?school_id=0a49a174-9ff5-464d-86c2-3eb1cd0b284e`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Lihat
          </a>
        </Button>
      );
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

function ActionButton({ params }) {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        mt: { xs: 2, lg: 0 },
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
          width: { xs: 90, lg: 'fit-content' },
        }}
        onClick={() => {
          params.value.setOpenEditModal(true);
          params.value.setActiveRow(params.value.data);
          params.value.formik.setValues({
            id: params.value.data.id,
            curriculum_name: params.value.data.curriculum_id,
            study_program: params.value.data.study_program_id,
            subject: params.value.data.subject_id,
            grade: params.value.data.grade,
            syllabus_uri: params.value.data.syllabus_uri,
          });
        }}
      >
        <BorderColorRounded
          sx={{ fontSize: { xs: 15, lg: 18 }, color: 'base.base50' }}
        />
        <Typography
          sx={{ fontSize: 14, ml: 1, display: { xs: 'flex', lg: 'none' } }}
        >
          Edit
        </Typography>
      </IconButton>
      <IconButton
        sx={{
          borderRadius: 2,
          ml: 1,
          backgroundColor: 'warning.main',
          '&:hover': {
            backgroundColor: 'warning.dark',
          },
          width: { xs: 90, lg: 'fit-content' },
        }}
        onClick={() => {
          params.value.setOpenDeleteModal(true);
          params.value.setActiveRow(params.value.data);
        }}
      >
        <DeleteForeverRounded
          sx={{ color: 'white', fontSize: { xs: 16, lg: 18 } }}
        />
        <Typography
          sx={{
            fontSize: 14,
            ml: 1,
            display: { xs: 'flex', lg: 'none' },
            color: 'white',
          }}
        >
          Delete
        </Typography>
      </IconButton>
    </Stack>
  );
}

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
      {params.map((studyProgram, index) => {
        return (
          <Chip
            key={index}
            sx={{
              m: { xs: '2px 0px 2px 4px', lg: '2px' },
              fontSize: 12,
            }}
            label={studyProgram}
            color='primary'
          />
        );
      })}
    </Stack>
  );
}

export default function SyllabusTable({
  data,
  formik,
  tableData,
  studyProgram,
  subjectOpt,
  handleFileChange,
  deleteSyllabus = () => {},
}) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [activeRow, setActiveRow] = useState({});

  let rows = [];

  data.map((data, idx) => {
    let tempObject = {
      id: idx,
      syllabus_id: data.id,
      name: data.name,
      study_program: data.study_program,
      subject: data.subject,
      grade: data.grade,
      syllabus_uri: data.syllabus_uri,
      action: {
        data: data,
        setActiveRow: setActiveRow,
        setOpenDeleteModal: setOpenDeleteModal,
        setOpenEditModal: setOpenEditModal,
        formik: formik,
      },
      card: {
        data: data,
        setActiveRow: setActiveRow,
        setOpenDeleteModal: setOpenDeleteModal,
        setOpenEditModal: setOpenEditModal,
        formik: formik,
      },
    };
    rows.push(tempObject);
  });

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Modal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          formik.setValues({ name: '' });
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
          }}
        >
          <Box
            sx={{
              padding: 2,
            }}
          >
            <Typography fontWeight={600} fontSize={16}>
              Edit Tingkatan
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: '70vh', overflowY: 'auto', px: 2 }}>
            <FormAddSyllabus
              formik={formik}
              editing={true}
              tableData={tableData}
              studyProgram={studyProgram}
              subjectOpt={subjectOpt}
              handleFileChange={handleFileChange}
            />
          </Box>
          <Divider />
          <Stack
            sx={{
              flexDirection: 'row',
              p: 2,
            }}
          >
            <Button
              variant='outlined'
              sx={{ flex: 1, mr: 1 }}
              onClick={() => {
                setOpenEditModal(false);
                formik.setValues();
              }}
            >
              Batal
            </Button>
            <Button
              variant='contained'
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenEditModal(false);
                formik.handleSubmit();
              }}
            >
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Modal>
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
              Hapus Tingkatan
            </Typography>
          </Box>

          <Typography sx={{ mt: 1, fontSize: 14 }}>
            Anda akan menghapus tingkatan berikut:
          </Typography>
          <Stack
            sx={{ width: '100%', my: 1, overflow: 'hidden', borderRadius: 2 }}
          >
            <Stack
              sx={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgb(0,0,0,0.12)',
                px: 1,
                py: '10px',
                backgroundColor: 'base.base10',
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}>
                Tingkatan
              </Typography>
              <Typography sx={{ fontSize: 14, textAlign: 'right' }}>
                {activeRow.grade}
              </Typography>
            </Stack>
            <Stack
              sx={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgb(0,0,0,0.12)',
                px: 1,
                py: '10px',
                backgroundColor: 'base.base20',
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}>
                Mata Pelajaran
              </Typography>
              <Typography sx={{ fontSize: 14, textAlign: 'right' }}>
                {activeRow.subject}
              </Typography>
            </Stack>
            <Stack
              sx={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgb(0,0,0,0.12)',
                px: 1,
                py: '10px',
                backgroundColor: 'base.base10',
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}>
                Program Studi
              </Typography>
              <Typography sx={{ fontSize: 14, textAlign: 'right' }}>
                {activeRow.study_program}
              </Typography>
            </Stack>
            <Stack
              sx={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgb(0,0,0,0.12)',
                px: 1,
                py: '10px',
                backgroundColor: 'base.base20',
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}>
                Kurikulum
              </Typography>
              <Typography sx={{ fontSize: 14, textAlign: 'right' }}>
                {activeRow.name}
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
                deleteSyllabus(activeRow.id);
                setOpenDeleteModal(false);
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
          .MuiDataGrid-row.Mui-odd {
            background-color: #f2f4f7;
          }
          .MuiDataGrid-root .MuiDataGrid-cell {
            padding: 16px 0;
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
            paginationModel: { page: 0, pageSize: 50 },
          },
        }}
        pageSizeOptions={[20, 50, 100]}
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
                name: false,
                study_program: false,
                subject: false,
                grade: false,
                syllabus_uri: false,
                action: false,
              }
        }
        rowHeight={80}
      />
    </div>
  );
}
