import { Fragment } from "react";
import Image from "next/image";

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
      <TeachingPlanTitle title={title} />
      <TeachingPlanSection title="Deskripsi" htmlContent={description} />
      <TeachingPlanSection
        title="Bahan Ajar"
        content={
          <div className="grid gap-3 mt-2">
            {teaching_materials.map((material, idx) => (
              <div key={"materials_" + idx} className="flex items-center gap-2">
                <Image src={MaterialIcon} alt="Materi" width={20} height={20} />
                <span className="font-medium">{material.description}</span>
              </div>
              //   {/* material.attachment_file_uri */}
            ))}
          </div>
        }
      />

      <TeachingPlanSection
        title="Tugas"
        content={
          <div className="grid gap-3 mt-2">
            {tasks?.map((task, idx) => (
              <div key={"tasks_" + idx} className="flex items-center gap-2">
                <Image src={TaskIcon} alt="Tugas" width={20} height={20} />
                <span className="font-medium">{task.name}</span>
              </div>
              //   {/* task.attachment_file_uri */}
            ))}
          </div>
        }
      />

      <TeachingPlanSection
        title="Tujuan Pembelajaran"
        htmlContent={teaching_goal}
      />
      <TeachingPlanSection
        title="Kegiatan Pembelajaran"
        htmlContent={teaching_activity}
      />
      <TeachingPlanSection title="Penilaian" htmlContent={teaching_scoring} />

      <hr className="bg-base40 h-[1px] last:hidden" />
    </Fragment>
  );
};

export default TeachingPlanList;
