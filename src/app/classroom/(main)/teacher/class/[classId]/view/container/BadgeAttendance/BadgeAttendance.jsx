import { Edit01 } from "@untitled-ui/icons-react";
import clsx from "clsx";

const BadgeAttendance = ({ status }) => {
  const statusLabel = {
    present: "Hadir",
    sick: "Sakit",
    absent: "Alpha",
    leave: "Izin",
  };
  return (
    <div
      className={clsx(
        "w-fit text-base90 font-normal font-kumbh flex items-center gap-1",
        {
          "bg-[#F96756] font-semibold text-white rounded-full px-2.5 py-0.5":
            status !== "present",
        }
      )}
    >
      {statusLabel[status]}
      <Edit01 className="w-[14px]" />
    </div>
  );
};

export default BadgeAttendance;
