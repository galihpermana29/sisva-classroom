import { BorderColorRounded, DeleteForeverRounded } from "@mui/icons-material";
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
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Image from "next/image";
import { useState } from "react";

import { useSchool } from "@/app/administration/[slug]/SchoolContext";
import { targets, types } from "@/globalcomponents/Variable";

import { FormAddAnnouncement } from "./FormAddAnnouncement";

function getColumns(schoolId) {
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
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                flex={1}
              >
                <Stack direction={"row"} alignItems={"center"}>
                  <Box
                    sx={{
                      minWidth: "60px",
                      height: "60px",
                      borderRadius: 2,
                      overflow: "hidden",
                      position: "relative",
                      mr: 1,
                    }}
                  >
                    <Image
                      alt="Web Image"
                      fill
                      sizes="100%"
                      style={{ objectFit: "cover" }}
                      src={`https://api-staging.sisva.id/file/v1/files/${params.value.data.image_uri}?school_id=${schoolId}`}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "black",
                    }}
                  >
                    {params.value.data.name}
                  </Typography>
                </Stack>
              </Stack>

              <Typography sx={{ fontSize: 14, lineHeight: "14px", mt: 2 }}>
                {params.value.data.description}
              </Typography>
              <Stack sx={{ flexDirection: "row", mt: 2 }}>
                <Stack sx={{ flex: 1 }}>
                  <Typography sx={{ color: "base.base50", fontSize: 12 }}>
                    Target
                  </Typography>
                  <Typography sx={{ fontSize: 14, lineHeight: "14px" }}>
                    {params.value.data.target}
                  </Typography>
                </Stack>
                <Stack sx={{ flex: 1, textAlign: "right" }}>
                  <Typography sx={{ color: "base.base50", fontSize: 12 }}>
                    Tanggal Post
                  </Typography>
                  <Typography sx={{ fontSize: 14, lineHeight: "14px" }}>
                    {params.value.data.datePosted}
                  </Typography>
                </Stack>
              </Stack>

              <ActionButton params={params} />
            </Stack>
          </Box>
        );
      },
    },
    {
      field: "image_uri",
      headerName: "",
      sortable: false,
      width: 110,
      renderCell: (params) => (
        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "red",
            my: 1.5,
            ml: 2,
            position: "relative",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Image
            alt="Web Image"
            fill
            sizes="100%"
            style={{ objectFit: "cover" }}
            src={`https://api-staging.sisva.id/file/v1/files/${params.value}?school_id=${schoolId}`}
          />
        </Box>
      ),
    },
    { field: "name", headerName: "Judul", flex: 0.6 },
    { field: "description", headerName: "Deskripsi", flex: 1 },
    {
      field: "target",
      headerName: "Target",
      width: 140,
      renderCell: (params) => {
        return <ChipList params={params.row.target} />;
      },
    },
    { field: "datePosted", headerName: "Tanggal Post", flex: 0.5 },
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

  return columns;
}

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
      {params.map((target, index) => {
        let tempTarget;
        targets.map((item) => {
          if (item.slug === target) {
            tempTarget = item.title;
          }
        });
        return (
          <Chip
            key={index}
            sx={{
              m: { xs: "2px 4px 2px 0", lg: "2px" },
              fontSize: 12,
            }}
            label={tempTarget}
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
        alignSelf: { xs: "flex-end", lg: "center" },
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
        onClick={() => {
          params.value.setOpenEditModal(true);
          params.value.setActiveRow(params.value.data);
          params.value.formik.setValues({
            id: params.value.data.id,
            title: params.value.data.name,
            text: params.value.data.description,
            target_user_types: params.value.data.target,
            image_uri: params.value.data.image_uri,
          });
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
      <IconButton
        sx={{
          borderRadius: 2,
          ml: 1,
          backgroundColor: "warning.main",
          "&:hover": {
            backgroundColor: "warning.dark",
          },
          width: { xs: 90, lg: "fit-content" },
        }}
        onClick={() => {
          params.value.setOpenDeleteModal(true);
          params.value.setActiveRow(params.value.data);
        }}
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
      </IconButton>
    </Stack>
  );
}

export default function DataTable({
  formik,
  data,
  deleteInfo = () => {},
  handleFileChange = () => {},
}) {
  const school = useSchool();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [activeRow, setActiveRow] = useState({});

  let rows = [];

  data.map((data) => {
    let tempObject = {
      id: data.id,
      name: data.name,
      description: data.description,
      target: data.target,
      datePosted: data.datePosted,
      image_uri: data.image_uri,
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
          setOpenEditModal(false), formik.setValues({});
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
              Edit Pengumuman
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: "70vh", overflowY: "auto", px: 2 }}>
            <FormAddAnnouncement
              formik={formik}
              handleFileChange={handleFileChange}
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
                formik.setValues({});
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
              Edit
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
              Hapus Pengumuman
            </Typography>
          </Box>

          <Typography sx={{ mt: 1, fontSize: 14 }}>
            Anda akan menghapus pengumuman:
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
                src={`https://api-staging.sisva.id/file/v1/files/${activeRow.image_uri}?school_id=${school.id}`}
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
                deleteInfo(activeRow.id);
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
            padding: 16px;
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
        columns={getColumns(school.id)}
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
                image_uri: false,
                name: false,
                description: false,
                target: false,
                datePosted: false,
                action: false,
              }
        }
      />
    </div>
  );
}
