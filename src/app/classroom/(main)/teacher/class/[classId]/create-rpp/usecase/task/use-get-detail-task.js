import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { getTaskById } from "../../repository/create-rpp-service";
import dayjs from "dayjs";
import { useModal } from "../../view/container/Provider/ModalProvider";

export const useGetDetailTask = (setFileURI) => {
  const [form] = useForm();
  const [fileList, setFileList] = useState(null);
  const [isLoadingGetDetail, setIsLoadingGetDetail] = useState(false);
  const { modalState } = useModal();

  const handleGetDetailTask = async (id) => {
    setIsLoadingGetDetail(true);
    const response = await getTaskById(id);

    if (response.success) {
      form.setFieldsValue({
        ...response.data,
        deadline: dayjs(response.data.deadline, "DD/MM/YYYY h:mm A Z"),
      });
    } else {
      toast.error("Error get detail task");
    }
    setIsLoadingGetDetail(false);
  };

  useEffect(() => {
    const getDetail = async () => {
      if (
        modalState?.data?.isTemporaryEditTaskState ||
        modalState?.data?.isTemporaryTaskState
      ) {
        form.setFieldsValue({
          ...modalState?.data,
          deadline: dayjs(modalState?.data.deadline, "DD/MM/YYYY h:mm A Z"),
        });
      } else {
        await handleGetDetailTask(modalState?.data?.id);
      }
    };
    if (modalState?.type === "edit-task") {
      getDetail();
    }
    setFileList(
      modalState?.data?.attachment_file_uri
        ? [modalState?.data?.attachment_file_uri]
        : null
    );
    setFileURI(
      modalState?.data?.attachment_file_uri
        ? modalState?.data?.attachment_file_uri
        : ""
    );
  }, [modalState]);

  return {
    form,
    isLoadingGetDetail,
    handleGetDetailTask,
    setFileList,
    fileList,
  };
};
