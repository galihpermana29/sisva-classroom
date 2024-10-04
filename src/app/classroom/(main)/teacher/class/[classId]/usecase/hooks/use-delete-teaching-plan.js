import { useEffect, useState } from "react";
import { deleteTeachingPlan } from "../../repository/class-detail-service";
import toast from "react-hot-toast";

export const useDeleteTeachingPlan = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTeachingPlan = async (id) => {
    setIsDeleting(true);
    setIsModalVisible(false);

    const response = await deleteTeachingPlan(id);

    if (!response.success) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
    }

    setIsDeleting(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
    setIsPopupVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOpenPopup = (newOpen) => {
    setIsPopupVisible(newOpen);
  };

  return {
    isPopupVisible,
    isDeleting,
    isModalVisible,
    handleOpenPopup,
    handleOpenModal,
    handleDeleteTeachingPlan,
    handleCancel,
  };
};
