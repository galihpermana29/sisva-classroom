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
                sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}
              >
                Nomor
              </Typography>
              <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                {params.value.data.id}
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
                Nama
              </Typography>

              <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                {params.value.data.name}
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
                Nominal
              </Typography>
              <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                {params.value.data.nominal}
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
                Target
              </Typography>

              <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                {params.value.data.target}
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
                Jumlah Pembayaran
              </Typography>
              <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                {params.value.data.payments}
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
                Tenggat Waktu
              </Typography>

              <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                {params.value.data.dueDate}
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
                alignItems:"center"
              }}
            >
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}
              >
                Status
              </Typography>
              <Typography sx={{ fontSize: 14, textAlign: "right" }}>
              <Chip sx={{width:120, backgroundColor:params.value.data.status==="Belum Selesai"? "warning.main":"", color:params.value.data.status==="Belum Selesai"? "white":""}} label={params.value.data.status} />
              </Typography>
            </Stack>
          </Stack>

          <ActionButton params={params} />
        </Stack>
      </Box>
      );
    },
  },
  { field: "id", headerName: "Nomor", flex: 1 },
  { field: "name", headerName: "Nama", flex: 1 },
  { field: "nominal", headerName: "Nominal", flex: 1 },
  { field: "target", headerName: "Target", flex: 1 },
  { field: "payments", headerName: "Jumlah Pembayaran", flex: 1 },
  { field: "dueDate", headerName: "Tenggat Waktu", flex: 1 },
  {
    field: "status",
    headerName: "Status",
    sortable: false,
    width: 120,
    renderCell: (params) => {
      return <Chip sx={{width:120, backgroundColor:params.value==="Belum Selesai"? "warning.main":"", color:params.value==="Belum Selesai"? "white":""}} label={params.value} />;
    },
  },
  {
    field: "action",
    headerName: "Aksi",
    sortable: false,
    renderCell: (params) => {
      return <ActionButton params={params} />;
    },
  },
];

function ChipList({ params }) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        flexWrap: "wrap",
        overflow: "hidden",
        m: "8px 0",
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
              m: { xs: "2px 4px 2px 0", lg: "2px" },
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
        // onClick={() => {
        //   params.value.setOpenEditModal(true);
        //   params.value.setActiveRow(params.value.data);
        //   params.value.formik.setValues({
        //     period_name: params.value.data.period_name,
        //     study_program: params.value.data.study_program,
        //     start_time: dayjs(params.value.data.start_time),
        //     end_time: dayjs(params.value.data.end_time),
        //     status: params.value.data.status,
        //   });
        // }}
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
      {/* <IconButton
        sx={{
          borderRadius: 2,
          ml: 1,
          backgroundColor: "warning.main",
          "&:hover": {
            backgroundColor: "warning.dark",
          },
          width: { xs: 90, lg: "fit-content" },
        }}
        // onClick={() => {
        //   params.value.setOpenDeleteModal(true);
        //   params.value.setActiveRow(params.value.data);
        // }}
      >
        <DeleteForeverRounded
          sx={{ color: "white", fontSize: { xs: 16, lg: 18 } }}
        />
        <Typography
          sx={{
            fontSize: 14,
            ml: 1,
            display: { xs: "flex", lg: "none" },
            color: "white",
          }}
        >
          Delete
        </Typography>
      </IconButton> */}
    </Stack>
  );
}

export default function DataTable({ data }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [activeRow, setActiveRow] = useState({});

  let rows = [];

  data.map((data) => {
    let tempObject = {
      id: data.id,
      name: data.name,
      target: data.target,
      nominal: data.nominal,
      payments: data.payments,
      dueDate: data.dueDate,
      status: data.status,
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
    <div style={{ height: "100%", width: "100%" }}>
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
              Hapus Karyawan
            </Typography>
          </Box>

          <Typography sx={{ mt: 1, fontSize: 14 }}>
            Anda akan menghapus karyawan berikut:
          </Typography>
          <Stack
            sx={{
              backgroundColor: "base.base20",
              p: 1,
              borderRadius: 2,
              flexDirection: "row",
              alignItems: "center",
              mt: 1,
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                width: "40px",
                height: "40px",
                position: "relative",
                mr: 1,
              }}
            >
              <Image
                alt="Web Image"
                fill
                sizes="100%"
                style={{ objectFit: "cover" }}
                src={activeRow.profile_image_uri}
              />
            </Avatar>
            <Stack justifyContent={"center"}>
              <Typography
                sx={{
                  color: "black",
                  fontWeight: 600,
                }}
              >
                {activeRow.name}
              </Typography>
              <Typography sx={{ fontSize: 14, lineHeight: "16px" }}>
                {activeRow.username}
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
            padding: 16px 0px;
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
                id: false,
                name: false,
                nominal: false,
                target: false,
                payments: false,
                dueDate: false,
                status: false,
                action: false,
              }
        }
      />
    </div>
  );
}
