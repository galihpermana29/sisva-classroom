"use client";

import {
  ArrowOutward,
  CheckBox,
  Download,
  Edit,
  Error,
  FileUploadOutlined,
  Folder,
} from "@mui/icons-material";
import { Button, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { useUploadFile } from "@/hooks/useUploadFile";
import RefreshIcon from "@mui/icons-material/Refresh";

export const FileUpload = ({ className, value, afterUpload, ...props }) => {
  const theme = useTheme();
  const [isView, setIsView] = useState(Boolean(value));
  const [file, setFile] = useState([]);
  const {
    mutate: upload,
    isPending,
    isError,
    isSuccess,
    isIdle,
  } = useUploadFile({
    onSettled: afterUpload,
  });

  const onInput = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    upload(formData);
    setFile(event.target.files[0]);
  };

  const color = isError ? "error" : isSuccess ? "primary" : "inherit";
  // probably need to think of a better way to do this
  const icon = isError ? (
    <Error />
  ) : isSuccess ? (
    <CheckBox />
  ) : isPending ? (
    <RefreshIcon className="animate-spin" />
  ) : (
    <Folder />
  );

  return (
    <div className="relative group">
      <input
        hidden
        aria-hidden
        type="file"
        disabled={isView}
        className="size-full absolute opacity-0 hover:cursor-pointer"
        onInput={onInput}
        {...props}
      />
      {!isView && (
        <>
          <div
            className={`flex items-center justify-center px-5 py-12 border border-dashed rounded hover:cursor-pointer border-gray-400 group-hover:border-gray-600 bg-gray-50 transition-colors text-gray-400 gap-1 text-sm font-light ${className}`}
          >
            <FileUploadOutlined /> Upload
          </div>
          {Boolean(file) && (
            <Button
              className="mt-2 flex items-center justify-between overflow-x-hidden w-full"
              fullWidth
              variant="outlined"
              color={color}
              startIcon={icon}
              sx={{
                color: isError || isSuccess ? undefined : "gray",
                borderColor: isError || isSuccess ? undefined : "lightgray",
              }}
            >
              <span className="text-left w-full">
                {isPending && "Mengunggah"}
                {isError && "Gagal:"}
                {isSuccess && "Terunggah:"}
                {isIdle && "Terpilih:"}
              </span>
              <span className="line-clamp-1 w-full text-right">
                {file?.name ?? "Belum ada"}
              </span>
            </Button>
          )}
        </>
      )}
      {isView && (
        <div className="flex items-center gap-2 w-full justify-between">
          <Button
            fullWidth
            LinkComponent={Link}
            href={value}
            target="_blank"
            variant="outlined"
            size="small"
            className="flex justify-between text-left w-full overflow-x-hidden"
            endIcon={<ArrowOutward />}
            startIcon={<Download />}
          >
            <span className="!line-clamp-1 text-left flex w-full">{value}</span>
          </Button>
          <IconButton
            color={theme.palette.primary.main}
            onClick={() => setIsView((prev) => !prev)}
          >
            <Edit />
          </IconButton>
        </div>
      )}
    </div>
  );
};
