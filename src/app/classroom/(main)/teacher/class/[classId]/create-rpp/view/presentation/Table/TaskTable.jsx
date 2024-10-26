import pdfIcon from "@/assets/classroom/teacher/PDFIcon.png";
import { Edit01, Trash01 } from "@untitled-ui/icons-react";
import DOMPurify from "dompurify";
import Image from "next/image";
import React from "react";
import { useModal } from "../../container/Provider/ModalProvider";
import CustomRppTable from "./CustomRppTable";

const TaskTable = ({ dataSource }) => {
  const { setModalState } = useModal();
  const column = [
    {
      title: "Nama Tugas",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Deskripsi Tugas",
      dataIndex: "description",
      key: "description",
      render: (description) => (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        />
      ),
    },
    {
      title: "Attachment",
      dataIndex: "attachment_file_uri",
      key: "attachment_file_uri",
      render: (data) => (
        <div className="flex items-center gap-2">
          <Image src={pdfIcon} width={20} height={20} alt="pdf-icon" />
          <span className="text-[#1D2939]">{data}</span>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Trash01
            className="cursor-pointer"
            width={18}
            height={18}
            onClick={() => {
              setModalState({
                isOpen: true,
                type: "delete-task",
                title: "Hapus Tugas",
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
                type: "edit-task",
                title: "Edit Tugas",
                data: record,
              });
            }}
          />
        </div>
      ),
      width: 120,
    },
  ];

  return <CustomRppTable columns={column} dataSource={dataSource} />;
};

export default TaskTable;
