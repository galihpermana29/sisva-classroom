import { BorderColorRounded, DeleteForeverRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
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

import { FormAddStudent } from "./FormAddStudent";

function getColumns(school) {
  return [
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
                  direction={"row"}
                  justifyContent={"space-between"}
                  flex={1}
                >
                  <Stack direction={"row"} alignItems={"center"}>
                    <Avatar
                      sx={{
                        width: "40px",
                        height: "40px",
                        position: "relative",
                        mr: 1,
                      }}
                    >
                      {params.value.data.profile_image_uri && (
                        <Image
                          alt="Web Image"
                          fill
                          sizes="100%"
                          style={{ objectFit: "cover" }}
                          src={`https://api-staging.sisva.id/file/v1/files/${params.value.data.profile_image_uri}?school_id=${school.id}`}
                        />
                      )}
                    </Avatar>
                    <Typography
                      sx={{
                        color: "black",
                      }}
                    >
                      {params.value.data.name}
                    </Typography>
                  </Stack>
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
                    Program Studi
                  </Typography>
                  <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                    {params.value.data.study_program}
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
                    sx={{ fontSize: 14, fontWeight: 600, minWidth: 130 }}
                  >
                    Tingkatan
                  </Typography>
                  <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                    {params.value.data.grade}
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
      field: "profile_image_uri",
      headerName: "",
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <Avatar
          sx={{
            width: 40,
            height: 40,
            my: 1.5,
            ml: 2,
            position: "relative",
            display: "flex",
          }}
        >
          {params.value[0] !== "" ? (
            <Image
              alt="Web Image"
              fill
              sizes="100%"
              style={{ objectFit: "cover" }}
              src={`https://api-staging.sisva.id/file/v1/files/${params.value[0]}?school_id=${school.id}`}
            />
          ) : (
            params.value[1].toUpperCase().slice(0, 1)
          )}
        </Avatar>
      ),
    },
    { field: "name", headerName: "Nama", flex: 1 },
    { field: "study_program", headerName: "Program Studi", flex: 1 },
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
}

function ActionButton({ params }) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
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
            student: params.value.data.id,
            student_name: params.value.data.name,
            study_program_name: params.value.data.study_program,
            study_program: params.value.data.study_program_id,
            grade: params.value.data.grade,
            detail: params.value.data.detail,
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

export default function StudentTable({
  data,
  formik,
  tableData,
  studentList,
  deleteStudent,
}) {
  const school = useSchool();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [activeRow, setActiveRow] = useState({});

  const columns = getColumns(school);

  let rows = [];

  data.map((data) => {
    let tempObject = {
      id: data.id,
      name: data.name,
      study_program: data.study_program,
      grade: data.grade,
      profile_image_uri: [data.profile_image_uri, data.name],
      detail: data.detail,

      action: {
        data: data,
        setActiveRow: setActiveRow,
        setOpenEditModal: setOpenEditModal,
        setOpenDeleteModal: setOpenDeleteModal,
        formik: formik,
      },
      card: {
        data: data,
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
              Edit Siswa
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: "70vh", overflowY: "auto", px: 2 }}>
            <FormAddStudent
              formik={formik}
              tableData={tableData}
              studentList={studentList}
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
                formik.setFieldValue("id", activeRow.id);
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
              Hapus Program Studi
            </Typography>
          </Box>

          <Typography sx={{ mt: 1, fontSize: 14 }}>
            Anda akan menghapus program studi berikut:
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
                Program Studi
              </Typography>
              <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                {activeRow.name}
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
                Program Study
              </Typography>
              <Typography sx={{ fontSize: 14, textAlign: "right" }}>
                {activeRow.study_program}
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
                deleteStudent(activeRow.id, activeRow.detail);
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
                profile_image_uri: false,
                name: false,
                username: false,
                type: false,
                permissions: false,
                action: false,
                study_program: false,
                grade: false,
              }
        }
      />
    </div>
  );
}
