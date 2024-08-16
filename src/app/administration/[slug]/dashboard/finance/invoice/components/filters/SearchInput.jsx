"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { useDebouncedValue } from "@mantine/hooks";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const SEARCH_FIELD_NAME = "cari";

export const SearchInput = ({ props, debounceTime = 500 }) => {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get(SEARCH_FIELD_NAME) ?? "";

  const [keyword, setKeyword] = useState(defaultValue);
  const [debouncedValue] = useDebouncedValue(keyword, debounceTime);

  const { updateQueryParam } = useQueryParam();

  useEffect(() => {
    updateQueryParam(SEARCH_FIELD_NAME, debouncedValue);
  }, [debouncedValue]);

  return (
    <>
      <TextField
        fullWidth
        size="small"
        className="max-w-none md:max-w-80 lg:max-w-[200px]"
        defaultValue={defaultValue}
        placeholder="Cari..."
        onChange={(event) => setKeyword(event.currentTarget.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </>
  );
};
