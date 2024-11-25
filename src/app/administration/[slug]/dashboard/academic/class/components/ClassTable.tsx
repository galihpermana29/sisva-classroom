import type { Theme } from "@mui/material";
import {
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

import ActionButtons from "./ActionButtons";
import { FormAddStudentGroup } from "./FormAddStudentGroup";

const columns = [
  {
    field: "card",
    headerName: "",
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      return (
        <Box sx={{ width: "100%", mx: 2, py: 0.5 }}>
          <Stack
            component={Paper}
            variant="outlined"
            sx={{
              justifyContent: "flex-start",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Stack sx={{ width: "100%" }}>
              <Stack
                sx={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgb(0,0,0,0.12)",
                  px: 1,
                  py: "10px",
                  backgroundColor: "base.base10",
                }}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}
                >
                  Tingkatan
                </Typography>
                <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                  {params.value.data.grade}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgb(0,0,0,0.12)",
                  px: 1,
                  py: "10px",
                  backgroundColor: "base.base20",
                }}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}
                >
                  Kelas
                </Typography>

                <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                  {params.value.data.class}
                </Typography>
                {/* <ChipList params={params.value.data.study_program} /> */}
              </Stack>
              <Stack
                sx={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgb(0,0,0,0.12)",
                  px: 1,
                  py: "10px",
                  backgroundColor: "base.base10",
                }}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}
                >
                  Wali Kelas
                </Typography>
                <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                  {params.value.data.guardian}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgb(0,0,0,0.12)",
                  px: 1,
                  py: "10px",
                  backgroundColor: "base.base20",
                }}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}
                >
                  Jumlah Murid
                </Typography>

                <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                  {params.value.data.students}
                </Typography>
                {/* <ChipList params={params.value.data.study_program} /> */}
              </Stack>
            </Stack>

            <ActionButtons params={params} />
          </Stack>
        </Box>
      );
    },
  },
  {
    field: "grade",
    headerName: "Tingkatan",
    flex: 0.5,
  },
  {
    field: "class",
    headerName: "Kelas",
    flex: 1,
  },
  {
    field: "guardian",
    headerName: "Wali Kelas",
    flex: 1,
  },
  {
    field: "students",
    headerName: "Jumlah Murid",
    flex: 1,
  },
  {
    field: "action",
    headerName: "Aksi",
    sortable: false,
    width: 120,
    renderCell: (params) => {
      return <ActionButtons params={params} />;
    },
  },
];

export default function ClassTable({
  data,
  formik,
  periodList,
  teacherList,
  studyProgramList,
  removeStudentGroup,
}) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("lg")
  );

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [activeRow, setActiveRow] = useState<any>({});

  let rows = [];

  data.map((data) => {
    let tempObject = {
      id: data.id,
      grade: data.grade,
      class: data.class,
      guardian: data.guardian,
      students: data.students,

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
    <div style={{ height: "100%", width: "100%" }}>
      <Modal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          formik.setValues({});
        }}
      >
        <Stack
          component={Paper}
          elevation={2}
          sx={{
            borderRadius: 2,
            zIndex: 20,
            margin: "auto",
            position: "fixed",
            height: "fit-content",
            width: "360px",
            maxWidth: "80%",
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
              Edit Kelas Wajib
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: "70vh", overflowY: "auto", px: 2 }}>
            <FormAddStudentGroup
              formik={formik}
              teacherList={teacherList}
              periodList={periodList}
              studyProgramList={studyProgramList}
              editing={true}
            />
          </Box>
          <Divider />
          <Stack
            sx={{
              flexDirection: "row",
              p: 2,
            }}
          >
            <Button
              variant="outlined"
              sx={{ flex: 1, mr: 1 }}
              onClick={() => {
                setOpenEditModal(false);
                formik.setValues({ name: "", code: "" });
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
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
            margin: "auto",
            position: "fixed",
            height: "fit-content",
            width: "360px",
            maxWidth: "80%",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            p: 2,
          }}
        >
          <Box>
            <Typography fontWeight={600} fontSize={16}>
              Hapus Kelas Wajib
            </Typography>
          </Box>

          <Typography sx={{ mt: 1, fontSize: 14 }}>
            Anda akan menghapus kelas wajib berikut:
          </Typography>
          <Stack
            sx={{ width: "100%", my: 1, overflow: "hidden", borderRadius: 2 }}
          >
            <Stack
              sx={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottom: "1px solid rgb(0,0,0,0.12)",
                px: 1,
                py: "10px",
                backgroundColor: "base.base10",
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}>
                Kelas
              </Typography>
              <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                {activeRow.class}
              </Typography>
            </Stack>
            <Stack
              sx={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottom: "1px solid rgb(0,0,0,0.12)",
                px: 1,
                py: "10px",
                backgroundColor: "base.base20",
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}>
                Wali Kelas
              </Typography>
              <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                {activeRow.guardian}
              </Typography>
            </Stack>
            <Stack
              sx={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottom: "1px solid rgb(0,0,0,0.12)",
                px: 1,
                py: "10px",
                backgroundColor: "base.base20",
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}>
                Tingkatan
              </Typography>
              <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                {activeRow.grade}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            sx={{
              flexDirection: "row",
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
                backgroundColor: "warning.main",
                "&:hover": {
                  backgroundColor: "warning.dark",
                },
              }}
              onClick={() => {
                removeStudentGroup(activeRow.id);

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
        getRowHeight={() => "auto"}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
        }}
        pageSizeOptions={[20, 50, 100]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
        }
        disableRowSelectionOnClick
        disableColumnMenu
        columnVisibilityModel={
          !isMobile
            ? {
                card: false,
              }
            : {
                grade: false,
                class: false,
                guardian: false,
                students: false,
                action: false,
              }
        }
        rowHeight={80}
      />
    </div>
  );
}
