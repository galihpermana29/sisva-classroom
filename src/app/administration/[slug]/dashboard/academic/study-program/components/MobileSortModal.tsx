import {
  useAdministrationDispatch,
  useAdministrationSelector,
} from "@/app/administration/hooks";
import type { SortDirection } from "@/types/types";
import { Cancel } from "@mui/icons-material";
import {
  Button,
  MenuItem,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type {
  GradeSortField,
  StudentSortField,
  StudyProgramSortField,
} from "../utils/studyProgramSlice";

import {
  selectGradeSortField,
  selectSortDirection,
  selectStudentSortField,
  selectStudyProgramSortField,
  setGradeSortField,
  setSortDirection,
  setStudentSortField,
  setStudyProgramSortField,
} from "../utils/studyProgramSlice";

import { useCallback, useEffect, useState } from "react";

export default function MobileSortModal({
  activeTab,
  openSortModal,
  setOpenSortModal,
}) {
  const dispatch = useAdministrationDispatch();
  const studyProgramSortField = useAdministrationSelector(
    selectStudyProgramSortField
  );
  const gradeSortField = useAdministrationSelector(selectGradeSortField);
  const studentSortField = useAdministrationSelector(selectStudentSortField);
  const sortDirection = useAdministrationSelector(selectSortDirection);

  const getSortField = useCallback(() => {
    switch (activeTab) {
      case 0:
        return studyProgramSortField;
      case 1:
        return gradeSortField;
      case 2:
        return studentSortField;
      default:
        return "";
    }
  }, [activeTab, gradeSortField, studentSortField, studyProgramSortField]);

  const [sortFieldInput, setSortFieldInput] = useState<string>(getSortField());
  const [sortDirectionInput, setSortDirectionInput] = useState(sortDirection);

  function setSortField(sortField: string) {
    switch (activeTab) {
      case 0:
        dispatch(setStudyProgramSortField(sortField as StudyProgramSortField));
        break;
      case 1:
        dispatch(setGradeSortField(sortField as GradeSortField));
        break;
      case 2:
        dispatch(setStudentSortField(sortField as StudentSortField));
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setSortFieldInput(getSortField());
  }, [getSortField]);

  return (
    <Modal open={openSortModal} onClose={() => setOpenSortModal(false)}>
      <Stack
        component={Paper}
        elevation={2}
        sx={{
          padding: 2,
          borderRadius: 2,
          zIndex: 20,
          margin: "auto",
          position: "fixed",
          height: "fit-content",
          width: "240px",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <Typography fontWeight={600} fontSize={16}>
          Urutkan
        </Typography>
        <TextField
          select
          size="small"
          label="Data"
          value={sortFieldInput}
          onChange={(e) => setSortFieldInput(e.target.value)}
          sx={{ flex: 1, mt: 2 }}
          InputProps={{
            startAdornment: getSortField() && (
              <Cancel
                onClick={() => {
                  setSortFieldInput("");
                }}
                sx={{
                  fontSize: 14,
                  color: "base.base50",
                  cursor: "pointer",
                  transform: "translateX(-4px)",
                  "&:hover": {
                    color: "base.base60",
                  },
                }}
              />
            ),
          }}
        >
          {getSortOptions(activeTab).map((option) => (
            <MenuItem key={option.slug} value={option.slug}>
              <Typography fontSize={14}>{option.title}</Typography>
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Jenis Urutan"
          value={sortDirectionInput}
          disabled={!sortFieldInput}
          onChange={(e) =>
            setSortDirectionInput(e.target.value as SortDirection)
          }
          sx={{ flex: 1, mt: 2, mb: 2 }}
        >
          {[
            { title: "A-Z", slug: "ascending" },
            { title: "Z-A", slug: "descending" },
          ].map((option) => (
            <MenuItem key={option.slug} value={option.slug}>
              <Typography fontSize={14}>{option.title}</Typography>
            </MenuItem>
          ))}
        </TextField>
        <Stack
          sx={{
            flexDirection: "row",
          }}
        >
          <Button
            variant="outlined"
            sx={{ flex: 1, mr: 1 }}
            onClick={() => {
              setOpenSortModal(false);
            }}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            sx={{ flex: 1 }}
            onClick={() => {
              setSortField(sortFieldInput);
              dispatch(
                setSortDirection(
                  sortDirectionInput ? sortDirectionInput : "ascending"
                )
              );
              setOpenSortModal(false);
            }}
          >
            Simpan
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}

function getSortOptions(activeTab: number) {
  switch (activeTab) {
    case 0:
      return [
        { title: "Program Studi", slug: "name" },
        { title: "Kode", slug: "code" },
      ];
    case 1:
      return [
        { title: "Program Studi", slug: "name" },
        { title: "Kode", slug: "code" },
        { title: "Tingkatan", slug: "grade" },
      ];
    case 2:
      return [
        { title: "Nama", slug: "name" },
        { title: "Tingkatan", slug: "grade" },
      ];
    default:
      return [];
  }
}
