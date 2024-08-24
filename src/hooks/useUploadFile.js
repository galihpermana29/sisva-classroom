"use client";

import FilesAPI from "@/api/files";
import { useMutation } from "@tanstack/react-query";

export const useUploadFile = ({ onSettled }) => {
  return useMutation({
    mutationKey: ["upload-file"],
    mutationFn: (formData) => FilesAPI.uploadimage(formData),
    onSettled,
  });
};
