"use client";

import { Alert, Snackbar, TextField } from "@mui/material";
import { useChangeSKS } from "../hooks/useChangeSKS";
import { useDebouncedCallback } from "@mantine/hooks";
import { useGetSKS } from "../hooks/useGetSKS";
import { useState } from "react";

export const BobotSKSInput = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { data, isPending: isLoadingSKS } = useGetSKS();
  const { mutate, isSuccess, isError, isPending } = useChangeSKS();

  const handleChange = useDebouncedCallback((event) => {
    const value = event?.target.value;
    if (!value) return;

    const payload = { duration_minutes: parseInt(value) };
    mutate(payload);
    setIsSnackbarOpen(true);
  }, 500);

  const handleClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <>
      <TextField
        disabled={isLoadingSKS}
        defaultValue={data ? data.duration_minutes : undefined}
        onChange={handleChange}
        sx={{ borderRadius: 4, width: "4em" }}
        variant="outlined"
        size="small"
      />
      <Snackbar
        open={!isPending && isSnackbarOpen}
        onClose={handleClose}
        autoHideDuration={2000}
      >
        <Alert
          variant="filled"
          severity={isSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {isSuccess && "Berhasil mengubah bobot SKS!"}
          {isError && "Gagal mengubah bobot SKS!"}
        </Alert>
      </Snackbar>
    </>
  );
};
