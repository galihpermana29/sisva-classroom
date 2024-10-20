import React from "react";
import Image from "next/image";

import NoTask from "@/assets/classroom/images/NoTask.png";
import SisvaCard from "@/app/classroom/(main)/teacher/class/view/presentation/SisvaCard";
import DefaultProfileImage from "@/assets/images/Profile.png";
import { generalDateFormatter } from "@/app/classroom/shared/usecase/helper";
import AvatarProfile from "@/app/classroom/shared/presentation/Profile/AvatarProfile";

const ClassCard = ({
  subject,
  group,
  taskName,
  teacherName,
  teacherPhoto,
  timeStamp,
  isEmptyTask,
}) => {
  return (
    <SisvaCard className="flex flex-col gap-7">
      <div className="flex gap-2">
        <AvatarProfile url={teacherPhoto} size={48}/>
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

      <div className="relative p-4 pl-4 bg-white rounded-xl">
        <div className="absolute left-0 w-1 h-12 transform -translate-y-1/2 rounded-r-full top-1/2 bg-primary"></div>
        {isEmptyTask ? (
          <div className="flex items-center gap-3">
            <Image src={NoTask} alt="no-task" width={50} />
            <div className="flex flex-col">
              <h2 className="text-lg font-[500] text-[#1D2939]">
                Kerja Bagus!
              </h2>
              <p className="text-sm text-[#555] line-clamp-1 break-all">
                Semua tugas telah terselesaikan!
              </p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-[500] text-[#1D2939] mb-1">
              {taskName}
            </h2>
            <p className="text-sm text-[#555]">
              {generalDateFormatter(timeStamp)}
            </p>
          </>
        )}
      </div>
    </SisvaCard>
  );
};

export default ClassCard;
