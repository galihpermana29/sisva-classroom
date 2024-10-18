import React from "react";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import AssignmentCard from "./AssignmentCard";
import TeachingPlanTitle from "@/app/classroom/(main)/teacher/class/[classId]/Pane/TeachingPlan/view/presentation/TeachingPlanTitle";
import AssignmentCardSkeleton from "./AssignmentCardSkeleton";
import TitleBarSkeleton from "./TitleBarSkeleton";

const AssignmentListGroup = ({ assignmentGroups, isLoading }) => {
  return (
    <div className="grid mt-6 md:mt-8">
      {isLoading ? (
        <div>
          <TitleBarSkeleton />
          <div className="grid gap-6 mt-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <AssignmentCardSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : assignmentGroups?.length == 0 ? (
        <div className="mx-auto">
          <EmptyState
            title="Tidak ada Tugas Tersedia!"
            description="Tidak ada tugas yang tersedia untuk saat ini."
          />
        </div>
      ) : (
        assignmentGroups.map((group, index) => (
          <div key={"assignment_group_" + index} className="mt-6 first:mt-0">
            <TeachingPlanTitle title={group.title} />
            <div className="grid gap-6 mt-3 md:grid-cols-2">
              {group.tasks.map((assignment, index) => (
                <AssignmentCard
                  key={index}
                  assignment={assignment}
                  assignmentName={assignment.name}
                  desc={assignment.description}
                  deadline={assignment.deadline}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AssignmentListGroup;
