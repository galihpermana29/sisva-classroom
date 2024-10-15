import React from "react";
import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";
import { useParams, useRouter } from "next/navigation";

const AssignmentCard = ({ assignment, assignmentName, desc, deadline }) => {
  const router = useRouter();
  const { classId } = useParams();

  return (
    <div className="p-4 rounded-md shadow-card">
      <h3 className="text-xl">{assignmentName}</h3>

      <div className="pl-4">
        <CardSection title="Deadline">
          <p>{deadline.replace("+00:00", "")}</p>
        </CardSection>

        <CardSection title="Deskripsi">
          <div
            className="h-10 border line-clamp-2"
            dangerouslySetInnerHTML={{ __html: desc }}
          ></div>
        </CardSection>
      </div>

      <div className="grid mt-6">
        <SisvaButton
          onClick={() =>
            router.push(
              `/classroom/teacher/class/${classId}/task/${assignment.id}`
            )
          }
        >
          Detail
        </SisvaButton>
      </div>
    </div>
  );
};

export default AssignmentCard;

const CardSection = ({ title, children }) => {
  return (
    <div className="mt-4">
      <h3 className="text-xs font-semibold">{title}</h3>
      <div className="grid gap-4 text-sm">{children}</div>
    </div>
  );
};
