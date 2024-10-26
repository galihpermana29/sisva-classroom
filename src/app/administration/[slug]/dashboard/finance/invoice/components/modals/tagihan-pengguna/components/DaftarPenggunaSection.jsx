import { CustomTable, TableEmptyState } from "@/components/CustomTable";
import { Search } from "@mui/icons-material";
import { Stack, TextField, Typography } from "@mui/material";
import { useGetUsersData } from "../hooks/useGetUsersData";
import { useModalPagination } from "../hooks/useModalPagination";
import { ModalSiswaFilter } from "../modal-filters/ModalSiswaFilter";
import { DaftarPenggunaSiswaTableBody } from "./DaftarPenggunaSiswaTableBody";
import { DaftarPenggunaStaffTableBody } from "./DaftarPenggunaStaffTableBody";
import { ModalPagination } from "./ModalPagination";

export const DaftarPenggunaSection = ({
  target,
  tagihanId,
  userFilter,
  setUserFilter,
  selectedUsers,
  setSelectedUsers,
  setBundledUsers,
}) => {
  const { currentPage, setPage } = useModalPagination({ target });
  const targetIsSiswa = target === "student";
  const targetIsStaff = target === "staff";
  const shouldFetchStaffs = targetIsStaff;
  const shouldFetchStudents = targetIsSiswa;

  const onSearch = (event) =>
    setUserFilter((prev) => ({ ...prev, search: event.target.value }));

  const {
    staffs: staffData,
    staffIsLoading,
    students: studentsData,
    studentsIsLoading,
    totalPage,
  } = useGetUsersData({
    page: currentPage,
    userFilter,
    shouldFetchStaffs,
    shouldFetchStudents,
  });

  const tableBodies = {
    staff: (
      <DaftarPenggunaStaffTableBody
        data={staffData}
        tagihanId={tagihanId}
        isLoading={staffIsLoading}
        selected={selectedUsers}
        setSelect={setSelectedUsers}
        setBundledUsers={setBundledUsers}
      />
    ),
    student: (
      <DaftarPenggunaSiswaTableBody
        data={studentsData}
        tagihanId={tagihanId}
        isLoading={studentsIsLoading}
        selected={selectedUsers}
        setSelect={setSelectedUsers}
        setBundledUsers={setBundledUsers}
      />
    ),
  };

  return (
    <Stack gap={1}>
      <Stack
        alignItems={targetIsStaff && { xs: "auto", md: "end" }}
        justifyContent={targetIsStaff && { xs: "auto", md: "space-between" }}
        flexDirection={targetIsStaff && { xs: "auto", md: "row" }}
        width="100%"
        gap={1}
      >
        <Typography
          fontSize="1em"
          fontWeight={600}
        >
          Daftar Pengguna
        </Typography>
        <Stack
          flexDirection={{ md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={{ xs: 1.5, md: 3 }}
        >
          <TextField
            size="small"
            fullWidth
            sx={{ maxWidth: { md: "14rem" } }}
            InputProps={{ endAdornment: <Search /> }}
            onChange={onSearch}
          />
          {targetIsSiswa && (
            <ModalSiswaFilter
              filters={userFilter}
              setFilters={setUserFilter}
            />
          )}
        </Stack>
      </Stack>
      <Stack gap={2}>
        <DaftarPenggunaTable
          type={target}
          tableBodies={tableBodies}
          currentPage={currentPage}
          setPage={setPage}
          totalPage={totalPage}
        />
      </Stack>
    </Stack>
  );
};

const DaftarPenggunaTable = ({
  type,
  tableBodies,
  currentPage,
  setPage,
  totalPage,
}) => {
  const columns = ["Pilih", "Nama", "Target"];
  const tableBody = tableBodies[type] ?? (
    <TableEmptyState columnCount={columns.length} />
  );

  return (
    <>
      <CustomTable
        minWidth={240}
        columns={columns}
        body={tableBody}
      />
      <ModalPagination
        page={currentPage}
        totalPage={totalPage}
        setPage={setPage}
      />
    </>
  );
};
