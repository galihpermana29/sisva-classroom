"use client";
import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";
import {
  SisvaInput,
  SisvaInputPassword,
} from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import { Checkbox, Form } from "antd";
import React from "react";
import { useSignIn } from "../../usecase/use-signin";

const LoginForm = () => {
  const { form, handleSubmitLoginForm, isLoading } = useSignIn();
  return (
    <Form
      name="login-form"
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={handleSubmitLoginForm}
      disabled={isLoading}
    >
      <Form.Item
        className="my-[15px]"
        name="school_code"
        label="Kode Sekolah"
        rules={[
          {
            required: true,
            message: "Masukan kode sekolah",
          },
        ]}
      >
        <SisvaInput customSize="md" placeholder="Masukan kode" />
      </Form.Item>
      <Form.Item
        className="my-[15px]"
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: "Masukkan username",
          },
        ]}
      >
        <SisvaInput customSize="md" placeholder="Masukkan username" />
      </Form.Item>
      <Form.Item
        className="my-[15px]"
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Masukkan password",
          },
        ]}
      >
        <SisvaInputPassword customSize="md" placeholder="Masukkan password" />
      </Form.Item>
      <div className="my-[15px] flex justify-between items-center">
        <Checkbox>Ingat Saya</Checkbox>
        <span className="cursor-pointer text-primary text-sm transition-all hover:text-primary_hover">
          Lupa Password?
        </span>
      </div>
      <SisvaButton
        btn_type="primary"
        btn_size="xl"
        htmlType="submit"
        shape="default mt-2 !w-full"
        loading={isLoading}
      >
        Masuk
      </SisvaButton>
    </Form>
  );
};

export default LoginForm;
