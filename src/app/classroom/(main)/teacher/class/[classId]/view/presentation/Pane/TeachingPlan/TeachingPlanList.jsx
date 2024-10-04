import Image from "next/image";
import { Fragment } from "react";

import PopOverActions from "./PopOverActions";
import TeachingPlanSection from "./TeachingPlanSection";
import TeachingPlanTitle from "./TeachingPlanTitle";

import MaterialIcon from "@/assets/images/teaching-plan/material.svg";
import TaskIcon from "@/assets/images/teaching-plan/task.png";

const TeachingPlanList = ({
  id,
  title,
  description,
  teaching_materials,
  tasks,
  teaching_goal,
  teaching_activity,
  teaching_scoring,
}) => {
  return (
    <Fragment>
      <TeachingPlanTitle title={title} prefix={<PopOverActions id={id} />} />
      <TeachingPlanSection title="Deskripsi" content={description} />
      {teaching_materials.map((material, idx) => (
        <TeachingPlanSection
          key={"teaching_materials" + idx}
          title={
            <div className="flex items-center gap-2">
              <Image
                src={MaterialIcon}
                alt="Materi"
                width={20}
                height={20}
              />
              <span className="font-medium">{material.description}</span>
            </div>
          }
        />
        //   {/* material.attachment_file_uri */}
      ))}
      {tasks?.map((task, idx) => (
        <TeachingPlanSection
          title={
            <div className="flex items-center gap-2">
              <Image
                src={TaskIcon}
                alt="Tugas"
                width={20}
                height={20}
              />
              <span className="font-medium">{task.name}</span>
            </div>
          }
        />
        //   {/* task.attachment_file_uri */}
      ))}
      <TeachingPlanSection
        title="Tujuan Pembelajaran"
        content={teaching_goal}
      />
      <TeachingPlanSection
        title="Kegiatan Pembelajaran"
        content={teaching_activity}
      />
      <TeachingPlanSection title="Penilaian" content={teaching_scoring} />

      <hr className="bg-base40 h-[1px] last:hidden" />
    </Fragment>
  );
};

export default TeachingPlanList;
