"use client";

import { useDebouncedCallback } from "@mantine/hooks";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";

import { useInvoiceFilters } from "../../hooks/useInvoiceFilters";

/** Use this field name to get or modify search filter value elsewhere */
export const SEARCH_FIELD_NAME = "cari";

export const SearchInput = ({ props, debounceTime = 500 }) => {
  const { updateFilters } = useInvoiceFilters();

  const searchParams = useSearchParams();
  const defaultValue = searchParams.get(SEARCH_FIELD_NAME) ?? "";

  const handleChange = useDebouncedCallback(
    (event) => updateFilters(SEARCH_FIELD_NAME, event.target.value),
    debounceTime
  );

  return (
    <>
      <TextField
        fullWidth
        size="small"
        className="max-w-none md:max-w-80 lg:max-w-[200px]"
        defaultValue={defaultValue}
        placeholder="Cari..."
        onChange={handleChange}
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
