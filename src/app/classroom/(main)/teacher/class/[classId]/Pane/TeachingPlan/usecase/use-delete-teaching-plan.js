import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import { deleteTeachingPlan } from "../repository/teaching-plan-service";


export const useDeleteTeachingPlan = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: deleteTeachingPlan,
    onError: (error) => {
      setIsModalVisible(false);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      setIsModalVisible(false);
      toast.success(data.message);
      queryClient.invalidateQueries("teachingPlans");
    },
  });

  const handleDeleteTeachingPlan = (id) => {
    mutate(id);
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
    isModalVisible,
    isDeleting: isLoading,
    handleDeleteTeachingPlan,
    handleOpenModal,
    handleCancel,
    handleOpenPopup,
  };
};
