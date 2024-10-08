"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FileSearch02 } from "@untitled-ui/icons-react";
import SisvaButton from "./Button/GlobalButton";

const NotFoundPageComponent = ({ title = "Halaman Tidak Ada" }) => {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center items-center h-[calc(100vh-30vh)]">
      <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
        <FileSearch02 width={50} height={50} />

        <div className="text-center">
          <p className="text-lg text-gray-600 mt-2">{title}</p>
        </div>

        <SisvaButton
          btn_type="primary"
          btn_size="md"
          onClick={() => router.push("/classroom")}
        >
          Go Back to Home
        </SisvaButton>
      </div>
    </div>
  );
};

export default NotFoundPageComponent;
