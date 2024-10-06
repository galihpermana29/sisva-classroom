import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { getTaskById } from "../../repository/create-rpp-service";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const useGetDetailTask = () => {
  const [form] = useForm();
  const [isLoadingGetDetail, setIsLoadingGetDetail] = useState(false);

  const handleGetDetailTask = async (id) => {
    setIsLoadingGetDetail(true);
    const response = await getTaskById(id);

    if (response.success) {
      form.setFieldsValue({
        ...response.data,
        deadline: dayjs(response.data.deadline, "DD/MM/YYYY"),
      });
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
