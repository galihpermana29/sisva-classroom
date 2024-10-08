import toast from "react-hot-toast";
import { getTeachingMaterialById } from "../repository/teaching-material-service";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";

export const useGetDetailTeachingMaterial = () => {
  const [form] = useForm();
  const [isLoadingGetDetail, setIsLoadingGetDetail] = useState(false);

  const handleGetDetailTeachingMaterial = async (id) => {
    setIsLoadingGetDetail(true);
    const response = await getTeachingMaterialById(id);
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
    handleGetDetailTeachingMaterial,
  };
};
