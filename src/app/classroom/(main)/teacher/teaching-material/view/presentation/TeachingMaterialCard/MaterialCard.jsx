import {
  DotsVertical,
  Download01,
  Edit01,
  Trash01,
} from "@untitled-ui/icons-react";
import React from "react";
import { Card, Divider, Dropdown } from "antd";
import PdfIcon from "@/assets/classroom/teacher/PDFIcon.png";
import Banner from "@/assets/classroom/teacher/BannerCard.png";
import Image from "next/image";

const MaterialCard = ({ item }) => {
  const items = [
    {
      label: (
        <div className="flex items-center gap-2 text-[#555555]">
          <Download01 width={20} height={20} /> Download
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className="flex items-center gap-2 text-primary">
          <Trash01 width={20} height={20} /> Delete
        </div>
      ),
      key: "1",
    },
  ];

  return (
    <Card
      cover={
        <Image
          src={Banner}
          alt="banner-teaching-file"
          width={200}
          height={100}
          objectFit="cover"
        />
      }
      className="relative rounded-xl shadow-sm bg-white text-[#1D2939]"
    >
      <Dropdown menu={{ items }} trigger={["click"]}>
        <div className="cursor-pointer absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full bg-white">
          <DotsVertical width={20} height={20} className="text-[#5E5E5E]" />
        </div>
      </Dropdown>
      <div className=" flex flex-col gap-3">
        <div className="rounded-full bg-primary px-2 py-1 w-fit">
          <span className="text-white text-sm font-semibold">
            {item.subject_name}
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <Image
            src={PdfIcon}
            alt="banner-teaching-file"
            width={30}
            height={30}
          />
          <span className="text-[16px] font-medium uppercase">
            {item.description}
          </span>
        </div>
        <div className="flex items-center justify-center gap-16">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Program Studi</span>
            <span className="text-sm text-[#969696]">
              {item.study_program_name}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Tingkatan</span>
            <span className="text-sm text-[#969696]">{item.grade}</span>
          </div>
        </div>
        <Divider className="bg-[#FCB3AA] my-2 h-[2px] rounded-full" />
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#FCB3AA]" />
          <span className="text-sm text-[#555555]">
            Recently uploaded by teacher
          </span>
        </div>
      </div>
    </Card>
  );
};

export default MaterialCard;
