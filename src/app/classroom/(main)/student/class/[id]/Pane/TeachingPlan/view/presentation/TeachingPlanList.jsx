import Image from "next/image";
import { Fragment } from "react";

import TeachingPlanSection from "./TeachingPlanSection";
import TeachingPlanTitle from "./TeachingPlanTitle";

import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";
import MaterialIcon from "@/assets/images/teaching-plan/material.svg";
import TaskIcon from "@/assets/images/teaching-plan/task.png";
import Link from "next/link";
import { useParams } from "next/navigation";
import process from "node:process";

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
  const userData = getClientSession();
  const schoolId = userData?.school_id;
  const { id: classId } = useParams();

  return (
    <Fragment>
      <TeachingPlanTitle title={title} />
      <TeachingPlanSection title="Deskripsi" htmlContent={description} />
      <TeachingPlanSection
        title="Bahan Ajar"
        content={
          <div className="grid gap-3 mt-2">
            {teaching_materials.map((material, idx) => (
              <a
                key={"materials_" + idx}
                className="flex items-center gap-2 text-black"
                href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/v1/files/${material.attachment_file_uri}?school_id=${schoolId}`}
              >
                <Image src={MaterialIcon} alt="Materi" width={20} height={20} />
                <span className="font-medium">{material.description}</span>
              </a>
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
              <Link 
                href={`/classroom/student/class/${classId}/task/${task.id}`}
              key={"tasks_" + idx} className="flex items-center gap-2">
                <Image src={TaskIcon} alt="Tugas" width={20} height={20} />
                <span className="font-medium">{task.name}</span>
              </Link>
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
