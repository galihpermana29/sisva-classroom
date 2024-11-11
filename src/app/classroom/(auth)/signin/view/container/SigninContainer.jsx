import LayoutBg from "@/assets/classroom/images/Auth/BGLoginSVG.svg";
import BrandLogo from "@/assets/classroom/images/Auth/BrandLogo.svg";
import Image from "next/image";
import React from "react";
import "../../../style.css";
import LoginForm from "../presentation/LoginForm";

const SignInContainer = () => {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      <div className="sm:flex-1 relative">
        <Image
          src={LayoutBg}
          alt="Library"
          layout="fill"
          objectFit="cover"
          className="opacity-[0.7]"
        />
      </div>
      <div className="sm:flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center">
            <Image src={BrandLogo} alt="SISVA Classroom" />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-2xl font-semibold text-[#1677ff]">
              Masukan data akunmu
            </span>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInContainer;
