import { postUploadFile } from "@/app/classroom/(main)/teacher/teaching-material/repository/teaching-material-service";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { putUpdateTask } from "../../../../create-rpp/repository/create-rpp-service";
import { useModal } from "../../../../create-rpp/view/container/Provider/ModalProvider";

export const useTasksAssignment = () => {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const { handleClose, modalState } = useModal();
  const [fileURI, setFileURI] = useState("");
  const { classId } = useParams();

  const handleEditTask = async (value) => {
    const taskId = modalState?.data?.id;
    const response = await putUpdateTask(taskId, value);
    if (response.success) {
      toast.success("Success update task");
    } else {
      toast.error("Error update task");
    }
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

  const handleSubmitForm = async (value) => {
    setIsLoadingForm(true);

    const taskPayload = {
      class_id: parseInt(classId),
      name: value.name,
      description: value.description,
      deadline: dayjs(value.deadline).format("DD/MM/YYYY h:mm A Z"),
      allow_submission: value.allow_submission,
      allow_overdue_submission: value.allow_overdue_submission,
      attachment_file_uri: fileURI,
    };

    await handleEditTask(taskPayload);

    handleClose();
    setIsLoadingForm(false);
  };

  return {
    isLoadingForm,
    handleUploadFile,
    handleSubmitForm,
    fileURI,
    setFileURI,
  };
};
