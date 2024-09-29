import { useForm } from "antd/es/form/Form";
import {
  getSchoolByCode,
  getUserById,
  postLogin,
} from "../repository/signin-service";
import toast from "react-hot-toast";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmitLoginForm = async (value) => {
    setIsLoading(true);
    const schoolCode = value.school_code;

    const getSchoolResponse = await getSchoolByCode(schoolCode);
    if (getSchoolResponse.success) {
      const newPayload = {
        username: value.username,
        password: value.password,
        school_id: getSchoolResponse.data.id,
      };

      const loginResponse = await postLogin(newPayload);
      if (loginResponse.success) {
        const userResponse = await getUserById(
          loginResponse.data.user_id,
          loginResponse.data.school_id,
          loginResponse.data.token
        );

        if (userResponse.success) {
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
    } else {
      toast.error("Login Failed, " + getSchoolResponse.message);
    }
    setIsLoading(false);
  };
  return { form, handleSubmitLoginForm, isLoading };
};
