"use client";

import { useMutation } from "@tanstack/react-query";

import FilesAPI from "@/api/files";

export const useUploadFile = ({ onSettled }) => {
  return useMutation({
    mutationKey: ["upload-file"],
    mutationFn: (formData) => FilesAPI.uploadimage(formData),
    onSettled,
  });
};
