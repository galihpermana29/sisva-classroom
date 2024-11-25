import { useDebouncedCallback } from "@mantine/hooks";
import { Cancel, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useRef } from "react";

import {
  useAdministrationDispatch,
  useAdministrationSelector,
} from "@/app/administration/hooks";

import {
  selectCurriculumSearchText,
  selectGradeSearchText,
  selectSubjectSearchText,
  setCurriculumSearchText,
  setGradeSearchText,
  setSubjectSearchText,
} from "../utils/curriculumSlice";

export default function SearchFilter({ activeTab }: { activeTab: number }) {
  const inputTextRef = useRef<HTMLInputElement>();
  const dispatch = useAdministrationDispatch();
  const curriculumSearchText = useAdministrationSelector(
    selectCurriculumSearchText
  );
  const subjectSearchText = useAdministrationSelector(selectSubjectSearchText);
  const gradeSearchText = useAdministrationSelector(selectGradeSearchText);
  const debouncedSetSearchText = useDebouncedCallback(setSearchText, 250);

  function setSearchText(searchText: string) {
    switch (activeTab) {
      case 0:
        return dispatch(setCurriculumSearchText(searchText));
      case 1:
        return dispatch(setSubjectSearchText(searchText));
      case 2:
        return dispatch(setGradeSearchText(searchText));
      default:
        return;
    }
  }

  function getSearchText() {
    switch (activeTab) {
      case 0:
        return curriculumSearchText;
      case 1:
        return subjectSearchText;
      case 2:
        return gradeSearchText;
    }
  }

  function getPlaceholder() {
    switch (activeTab) {
      case 0:
        return "Cari Kurikulum";
      case 1:
        return "Cari Mata Pelajaran";
      case 2:
        return "Cari Tingkatan";
      default:
        return "";
    }
  }

  return (
    <TextField
      inputRef={inputTextRef}
      key={activeTab}
      placeholder={getPlaceholder()}
      size="small"
      type="text"
      sx={{
        maxWidth: { xs: "100%", lg: "200px" },
        flex: 1,
        width: "100%",
        height: "100%",
        pr: 1,
      }}
      defaultValue={getSearchText()}
      onChange={(e) => debouncedSetSearchText(e.target.value)}
      InputProps={{
        startAdornment: getSearchText() && (
          <Cancel
            onClick={() => {
              inputTextRef.current.value = "";
              debouncedSetSearchText("");
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
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
}
