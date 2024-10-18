import React from "react";
import { usePathname } from "next/navigation";

import "./style.css";
import BiodataSection from "./FormSection/BiodataSection";
import AccountSection from "./FormSection/AccountSection";
import PasswordSection from "./FormSection/PasswordSection";
import GuardianSection from "./FormSection/GuardianSection";

const FormFields = ({
  imageLoading,
  handleFileUpload,
  formData,
  form,
  isEdit,
  setIsEdit,
  loading,
  step,
  handleSubmitSection,
  handleCancelEdit,
}) => {
  /**
   * step: biodata, akun, password, wali-murid
   */

  const pathname = usePathname();
  const isTeacher = pathname.startsWith("/classroom/teacher");

  return (
    <div className="flex flex-col gap-3 form-fields">
      {step === "biodata" && (
        <BiodataSection
          isEdit={isEdit}
          isTeacher={isTeacher}
          loading={loading}
          imageLoading={imageLoading}
          setIsEdit={setIsEdit}
          form={form}
          formData={formData}
          handleSubmitSection={handleSubmitSection}
          handleFileUpload={handleFileUpload}
          handleCancelEdit={handleCancelEdit}
        />
      )}

      {step === "akun" && (
        <AccountSection
          isTeacher={isTeacher}
          isEdit={isEdit}
          loading={loading}
          setIsEdit={setIsEdit}
          form={form}
          formData={formData}
          handleSubmitSection={handleSubmitSection}
          handleCancelEdit={handleCancelEdit}
        />
      )}

      {step === "password" && (
        <PasswordSection
          isEdit={isEdit}
          loading={loading}
          setIsEdit={setIsEdit}
          form={form}
          handleSubmitSection={handleSubmitSection}
        />
      )}

      {step === "wali-murid" && (
        <GuardianSection
          formData={formData}
          form={form}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          loading={loading}
          handleSubmitSection={handleSubmitSection}
          handleCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default FormFields;
