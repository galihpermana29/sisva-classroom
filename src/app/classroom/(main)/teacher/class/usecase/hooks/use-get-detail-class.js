import {
    setClassData,
    setIsFetching,
} from "@/app/classroom/shared/redux/classSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getClassDataById } from "../../repository/teacher-class-service";

export const useGetDetailClass = (id) => {
  const classData = useSelector((state) => state.classData.detailClass);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleGetDetail = async () => {
      dispatch(setIsFetching(true));
      setIsLoading(true);
      const response = await getClassDataById(parseInt(id));

      if (response.success) {
        dispatch(setClassData(response.data));
      } else {
        toast.error("Error get detail class");
      }
      dispatch(setIsFetching(false));
      setIsLoading(false);
    };

    handleGetDetail();
  }, []);

  return { isLoading };
};
