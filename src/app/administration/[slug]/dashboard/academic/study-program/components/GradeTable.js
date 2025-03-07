import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Image from "next/image";
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
} from "@mui/material";
import { BorderColorRounded, DeleteForeverRounded } from "@mui/icons-material";
import Link from "next/link";
import { types, permissions } from "@/globalcomponents/Variable";
import { useState } from "react";
import { FormAddGrade } from "./FormAddGrade";

const columns = [
  {
    field: "card",
    headerName: "",
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
                  sx={{ fontSize: 14, fontWeight: 600, minWidth: 110 }}
                >
                  Program Studi
                </Typography>
                <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                  {params.value.data.name}
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
                  sx={{ fontSize: 14, fontWeight: 600, minWidth: 110 }}
                >
                  Kode
                </Typography>
                <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                  {params.value.data.code}
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
                  backgroundColor: "base.base10",
                }}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, minWidth: 110 }}
                >
                  Tingkatan
                </Typography>
                <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                  {params.value.grade}
                </Typography>
              </Stack>
            </Stack>
            <ActionButton params={params} />
          </Stack>
        </Box>
      );
    },
  },
  { field: "name", headerName: "Program Studi", flex: 2 },
  { field: "code", headerName: "Kode", flex: 1 },
  { field: "grade", headerName: "Tingkatan", flex: 1 },
  {
    field: "action",
    headerName: "Aksi",
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
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        mt: { xs: 2, lg: 0 },
      }}
    >
      <IconButton
        sx={{
          borderRadius: 2,
          backgroundColor: "base.base30",
          "&:hover": {
            backgroundColor: "base.base40",
          },
          height: "fit-content",
          width: { xs: 90, lg: "fit-content" },
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log("hadeh");
          params.value.formik.setFieldValue("code", params.value.data.code);
          params.value.setOpenEditModal(true);
          params.value.setActiveRow(params.value.data);
        }}
      >
        <BorderColorRounded
          sx={{ fontSize: { xs: 15, lg: 18 }, color: "base.base50" }}
        />
        <Typography
          sx={{ fontSize: 14, ml: 1, display: { xs: "flex", lg: "none" } }}
        >
          Edit
        </Typography>
      </IconButton>
    </Stack>
  );
}

export default function GradeTable({ data, formik }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [activeRow, setActiveRow] = useState({});

  let rows = [];

  data.map((grade) => {
    let tempObject = {
      id: grade.id,
      name: grade.name,
      code: grade.code,
      grade: grade.grade,
      action: {
        data: grade,
        grade: grade.grade,
        setActiveRow: setActiveRow,
        setOpenEditModal: setOpenEditModal,
        setOpenDeleteModal: setOpenDeleteModal,
        formik: formik,
      },
      card: {
        data: grade,
        grade: grade.grade,
        setActiveRow: setActiveRow,
        setOpenEditModal: setOpenEditModal,
        setOpenDeleteModal: setOpenDeleteModal,
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
          formik.setValues({ code: "", grades: [] });
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
              Edit Tingkatan
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: "70vh", px: 2 }}>
            <FormAddGrade formik={formik} />
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
                formik.setValues({ grades: [], code: "", name: "" });
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenEditModal(false);
                formik.setValues({ grades: [], code: "", name: "" });
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
              Hapus Tingkatan
            </Typography>
          </Box>

          <Typography sx={{ mt: 1, fontSize: 14 }}>
            Anda akan menghapus tingkatan berikut:
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
                Tingkatan
              </Typography>
              <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                {activeRow.grade}
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
                Program Studi
              </Typography>
              <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                {activeRow.name}
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
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[10, 20, 50]}
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
                name: false,
                code: false,
                grade: false,
                action: false,
              }
        }
        rowHeight={80}
      />
    </div>
  );
}
