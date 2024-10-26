import Image from "next/image";
import React from "react";
import SisvaCard from "./SisvaCard";

import { generalDateFormatter } from "@/app/classroom/shared/usecase/helper";
import NoTask from "@/assets/classroom/images/NoTask.png";
const ClassCard = ({
  onClick,
  subject,
  group,
  taskName,
  timeStamp,
  isEmptyTask,
}) => {
  return (
    <SisvaCard className="flex flex-col gap-7 min-h-52" onClick={onClick}>
      <div className="rounded-lg bg-[#FEECE9] px-2 py-1 w-fit max-w-full">
        <span className="text-primary text-sm font-semibold truncate block">
          {subject} - {group}
        </span>
      </div>
      <hr className="border border-[#FDD9D4] border-dashed" />

      <div className="bg-white rounded-xl p-4 pl-8 relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-12 bg-primary rounded-r-full"></div>
        {isEmptyTask ? (
          <div className="flex items-center gap-3">
            <Image src={NoTask} alt="no-task" width={50} height={50} />
            <div className="flex gap-2 flex-col sm:text-left">
              <h2 className="text-base font-[500] text-[#1D2939]">
                Kerja Bagus!
              </h2>
              <p className="text-xs sm:text-sm text-[#555]">
                Semua tugas telah terselesaikan!
              </p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-base font-[500] text-[#1D2939] mb-1">
              {taskName}
            </h2>
            <p className="text-xs sm:text-sm text-[#555]">
              {generalDateFormatter(timeStamp)}
            </p>
          </>
        )}
      </div>
    </SisvaCard>
  );
};

export default ClassCard;
