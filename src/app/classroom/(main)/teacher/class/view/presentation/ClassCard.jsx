import Image from "next/image";
import React from "react";

import AvatarProfile from "@/app/classroom/shared/presentation/Profile/AvatarProfile";
import {
  generalTimeFormatter,
  getDayName,
} from "@/app/classroom/shared/usecase/helper";
import NoTask from "@/assets/classroom/images/NoTask.png";

import SisvaCard from "./SisvaCard";
const ClassCard = ({
  onClick,
  subject,
  group,
  schedule,
  isEmptySchedule,
  teacherPhoto,
  teacherName,
}) => {
  return (
    <SisvaCard className="flex flex-col gap-7 min-h-52" onClick={onClick}>
      <div className="flex gap-2">
        <AvatarProfile url={teacherPhoto} size={48} />
        <div>
          <div className="rounded-full bg-[#FEECE9] px-2 py-[2px] w-fit h-fit">
            <span className="text-sm font-semibold break-all text-primary line-clamp-1">
              {subject} - {group}
            </span>
          </div>

          <p className="mt-1 text-sm text-white">{teacherName}</p>
        </div>
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
          <>
            <h3 className="text-sm font-semibold font-kumbh">Jadwal</h3>
            <div className="flex flex-col gap-1 mt-1">
              {schedule.map((schedule, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="leading-tight text-sm text-[#555]">
                    {getDayName(schedule.day)},
                  </span>
                  <span className="leading-tight text-sm text-[#555]">
                    {generalTimeFormatter(schedule.start_time)} -{" "}
                    {generalTimeFormatter(schedule.end_time)}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </SisvaCard>
  );
};

export default ClassCard;
