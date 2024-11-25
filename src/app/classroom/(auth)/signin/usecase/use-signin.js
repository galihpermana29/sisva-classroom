import { useForm } from "antd/es/form/Form";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  getSchoolByCode,
  getUserById,
  postLogin,
} from "../repository/signin-service";

export const useSignIn = () => {
  const [form] = useForm();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [schoolData, setSchoolData] = useState(null);
  const router = useRouter();

  const handleSubmitSchoolCode = async (value) => {
    setIsLoading(true);
    const response = await getSchoolByCode(value.school_code);

    if (response.success) {
      localStorage.setItem("schoolData", JSON.stringify(response.data));
      setSchoolData(response.data);

      setStep(2);
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  const handleSubmitLoginForm = async (value) => {
    setIsLoading(true);

    const newPayload = {
      username: value.username,
      password: value.password,
      school_id: schoolData.id,
    };

    const loginResponse = await postLogin(newPayload);
    if (loginResponse.success) {
      const userResponse = await getUserById(
        loginResponse.data.user_id,
        loginResponse.data.school_id,
        loginResponse.data.token
      );

      if (userResponse.success) {
        if (
          userResponse.data.type !== "teacher" &&
          userResponse.data.type !== "student"
        ) {
          toast.error(
            "Login Failed, Only Teacher and Student Can Access Classroom"
          );
          setIsLoading(false);
          return;
        }
        // const expirationTime = new Date(Date.now() + decodedToken.exp * 1000);
        const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const userDataPayload = {
          ...userResponse.data,
          school_id: loginResponse.data.school_id,
        };

        setCookie("userData", JSON.stringify(userDataPayload), {
          expires: expirationTime,
          path: "/",
        });

        setCookie("token", loginResponse.data.token, {
          expires: expirationTime,
          path: "/",
        });

        router.push(`/classroom/${userResponse.data.type}`);
        toast.success(loginResponse.message);
      } else {
        toast.error("Login Failed, " + userResponse.message);
      }
    } else {
      toast.error("Login Failed, " + loginResponse.message);
    }

    setIsLoading(false);
  };
  return {
    form,
    handleSubmitLoginForm,
    isLoading,
    step,
    handleSubmitSchoolCode,
    setStep,
  };
};
