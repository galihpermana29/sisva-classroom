import { useState } from "react";

export const useTeacherProfile = () => {
  /**
   * step: biodata, akun, password, wali-murid
   */
  const [step, setStep] = useState("biodata");
  const [isEdit, setIsEdit] = useState(false);

  const handleClickTab = (step) => {
    setStep(step);
    setIsEdit(false);
  };

  return {
    handleClickTab,
    step,
    isEdit,
    setIsEdit,
  };
};
