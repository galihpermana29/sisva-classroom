import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteRpp } from "../create-rpp/repository/create-rpp-service";
import { useModal } from "../create-rpp/view/container/Provider/ModalProvider";

export const useDeleteRpp = (id) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { handleClose } = useModal();
  const router = useRouter();
  const { classId } = useParams();
  const handleDeleteRpp = async () => {
    setLoadingDelete(true);

    const response = await deleteRpp(id);
    if (response.success) {
      toast.success("Success delete rpp");
      handleClose();
      window.location.href = `/classroom/teacher/class/${classId}`;
    } else {
      toast.error("Error delete rpp");
    }
    setLoadingDelete(false);
  };

  return {
    handleDeleteRpp,
    loadingDelete,
  };
};
