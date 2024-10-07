import { Form } from "antd";
import { useState } from "react";
import { setScoreStudentTask } from "../repository/scoring-submission-service";
import { useParams, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSetScore() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const searchParams = useSearchParams();
  const student_id = searchParams.get("student_id");
  const { id } = params;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ id, data }) => setScoreStudentTask(id, data),
    onError: (error) => {
      setLoading(false);
      toast.error(
        error.message || "An error occurred while setting the score",
        { position: "bottom-right" }
      );
    },
    onSuccess: (data) => {
      setLoading(false);
      toast.success(data.message, {
        position: "bottom-right",
      });
      queryClient.invalidateQueries(["student-scores"]);
    },
  });

  const handleSetScore = async (values) => {
    setLoading(true);

    const data = {
      student_id,
      value: values.score,
      feedback: values.feedback,
    };

    mutate({ id, data });
  };

  return { form, handleSetScore, loading };
}
