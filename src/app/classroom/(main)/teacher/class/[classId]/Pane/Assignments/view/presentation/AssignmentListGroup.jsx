import React from "react";
import TeachingPlanTitle from "../../../../view/presentation/Pane/TeachingPlan/TeachingPlanTitle";
import AssignmentCard from "./AssignmentCard";
import AssignmentCardSkeleton from "./AssignmentCardSkeleton";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";

const AssignmentListGroup = ({ assignments, isLoading }) => {
  return (
    <div className="grid mt-6 md:mt-8">
      {isLoading ? (
        <div>
          <div
            className={`relative flex items-center w-full h-10 px-2 rounded-md bg-gray-200`}
          >
            <div className="absolute top-0 bottom-0 left-0 w-[3px] my-auto bg-gray-400 h-[60%] rounded-full" />
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <AssignmentCardSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : assignments.length == 0 ? (
        <div className="mx-auto">
          <EmptyState
            title="Tidak ada Tugas Tersedia!"
            description="Tidak ada tugas yang tersedia untuk saat ini."
          />
        </div>
      ) : (
        <>
          <TeachingPlanTitle title="Termodinamika" />
          <div className="grid gap-6 mt-6 md:grid-cols-2">
            {assignments?.map((assignment, index) => (
              <AssignmentCard
                key={index}
                assignment={assignment}
                assignmentName={assignment.name}
                desc={assignment.description}
                deadline={assignment.deadline}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AssignmentListGroup;
