"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import EmptyStateImg from "@/assets/svgs/empty-state.svg";

import SisvaButton from "./Button/GlobalButton";

const NotFoundPageComponent = ({ title = "Halaman Tidak Ada" }) => {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center items-center h-[calc(100vh-30vh)]">
      <div className={"flex flex-col items-center mx-auto mt-4 w-fit"}>
        <Image src={EmptyStateImg} alt="empty-state" className="size-28" />
        <p className="my-3 font-normal">{title}</p>
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
