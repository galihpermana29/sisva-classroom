"use client";

import { Flex } from "antd";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import CardSchedule from "@/app/classroom/shared/presentation/Card/CardSchedule";
import { useGetStudentSchedule } from "@/app/classroom/(main)/student/usecase/useGetStudentSchedule";
import CardScheduleSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardScheduleSkeleton";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";

const StudentScheduleSection = () => {
  const { schedules, isLoading } = useGetStudentSchedule();
  return (
    <SectionLayout title={"Jadwal Hari Ini"} divider>
      <div className="h-[228px] overflow-auto">
        <Flex vertical gap={12}>
          {isLoading ? (
            [...new Array(3)].map((_, index) => (
              <CardScheduleSkeleton key={index} />
            ))
          ) : schedules.length > 0 ? (
            schedules.map((schedule, index) => (
              <CardSchedule
                scheduleName={schedule.subject_name}
                teacherName={schedule.teacher_name}
                time={schedule.start_time}
                key={index}
                isEven={index % 2 == 0}
              />
            ))
          ) : (
            <div className="mx-auto">
              <EmptyState
                title="Tidak ada Jadwal Tersedia!"
                description="Tidak ada jadwal yang tersedia untuk saat ini."
              />
            </div>
          )}
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default StudentScheduleSection;
