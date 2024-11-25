import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { getTeachingPlans } from "../repository/teaching-plan-service";

export const useTeachingPlan = () => {
  const params = useParams();
  const { classId } = params;

  const {
    data: res,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teachingPlans"],
    queryFn: getTeachingPlans,
  });

  const data = res?.data;

  const teachingPlans = data?.filter((plan) => {
    return plan.class_id === parseInt(classId);
  });

  return {
    teachingPlans,
    isLoading,
    error,
  };
};
