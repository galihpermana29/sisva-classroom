import React from "react";
import CustomRppTable from "./CustomRppTable";
import { Edit01, File05, Trash01 } from "@untitled-ui/icons-react";

const TaskTable = () => {
  const column = [
    {
      title: "Nama Tugas",
      dataIndex: "task_name",
      key: "task_name",
    },
    {
      title: "Deskripsi Tugas",
      dataIndex: "task_description",
      key: "task_description",
    },
    {
      title: "Attachment",
      dataIndex: "attachment",
      key: "attachment",
      render: (data) => (
        <div className="flex items-center gap-2">
          <File05 width={20} height={20} />
          <span className="text-[#1D2939]">{data}</span>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <div className="flex items-center gap-2">
          <Trash01 width={18} height={18} />
          <Edit01 width={18} height={18} />
        </div>
      ),
      width: 120,
    },
  ];
  const data = [
    {
      task_name: "Tugas Teorema Pyhtagoras 1",
      task_description: "Deskripsi tugas akan ditulis disini",
      attachment: "Modul KBM 1",
    },
    {
      task_name: "Tugas Teorema Pyhtagoras 1",
      task_description: "Deskripsi tugas akan ditulis disini",
      attachment: "Modul KBM 1",
    },
    {
      task_name: "Tugas Teorema Pyhtagoras 1",
      task_description: "Deskripsi tugas akan ditulis disini",
      attachment: "Modul KBM 1",
    },
    {
      task_name: "Tugas Teorema Pyhtagoras 1",
      task_description: "Deskripsi tugas akan ditulis disini",
      attachment: "Modul KBM 1",
    },
  ];
  return <CustomRppTable columns={column} dataSource={data} />;
};

export default TaskTable;
