import React, { useState } from "react";
import CustomRppTable from "./CustomRppTable";
import { Download01, Edit01, Trash01 } from "@untitled-ui/icons-react";
import Image from "next/image";
import pdfIcon from "@/assets/classroom/teacher/PDFIcon.png";
import { useModal } from "../../container/Provider/ModalProvider";
import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";
import DowndloadableFileLabel from "@/app/classroom/shared/presentation/DowndloadableFileLabel";
const TeachingMaterialTable = ({
  dataSource,
  type,
  isLoading,
  rowSelection,
}) => {
  const { setModalState } = useModal();
  const userData = getClientSession();
  const schoolId = userData?.school_id;

  const column = [
    {
      title: "Nama Bahan Ajar",
      dataIndex: "description",
      key: "description",
      render: (data, record) => (
        <div className="flex items-center gap-2">
          <Image src={pdfIcon} width={20} height={20} alt="pdf-icon" />
          {!record.attachment_file_uri ? (
            <span className="text-[#1D2939]">{data}</span>
          ) : (
            <DowndloadableFileLabel url={record.attachment_file_uri}>
              <span className="text-[#1D2939] transition-all hover:text-[#7c7c7c] font-semibold">
                {data}
              </span>
            </DowndloadableFileLabel>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {type === "summary" ? (
            <>
              <Trash01
                className="cursor-pointer"
                width={18}
                height={18}
                onClick={() => {
                  setModalState({
                    isOpen: true,
                    type: "delete-teaching-material",
                    title: "Hapus Bahan Ajar",
                    data: record,
                  });
                }}
              />
              <Edit01
                className="cursor-pointer"
                width={18}
                height={18}
                onClick={() => {
                  setModalState({
                    isOpen: true,
                    type: "edit-teaching-material",
                    title: "Edit Bahan Ajar",
                    data: record,
                  });
                }}
              />
            </>
          ) : (
            <a
              href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/v1/files/${record.attachment_file_uri}?school_id=${schoolId}`}
              download
            >
              <Download01 width={20} height={20} className="text-[#555555]" />
            </a>
          )}
        </div>
      ),
      width: 120,
    },
  ];
  return (
    <CustomRppTable
      pagination={
        type === "summary"
          ? false
          : {
              pageSize: 7,
            }
      }
      columns={column}
      dataSource={dataSource}
      rowSelection={type !== "summary" ? rowSelection : null}
      loading={isLoading}
    />
  );
};

export default TeachingMaterialTable;
