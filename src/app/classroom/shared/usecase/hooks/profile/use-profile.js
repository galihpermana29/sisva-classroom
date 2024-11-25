import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import {
    changePassword,
    getProfileDetail,
    resetPassword,
    updateProfile,
} from "@/app/classroom/shared/repository/profile-detail-service";
import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";

import { postUploadFile } from "../../../../(main)/teacher/teaching-material/repository/teaching-material-service";
import { generateRandomString } from "../../../../(main)/teacher/teaching-material/usecase/custom-function";
import { destructProfileData } from "./profile-data-mapper";

export const useProfile = (initialData) => {
  const [step, setStep] = useState("biodata");
  const [isEdit, setIsEdit] = useState(false);
  const [profileData, setProfileData] = useState(
    destructProfileData(initialData)
  );
  const [fetchQuery, setFetchQuery] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  const setFormValues = useCallback(
    (newStep, data) => {
      const formValues =
        newStep === "akun" || newStep === "password"
          ? data
          : data.detail.json_text.json_text;
      form.setFieldsValue(formValues);
    },
    [form]
  );

  useEffect(() => {
    setFormValues(step, profileData);
  }, []);

  const handleClickTab = useCallback(
    (newStep) => {
      if (step === newStep) return;

      setStep(newStep);
      setIsEdit(false);
      form.resetFields();
      setFormValues(newStep, profileData);
    },
    [step, profileData, form, setFormValues]
  );

  const fetchProfileData = useCallback(async () => {
    const { id } = getClientSession();
    setLoading(true);
    const response = await getProfileDetail(id);
    if (response.success) {
      const destructedData = destructProfileData(response.data);
      setProfileData(destructedData);
      setFormValues(step, destructedData);
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  }, [step, setFormValues]);

  const handleChangeProfilePicture = useCallback(
    async (file) => {
      if (!file) return;

      const { id } = getClientSession();
      setImageLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await postUploadFile(formData);

      if (response.success) {
        const updatedProfileData = {
          ...profileData,
          detail: {
            ...profileData.detail,
            json_text: JSON.stringify(profileData.detail.json_text),
          },
          profile_image_uri: response.data,
        };

        const {
          id: _,
          status: __,
          ...payloadUpdateProfile
        } = updatedProfileData;

        const fetchUpdateProfile = await updateProfile(
          id,
          payloadUpdateProfile
        );

        if (fetchUpdateProfile.success) {
          toast.success("Success update profile image");
        } else {
          toast.error("Failed update profile image");
        }
      } else {
        toast.error("Error upload file");
      }

      setImageLoading(false);
      setFetchQuery(generateRandomString());
    },
    [profileData]
  );

  const createUpdatePayload = useCallback(
    (value, section) => {
      const basePayload = { ...profileData };

      if (section === "akun") {
        return { ...basePayload, ...value };
      }

      if (section === "biodata" || section === "wali-murid") {
        return {
          ...basePayload,
          detail: {
            ...basePayload.detail,
            json_text: {
              ...basePayload.detail.json_text,
              json_text: {
                ...basePayload.detail.json_text.json_text,
                ...value,
              },
            },
          },
        };
      }

      if (section === "password") {
        return { ...basePayload, password: value.password };
      }

      return basePayload;
    },
    [profileData]
  );

  const handleUpdateProfile = useCallback(async (payload) => {
    const { id } = getClientSession();

    const stringifiedPayload = {
      ...payload,
      detail: {
        ...payload.detail,
        json_text: JSON.stringify(payload.detail.json_text),
      },
    };
    delete stringifiedPayload.id;
    delete stringifiedPayload.status;

    setLoading(true);
    const response = await updateProfile(id, stringifiedPayload);

    if (response.success) {
      toast.success("Success update profile");
      setFetchQuery(generateRandomString());
    } else {
      toast.error("Error update profile");
    }

    setLoading(false);
    handleCancelEdit();
  }, []);

  const handleChangeResetPassword = useCallback(
    async (value, passwordSection) => {
      const { id } = getClientSession();
      const changePasswordpayload = {
        current_password: value.current_password,
        new_password: value.new_password_change,
        user_id: id,
      };
      const resetPasswordPayload = {
        new_password: value.new_password_reset,
        user_id: id,
      };

      setLoading(true);
      const fetchFunction =
        passwordSection === "change-password" ? changePassword : resetPassword;
      const response = await fetchFunction(
        passwordSection === "change-password"
          ? changePasswordpayload
          : resetPasswordPayload
      );

      if (response.success) {
        toast.success("Success change password");
        setFetchQuery(generateRandomString());
        form.resetFields();
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    },
    []
  );

  const handleSubmitSection = useCallback(
    (value, section, passwordSection) => {
      const payload = createUpdatePayload(value, section);
      if (section !== "password") {
        handleUpdateProfile(payload);
      } else {
        handleChangeResetPassword(value, passwordSection);
      }
    },
    [createUpdatePayload, handleUpdateProfile, handleChangeResetPassword]
  );

  const handleCancelEdit = useCallback(() => {
    setIsEdit(false);
    setFormValues(step, profileData);
  }, [step, profileData, setFormValues]);

  useEffect(() => {
    if (fetchQuery) {
      fetchProfileData();
    }
  }, [fetchQuery, fetchProfileData]);

  const renderedData = useMemo(
    () => (fetchQuery ? profileData : destructProfileData(initialData)),
    [fetchQuery, profileData, initialData]
  );

  return {
    handleClickTab,
    step,
    isEdit,
    setIsEdit,
    data: renderedData,
    setFetchQuery,
    handleUpdateProfile,
    handleChangeProfilePicture,
    imageLoading,
    loading,
    form,
    handleSubmitSection,
    handleCancelEdit,
  };
};
