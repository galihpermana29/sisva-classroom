import { useState } from "react";

export const useCreateRpp = () => {
  const [quillValue, setQuillValue] = useState({
    description: "",
    goals: "",
    activity: "",
    rate: "",
  });
  return {
    quillValue,
    setQuillValue,
  };
};
