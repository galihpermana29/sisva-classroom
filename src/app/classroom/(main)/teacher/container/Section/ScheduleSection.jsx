"use client";

import { Flex } from "antd";

import CardSchedule from "@/app/classroom/shared/presentation/Card/CardSchedule";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";

import { useGetAllTeacherClassSchedules } from "../../usecase/useGetAllTeacherClassSchedules";
import { convertTime12To24 } from "../../usecase/convertTime12To24";
import CardScheduleSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardScheduleSkeleton";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";

const ScheduleSection = () => {
  const { data: schedules, isLoading } = useGetAllTeacherClassSchedules();

  return (
    <SectionLayout title={"Jadwal Hari Ini"} divider>
      <div className="h-[228px] overflow-scroll">
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <div className="grid gap-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <CardScheduleSkeleton key={index} isEven={index % 2 == 0} />
              ))}
            </div>
          ) : !schedules | (schedules.length == 0) ? (
            <EmptyState
              title="Tidak ada jadwal"
              description="Tidak ada jadwal kelas hari ini"
            />
          ) : (
            schedules.map((schedule, index) => (
              <CardSchedule
                scheduleName={schedule.class_name}
                teacherName={schedule.teacher_name}
                time={convertTime12To24(schedule.start_time)}
                key={index}
                isEven={index % 2 == 0}
              />
            ))
          )}
        </div>
      </div>
    </SectionLayout>
  );
};

export default ScheduleSection;
