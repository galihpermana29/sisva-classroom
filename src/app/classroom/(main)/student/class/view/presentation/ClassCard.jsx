import React from "react";
import Image from "next/image";

import NoTask from "@/assets/classroom/images/NoTask.png";
import SisvaCard from "@/app/classroom/(main)/teacher/class/view/presentation/SisvaCard";
import DefaultProfileImage from "@/assets/images/Profile.png";
import {
  generalDateFormatter,
  generalTimeFormatter,
  getDayName,
} from "@/app/classroom/shared/usecase/helper";
import AvatarProfile from "@/app/classroom/shared/presentation/Profile/AvatarProfile";
import { useTokenColor } from "@/app/classroom/shared/usecase/use-token-color";

const ClassCard = ({
  subject,
  group,
  schedules,
  taskName,
  teacherName,
  teacherPhoto,
  timeStamp,
  isEmptySchedules,
}) => {
  const { tokenColor } = useTokenColor();
  return (
    <SisvaCard className="flex flex-col gap-7">
      <div className="flex gap-2">
        <AvatarProfile url={teacherPhoto} size={48} />
        <div>
          <div className="rounded-full bg-[#ffffff] px-2 py-[2px] w-fit h-fit">
            <span
              className="text-sm font-semibold break-all line-clamp-1"
              style={{ color: tokenColor }}
            >
              {subject} - {group}
            </span>
          </div>

          <p className="mt-1 text-sm text-white">{teacherName}</p>
        </div>
      </div>
      <hr className="border border-[#FDD9D4] border-dashed" />

      <div className="relative p-4 pl-4 bg-white rounded-xl">
        <div
          className="absolute left-0 w-1 h-12 transform -translate-y-1/2 rounded-r-full top-1/2"
          style={{ backgroundColor: tokenColor }}
        ></div>
        {isEmptySchedules ? (
          <div className="flex items-center gap-3">
            <Image src={NoTask} alt="no-task" width={50} height={50} />
            <div className="flex gap-2 flex-col sm:text-left">
              <h2 className="text-base font-[500] text-[#1D2939]">
                Tidak ada jadwal
              </h2>
              <p className="text-xs sm:text-sm text-[#555]">-</p>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-sm font-semibold font-kumbh">Jadwal</h3>
            <div className="flex flex-col gap-1 mt-1">
              {schedules
                .sort((a, b) => a.day - b.day)
                .map((schedule, index) => (
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
