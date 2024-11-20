import {
  useAdministrationDispatch,
  useAdministrationSelector,
} from "@/app/administration/hooks";
import type { SortDirection } from "@/globalcomponents/types";
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
import { useState } from "react";
import type { SortField } from "../utils/studentProfileSlice";
import {
  selectSortDirection,
  selectSortField,
  setSortDirection,
  setSortField,
} from "../utils/studentProfileSlice";

export default function MobileSortModal({ openSortModal, setOpenSortModal }) {
  const dispatch = useAdministrationDispatch();
  const sortField = useAdministrationSelector(selectSortField);
  const sortDirection = useAdministrationSelector(selectSortDirection);

  const [sortFieldInput, setSortFieldInput] = useState<SortField>(sortField);
  const [sortDirectionInput, setSortDirectionInput] =
    useState<SortDirection>(sortDirection);

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
          onChange={(e) => setSortFieldInput(e.target.value as SortField)}
          sx={{ flex: 1, mt: 2 }}
          InputProps={{
            startAdornment: sortFieldInput && (
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
          {[
            { title: "Nama", slug: "name" },
            { title: "Username", slug: "username" },
          ].map((option) => (
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
              dispatch(setSortField(sortFieldInput));
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
