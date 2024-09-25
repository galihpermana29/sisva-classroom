import { Flex } from "antd";
import CardTask from "@/app/classroom/shared/presentation/Card/CardTask";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";

const MyTask = () => {
  return (
    <SectionLayout title={"Tugas yang Akan Datang"}>
      <div className="lg:h-[228px] overflow-scroll">
        <Flex gap={12} className="flex-row lg:flex-col ">
          {[...new Array(10)].map((_, index) => (
            <CardTask
              deadline={"16/01/2023 23:59"}
              teacherName={"Bimo Arief"}
              taskName={"TUGAS 1"}
              lessonName={"TIK"}
              key={index}
            />
          ))}
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default MyTask;
