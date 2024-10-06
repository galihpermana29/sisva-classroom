import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { getTaskById } from "../../repository/create-rpp-service";

export const useGetDetailTask = () => {
  const [form] = useForm();
  const [isLoadingGetDetail, setIsLoadingGetDetail] = useState(false);

  const handleGetDetailTask = async (id) => {
    setIsLoadingGetDetail(true);
    const response = await getTaskById(id);
    if (response.success) {
      form.setFieldsValue(response.data);
    } else {
      toast.error("Error get teaching material");
    }
    setIsLoadingGetDetail(false);
  };

  return {
    form,
    isLoadingGetDetail,
    handleGetDetailTask,
  };
};
