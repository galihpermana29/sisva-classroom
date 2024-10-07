import { useState } from "react";
import { updateScore } from "../../repository/teacher-score-service";
import toast from "react-hot-toast";

export function useUpdateScore() {
  const [loading, setLoading] = useState(false);

  const updateScoreStudent = async (id, data) => {
    setLoading(true);
    console.log("id");
    console.log(id);
    console.log("data");
    console.log(data);

    const res = await updateScore(id, data);
    console.log(res.message);

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
