"use client";
import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";
import {
  SisvaInput,
  SisvaInputPassword,
} from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import { Form } from "antd";
import React from "react";
import { useSignIn } from "../../usecase/use-signin";
import { ArrowLeft } from "@untitled-ui/icons-react";

const LoginForm = () => {
  const {
    form,
    handleSubmitLoginForm,
    isLoading,
    step,
    setStep,
    handleSubmitSchoolCode,
  } = useSignIn();
  return (
    <div className="flex flex-col gap-3">
      <Form
        name="login-form"
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={step === 1 ? handleSubmitSchoolCode : handleSubmitLoginForm}
        disabled={isLoading}
      >
        {step === 1 ? (
          <>
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
            <SisvaButton
              btn_type="primary"
              btn_size="xl"
              shape="default mt-2 !w-full"
              htmlType="submit"
              loading={isLoading}
            >
              Next
            </SisvaButton>
          </>
        ) : (
          <>
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
              <SisvaInputPassword
                customSize="md"
                placeholder="Masukkan password"
              />
            </Form.Item>
            <SisvaButton
              btn_type="primary"
              btn_size="xl"
              htmlType="submit"
              shape="default mt-2 !w-full"
              loading={isLoading}
            >
              Masuk
            </SisvaButton>
          </>
        )}
      </Form>
      {step === 2 && (
        <div
          className="flex items-center gap-2 text-[#1677ff] font-semibold w-fit cursor-pointer"
          onClick={() => setStep(1)}
        >
          <ArrowLeft width={20} height={20} />
          <span>Kembali</span>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
