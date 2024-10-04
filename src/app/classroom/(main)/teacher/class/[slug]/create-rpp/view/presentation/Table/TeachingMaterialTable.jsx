import React from "react";
import CustomRppTable from "./CustomRppTable";
import { Edit01, File05, Trash01 } from "@untitled-ui/icons-react";

const TeachingMaterialTable = () => {
  const column = [
    {
      title: "Nama Bahan Ajar",
      dataIndex: "title",
      key: "title",
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
          <Trash01 className="cursor-pointer" width={18} height={18} />
          <Edit01 className="cursor-pointer" width={18} height={18} />
        </div>
      ),
      width: 120,
    },
  ];
  const data = [
    {
      title: "Modul Teorema Pyhtagoras 1",
    },
    {
      title: "Modul Teorema Pyhtagoras 2",
    },
    {
      title: "Modul Teorema Pyhtagoras 3",
    },
    {
      title: "Modul Teorema Pyhtagoras 4",
    },
  ];
  return <CustomRppTable columns={column} dataSource={data} />;
};

export default TeachingMaterialTable;
