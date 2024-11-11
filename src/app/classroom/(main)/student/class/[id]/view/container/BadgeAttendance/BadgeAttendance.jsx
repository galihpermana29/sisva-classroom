import { useTokenColor } from "@/app/classroom/shared/usecase/use-token-color";
import clsx from "clsx";

const BadgeAttendance = ({ status }) => {
  const statusLabel = {
    present: "Hadir",
    sick: "Sakit",
    absent: "Tidak Hadir",
    leave: "Izin",
  };
  const { tokenColor } = useTokenColor();
  return (
    <div
      className={clsx("w-fit text-base90 font-normal font-kumbh", {
        "font-semibold text-white rounded-full px-2.5 py-0.5":
          status !== "present",
      })}
      style={{
        backgroundColor: status != "present" && tokenColor,
      }}
    >
      {statusLabel[status]}
    </div>
  );
};

export default BadgeAttendance;
