import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getTeachingPlans } from "../../repository/class-detail-service";

export const useTeachingPlan = () => {
  const params = useParams();
  const { classId } = params;

  const [teachingPlans, setTeachingPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeachingPlans = async () => {
    setIsLoading(true);
    setError(null);

    const response = await getTeachingPlans();

    if (!response.success) {
      setError(response.message);
    } else {
      const filteredPlans = response.data.filter((plan) => {
        return plan.class_id === parseInt(classId);
      });
      setTeachingPlans(filteredPlans);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchTeachingPlans();
  }, []);

  return {
    teachingPlans,
    isLoading,
    error,
  };
};
