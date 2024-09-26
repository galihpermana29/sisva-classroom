"use client";

import { Flex } from "antd";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import CardSchedule from "@/app/classroom/shared/presentation/Card/CardSchedule";
import { useGetStudentSchedule } from "@/app/classroom/(main)/student/usecase/useGetStudentSchedule";
import CardScheduleSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardScheduleSkeleton";

const StudentScheduleSection = () => {
  const { schedules, isLoading } = useGetStudentSchedule();
  return (
    <SectionLayout title={"Jadwal Hari Ini"} divider>
      <div className="h-[228px] overflow-scroll">
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
            <div>
              <p>Tidak ada jadwal</p>
            </div>
          )}
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default StudentScheduleSection;
