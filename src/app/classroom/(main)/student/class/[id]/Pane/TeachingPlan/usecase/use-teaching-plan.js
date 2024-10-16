import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getTeachingPlans } from "../repository/teaching-plan-service";

export const useTeachingPlan = () => {
  const { id: classId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["student-teaching-plans"],
    queryFn: getTeachingPlans,
    select: ({ data }) => {
      return data;
    },
  });

  console.log(data);

  const teachingPlans = data?.filter((plan) => {
    return plan.class_id === parseInt(classId);
  });

  return {
    teachingPlans,
    isLoading,
    error,
  };
};
