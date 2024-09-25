import React from "react";
import Cardtask from "@/app/classroom/shared/presentation/Card/CardTask";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import { Flex } from "antd";
import styles from "./TaskSection.module.css";

const TaskSection = () => {
  return (
    <SectionLayout title="Tugasku">
      <div className={`md:h-[225px] overflow-y-auto ${styles.scrollableDiv}`}>
        <Flex className="flex-row lg:flex-col md:gap-3">
          <Cardtask
            deadline={"16/01/2023 23:59"}
            teacherName={"Bimo Arief"}
            taskName={"TUGAS 1"}
            lessonName={"TIK"}
          />
          <Cardtask
            deadline={"16/01/2023 23:59"}
            teacherName={"Bimo Arief"}
            taskName={"TUGAS 1"}
            lessonName={"TIK"}
          />
          <Cardtask
            deadline={"16/01/2023 23:59"}
            teacherName={"Bimo Arief"}
            taskName={"TUGAS 1"}
            lessonName={"TIK"}
          />
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default TaskSection;
