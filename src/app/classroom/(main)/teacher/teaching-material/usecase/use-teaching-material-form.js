import toast from "react-hot-toast";
import { generateRandomString } from "./custom-function";
import { useModal } from "../../class/[classId]/create-rpp/view/container/Provider/ModalProvider";
import {
  deleteTeachingMaterial,
  getTeachingMaterialById,
  patchTeachingMaterial,
  postTeachingMaterial,
  postUploadFile,
} from "../repository/teaching-material-service";
import { useState } from "react";

export const useTeachingMaterialForm = (setQueryFilter) => {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const { handleClose, modalState } = useModal();
  const [fileURI, setFileURI] = useState("");

  const handleCreateTeachingMaterial = async (value) => {
    const response = await postTeachingMaterial(value);
    if (response.success) {
      toast.success("Success create teaching material");
    } else {
      toast.error("Error create teaching material");
    }
  };

  const handleEditTeachingMaterial = async (value) => {
    const teachingMaterialId = modalState?.data?.id;
    const response = await patchTeachingMaterial(teachingMaterialId, value);
    if (response.success) {
      toast.success("Success update teaching material");
    } else {
      toast.error("Error update teaching material");
    }
  };

  const handleDeleteTeachingMaterial = async () => {
    setIsLoadingForm(true);
    const teachingMaterialId = modalState?.data?.id;
    const response = await deleteTeachingMaterial(teachingMaterialId);
    if (response.success) {
      toast.success("Success delete teaching material");
    } else {
      toast.error("Error delete teaching material");
    }
    setQueryFilter((prev) => ({
      ...prev,
      tag: generateRandomString(),
    }));
    setIsLoadingForm(false);
    handleClose();
  };

  const handleUploadFile = async (file) => {
    if (!file) {
      setFileURI("");

      return;
    }
    setIsLoadingForm(true);

    const formData = new FormData();
    formData.append("file", file);

    const response = await postUploadFile(formData);

    if (response.success) {
      toast.success("Success upload file");
      setFileURI(response.data);
    } else {
      toast.error("Error upload file");
    }
    setIsLoadingForm(false);

    if (response.success) {
      return response.data;
    }
  };

  const handleSubmitForm = (value) => {
    setIsLoadingForm(true);

    const payload = {
      description: value.description,
      subject_id: value.subject_id,
      grade: value.grade,
      attachment_file_uri: fileURI,
    };
    if (modalState?.type === "create-teaching-material") {
      handleCreateTeachingMaterial(payload);
    } else if (modalState?.type === "edit-teaching-material") {
      handleEditTeachingMaterial(payload);
    }
    setQueryFilter((prev) => ({
      ...prev,
      tag: generateRandomString(),
    }));
    handleClose();
    setIsLoadingForm(false);
  };

  return {
    isLoadingForm,
    handleCreateTeachingMaterial,
    handleEditTeachingMaterial,
    handleDeleteTeachingMaterial,
    handleUploadFile,
    handleSubmitForm,
    fileURI,
    setFileURI,
  };
};
