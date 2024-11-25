import { useState } from "react";
import toast from "react-hot-toast";

import { updateScore } from "../../repository/teacher-score-service";

export function useUpdateScore() {
  const [loading, setLoading] = useState(false);

  const updateScoreStudent = async (id, data) => {
    setLoading(true);

    const res = await updateScore(id, data);

    if (res.success) {
      setLoading(false);
      toast.success(res.message, {
        position: "bottom-right",
      });
    } else {
      setLoading(false);
      toast.error(res.message, {
        position: "bottom-right",
      });
    }
  };

  return { updateScoreStudent, loading };
}
