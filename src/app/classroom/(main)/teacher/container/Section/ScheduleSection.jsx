"use client";


import CardSchedule from "@/app/classroom/shared/presentation/Card/CardSchedule";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import CardScheduleSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardScheduleSkeleton";

import { convertTime12To24 } from "../../usecase/convertTime12To24";
import { useGetAllTeacherClassSchedules } from "../../usecase/useGetAllTeacherClassSchedules";

const ScheduleSection = () => {
  const { data: schedules, isLoading } = useGetAllTeacherClassSchedules();

  return (
    <SectionLayout title={"Jadwal Hari Ini"} divider>
      <div className="h-[228px] overflow-scroll">
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <div className="grid gap-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <CardScheduleSkeleton key={index} />
              ))}
            </div>
          ) : !schedules | schedules.length == 0 ? (
            <div
              className="mx-auto"
            >
              <EmptyState
                title="Tidak ada jadwal"
                description="Tidak ada jadwal kelas hari ini"
              />
            </div>
          ) : (
            schedules.map((schedule, index) => (
              <CardSchedule
                scheduleName={schedule.class_name}
                teacherName={schedule.teacher_name}
                time={schedule.start_time.split(" ")[0]}
                key={index}
              />
            ))
          )}
        </div>
      </div>
    </SectionLayout>
  );
};

export default ScheduleSection;
