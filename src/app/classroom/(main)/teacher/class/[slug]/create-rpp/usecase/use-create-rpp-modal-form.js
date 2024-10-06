import { useState } from "react";
import { useModal } from "../view/container/Provider/ModalProvider";
import {
  patchTeachingMaterial,
  postTeachingMaterial,
  postUploadFile,
} from "../../../../teaching-material/repository/teaching-material-service";
import { useDispatch, useSelector } from "react-redux";
import {
  addMaterial,
  addMultipleMaterial,
  deleteMaterial,
  editMaterial,
} from "@/app/classroom/shared/redux/teachingMaterialSlice";
import toast from "react-hot-toast";
import {
  deleteRpp,
  postCreateTask,
  putUpdateTask,
} from "../repository/create-rpp-service";
import {
  addTask,
  deleteTask,
  editTask,
} from "@/app/classroom/shared/redux/taskSlice";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

export const useCreateRppModalForm = () => {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const { handleClose, modalState } = useModal();
  const [fileURI, setFileURI] = useState("");
  const { slug } = useParams();

  const materials = useSelector((state) => state.teachingMaterials.materials);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleCreateTeachingMaterial = async (value) => {
    const response = await postTeachingMaterial(value);
    if (response.success) {
      toast.success("Success create teaching material");
      dispatch(
        addMaterial({
          ...value,
          id: response.data,
        })
      );
    } else {
      toast.error("Error create teaching material");
    }
  };

  const handleEditTeachingMaterial = async (value) => {
    const teachingMaterialId = modalState?.data?.id;
    const response = await patchTeachingMaterial(teachingMaterialId, value);
    if (response.success) {
      toast.success("Success update teaching material");
      dispatch(
        editMaterial({
          id: teachingMaterialId,
          ...value,
        })
      );
    } else {
      toast.error("Error update teaching material");
    }
  };

  const handleDeleteTeachingMaterial = async () => {
    setIsLoadingForm(true);
    const teachingMaterialId = modalState?.data?.id;
    dispatch(deleteMaterial(teachingMaterialId));
    setIsLoadingForm(false);
    handleClose();
  };

  const handleCreateTask = async (value) => {
    const response = await postCreateTask(value);
    if (response.success) {
      toast.success("Success create task");
      dispatch(
        addTask({
          ...value,
          id: response.data,
        })
      );
    } else {
      toast.error("Error create task");
    }
  };

  const handleEditTask = async (value) => {
    const taskId = modalState?.data?.id;
    const response = await putUpdateTask(taskId, value);
    if (response.success) {
      toast.success("Success update task");
      dispatch(
        editTask({
          id: taskId,
          ...value,
        })
      );
    } else {
      toast.error("Error update task");
    }
  };

  const handleDeleteTask = async () => {
    setIsLoadingForm(true);
    const taskId = modalState?.data?.id;
    dispatch(deleteTask(taskId));
    setIsLoadingForm(false);
    handleClose();
  };

  const handleUploadFile = async (file) => {
    if (!file) {
      setFileURI(null);
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
  };

  const handleSubmitForm = async (value) => {
    setIsLoadingForm(true);

    const teachingMaterialPayload = {
      description: value.description,
      subject_id: value.subject_id,
      grade: value.grade,
      attachment_file_uri: fileURI,
    };

    const taskPayload = {
      class_id: parseInt(slug),
      name: value.name,
      description: value.description,
      deadline: dayjs(value.deadline).format("DD/MM/YYYY h:mm A Z"),
      allow_submission: value.allow_submission,
      allow_overdue_submission: value.allow_overdue_submission,
      attachment_file_uri: fileURI,
    };

    if (modalState?.type === "create-teaching-material") {
      await handleCreateTeachingMaterial(teachingMaterialPayload);
    } else if (modalState?.type === "edit-teaching-material") {
      await handleEditTeachingMaterial(teachingMaterialPayload);
    } else if (modalState?.type === "create-task") {
      await handleCreateTask(taskPayload);
    } else if (modalState?.type === "edit-task") {
      await handleEditTask(taskPayload);
    }

    handleClose();
    setIsLoadingForm(false);
  };

  const handleDeleteRow = () => {
    if (modalState?.type === "delete-teaching-material") {
      handleDeleteTeachingMaterial();
    } else if (modalState?.type === "delete-task") {
      handleDeleteTask();
    }
  };

  const handleAddFromExistingTeachingMaterial = (value) => {
    dispatch(addMultipleMaterial(value));
    toast.success("Success add teaching material");
    handleClose();
  };

  return {
    isLoadingForm,
    handleDeleteRow,
    handleDeleteTask,
    handleUploadFile,
    handleSubmitForm,
    fileURI,
    materials,
    tasks,
    handleAddFromExistingTeachingMaterial,
  };
};
