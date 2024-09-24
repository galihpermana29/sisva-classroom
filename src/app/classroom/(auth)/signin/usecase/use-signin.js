import { useForm } from "antd/es/form/Form";

export const useSignIn = () => {
  const [form] = useForm();
  return { form };
};
