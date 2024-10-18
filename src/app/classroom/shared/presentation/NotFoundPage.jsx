"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FileSearch02 } from "@untitled-ui/icons-react";
import SisvaButton from "./Button/GlobalButton";
import Image from "next/image";
import EmptyStateImg from "@/assets/svgs/empty-state.svg";

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
