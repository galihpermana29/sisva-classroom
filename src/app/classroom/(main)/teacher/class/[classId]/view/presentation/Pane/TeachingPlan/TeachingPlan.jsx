"use client";

import { Plus } from "@untitled-ui/icons-react";

import SisvaButton from "src/app/classroom/shared/presentation/Button/GlobalButton";
import EmptyState from "../../EmptyState/EmptyState";
import TeachingPlanList from "./TeachingPlanList";

import { useTeachingPlan } from "../../../../usecase/hooks/use-teaching-plan";
import TeachingPlanTitle from "./TeachingPlanTitle";

const TeachingPlanPane = () => {
  const { teachingPlans, isLoading } = useTeachingPlan();

  return (
    <div className="font-normal max-w-6xl mx-auto text-black font-kumbh">
      <div className="hidden md:flex items-center justify-between">
        <h1 className="text-2xl font-bold">Rencana Pembelajaran</h1>
        <SisvaButton className="font-bold" icon={<Plus className="size-5" />}>
          <span className="text-sm font-bold">Tambah Rencana</span>
        </SisvaButton>
      </div>

      <div className="md:mt-6">
        {isLoading ? (
          <div>loading...</div>
        ) : teachingPlans.length == 0 ? (
          <>
            <TeachingPlanTitle title="Add Topics" />
            <EmptyState />
          </>
        ) : (
          <div className="grid gap-4 divide-y">
            {teachingPlans.map((plan, idx) => (
              <TeachingPlanList
                key={"teaching_plan" + idx}
                id={plan.id}
                title={plan.title}
                tasks={plan.tasks}
                description={plan.description}
                teaching_materials={plan.teaching_materials}
                teaching_goal={plan.teaching_goal}
                teaching_activity={plan.teaching_activity}
                teaching_scoring={plan.teaching_scoring}
              />
            ))}

            <TeachingPlanTitle title="Add Topics" />
            <EmptyState className="!mt-1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachingPlanPane;
