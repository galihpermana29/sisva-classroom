"use client";

import { Flex } from "antd";

import CardSchedule from "@/app/classroom/shared/presentation/Card/CardSchedule";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";

import { useGetAllTeacherClassSchedules } from "../../usecase/useGetAllTeacherClassSchedules";

const ScheduleSection = () => {
  const { data: schedules, isLoading } = useGetAllTeacherClassSchedules();

  return (
    <SectionLayout title={"Jadwal Hari Ini"} divider>
      <div className="h-[228px] overflow-scroll">
        <Flex vertical gap={12}>
          {isLoading ? (
            <div className="grid gap-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg flex h-[70px] gap-3 animate-pulse bg-text_description md:mr-3"
                ></div>
              ))}
            </div>
          ) : (
            schedules.map((schedule, index) => (
              <CardSchedule
                scheduleName={schedule.class_name}
                teacherName={schedule.teacher_name}
                time={schedule.start_time}
                key={index}
                isEven={index % 2 == 0}
              />
            ))
          )}
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default ScheduleSection;
