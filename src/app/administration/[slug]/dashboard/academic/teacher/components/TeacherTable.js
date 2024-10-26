import { BorderColorRounded } from '@mui/icons-material';
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
import { FormAddSubjectTeacher } from './FormAddSubjectTeacher';

const columns = [
  {
    field: 'card',
    headerName: '',
    flex: 1,
    sortable: false,
    renderCell: (params) => {
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
                  Guru
                </Typography>
                <Typography sx={{ fontSize: 14, textAlign: 'right' }}>
                  {/* {params.value.data.teacher} */}
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

                <ChipList params={params.value.data.grades} />
                {/* <ChipList params={params.value.data.study_program} /> */}
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

                <ChipList params={params.value.data.subjects} />
              </Stack>
            </Stack>

            <ActionButton params={params} />
          </Stack>
        </Box>
      );
    },
  },
  {
    field: 'teacher',
    headerName: 'Guru',
    flex: 1,
  },
  {
    field: 'grades',
    headerName: 'Tingkatan',
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      return params?.value?.length > 0 ? (
        <ChipList params={params.value} />
      ) : (
        '-'
      );
    },
  },
  {
    field: 'subjects',
    headerName: 'Mata Pelajaran',
    flex: 2,
    sortable: false,
    renderCell: (params) => {
      return params?.value?.length > 0 ? (
        <ChipList params={params.value} />
      ) : (
        '-'
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

function ChipList({ params, compact }) {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden',
        justifyContent: compact ? 'flex-end' : 'flex-start',
        m: { xs: 0, lg: compact ? 0 : '8px 0' },
      }}
    >
      {params.map((datum, index) => {
        return (
          <Chip
            key={index}
            sx={{
              m: { xs: '2px 0px 2px 4px', lg: '2px' },
              fontSize: 12,
            }}
            label={datum.subject_name ? datum.subject_name : datum}
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
          display: params.value.data.status === 'Selesai' ? 'none' : 'flex',
        }}
        onClick={() => {
          params.value.setOpenEditModal(true);
          params.value.setActiveRow(params.value.data);
          params.value.formik.setValues({
            grades: params.value.data.grades,
            subjects: params.value.data.subjects,
            teacher: params.value.data.id,
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
    </Stack>
  );
}

export default function TeacherTable({
  data,
  formik,
  teacherList,
  gradeList,
  dataTeacher,
}) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const [openCreateTeacherModal, setOpenCreateTeacherModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [activeRow, setActiveRow] = useState({});

  let rows = [];

  data.map((data, idx) => {
    let tempObject = {
      id: idx,
      grades: data.grades,
      subjects: data.subjects,
      teacher: data.name,
      action: {
        data: data,
        setActiveRow: setActiveRow,
        setOpenEditModal: setOpenCreateTeacherModal,
        formik: formik,
      },
      card: {
        data: data,
        setActiveRow: setActiveRow,
        setOpenEditModal: setOpenCreateTeacherModal,
        formik: formik,
      },
    };
    rows.push(tempObject);
  });

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Modal
        open={openCreateTeacherModal}
        onClose={() => {
          setOpenCreateTeacherModal(false);
          formik.setValues({ subject: '', grade: '', teachers: '' });
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
              Edit Guru
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: '70vh', overflowY: 'auto', px: 2 }}>
            <FormAddSubjectTeacher
              editing={true}
              formik={formik}
              teacherList={teacherList}
              gradeList={gradeList}
              dataTeacher={dataTeacher}
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
              variant="outlined"
              sx={{ flex: 1, mr: 1 }}
              onClick={() => {
                setOpenCreateTeacherModal(false);
                formik.setValues({ subject: '', grade: '', teachers: '' });
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenCreateTeacherModal(false);
                formik.handleSubmit();
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
                teacher: false,
                grades: false,
                subjects: false,
                action: false,
              }
        }
        rowHeight={80}
      />
    </div>
  );
}
