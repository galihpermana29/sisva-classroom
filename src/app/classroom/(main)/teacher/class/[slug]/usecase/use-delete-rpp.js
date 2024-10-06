import { useState } from "react";
import { deleteRpp } from "../create-rpp/repository/create-rpp-service";
import toast from "react-hot-toast";
import { useModal } from "../create-rpp/view/container/Provider/ModalProvider";
import { useParams, useRouter } from "next/navigation";

export const useDeleteRpp = (id) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { handleClose } = useModal();
  const router = useRouter();
  const { slug } = useParams();
  const handleDeleteRpp = async () => {
    setLoadingDelete(true);

    const response = await deleteRpp(id);
    if (response.success) {
      toast.success("Success delete rpp");
      handleClose();
      router.push(`/classroom/teacher/class/${slug}`);
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
