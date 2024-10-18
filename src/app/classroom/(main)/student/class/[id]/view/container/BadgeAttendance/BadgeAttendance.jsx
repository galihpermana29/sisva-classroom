import clsx from "clsx";

const BadgeAttendance = ({ status }) => {
  const statusLabel = {
    present: "Hadir",
    sick: "Sakit",
    absent: "Tidak Hadir",
    leave: "Izin",
  };
  return (
    <div
      className={clsx("w-fit text-base90 font-normal font-kumbh", {
        "bg-[#F96756] font-semibold text-white rounded-full px-2.5 py-0.5":
          status !== "present",
      })}
    >
      {statusLabel[status]}
    </div>
  );
};

export default BadgeAttendance;
