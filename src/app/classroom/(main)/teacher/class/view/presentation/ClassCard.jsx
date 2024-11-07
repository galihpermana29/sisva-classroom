import React from "react";
import SisvaCard from "./SisvaCard";
import Image from "next/image";

import NoTask from "@/assets/classroom/images/NoTask.png";
import {
  generalTimeFormatter,
  getDayNameFromNumber,
} from "@/app/classroom/shared/usecase/helper";
const ClassCard = ({ onClick, subject, group, schedule, isEmptySchedule }) => {
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
        {isEmptySchedule ? (
          <div className="flex items-center gap-3">
            <Image src={NoTask} alt="no-task" width={50} height={50} />
            <div className="flex gap-2 flex-col sm:text-left">
              <h2 className="text-base font-[500] text-[#1D2939]">
                Empty State
              </h2>
              <p className="text-xs sm:text-sm text-[#555]">
                Empty State Description
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <span className="text-[#1D2939] font-[500] text-sm">Jadwal</span>
            {schedule
              .sort((a, b) => a.day - b.day)
              .map((item, idx) => {
                return <>cek</>;
              })}
          </div>
        )}
      </div>
    </SisvaCard>
  );
};

export default ClassCard;
