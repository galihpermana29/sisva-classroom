import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";
import PdfIcon from "@/assets/classroom/teacher/PDFIcon.png";
import {
    DotsVertical,
    Download01,
    Edit01,
    Trash01,
} from "@untitled-ui/icons-react";
import { Card, Divider, Dropdown } from "antd";
import Image from "next/image";

import React, { useMemo } from "react";
import { useModal } from "../../../../class/[classId]/create-rpp/view/container/Provider/ModalProvider";
import { generateRandomColor } from "../../../usecase/custom-function";

const MaterialCard = ({ item }) => {
  const { setModalState } = useModal();
  const userData = getClientSession();
  const schoolId = userData?.school_id;

  const items = [
    item.attachment_file_uri && {
      label: (
        <a
          href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/v1/files/${item.attachment_file_uri}?school_id=${schoolId}`}
          download
        >
          <div className="flex items-center gap-2 text-[#555555]">
            <Download01 width={20} height={20} /> Download
          </div>
        </a>
      ),
      key: "0",
    },
    ...(item.isOwner
      ? [
          {
            label: (
              <div className="flex items-center gap-2 text-[#555555]">
                <Edit01 width={20} height={20} /> Edit
              </div>
            ),
            key: "1",
            onClick: () => {
              setModalState({
                isOpen: true,
                title: "Edit Bahan Ajar",
                type: "edit-teaching-material",
                data: item,
              });
            },
          },
          {
            label: (
              <div className="flex items-center gap-2 text-primary">
                <Trash01 width={20} height={20} /> Delete
              </div>
            ),
            key: "2",
            onClick: () => {
              setModalState({
                isOpen: true,
                title: "Delete Bahan Ajar",
                type: "delete-teaching-material",
                data: item,
              });
            },
          },
        ]
      : []),
  ];

  const randomColor = useMemo(() => generateRandomColor(), []);

  return (
    <Card
      cover={
        // <Image
        //   src={Banner}
        //   alt="banner-teaching-file"
        //   width={200}
        //   height={100}
        //   objectFit="cover"
        // />
        <div className={`h-20 bg-red-200 w-full ${randomColor}`} />
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
          <span className="text-sm text-[#555555]">{item.curriculum_name}</span>
        </div>
      </div>
    </Card>
  );
};

export default MaterialCard;
