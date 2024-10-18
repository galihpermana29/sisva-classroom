import TeachingPlanList from "../presentation/TeachingPlanList";
import TeachingPlanListSkeleton from "../presentation/TeachingPlanListSkeleton";
import { useParams } from "next/navigation";
import { useTeachingPlan } from "../../usecase/use-teaching-plan";
import EmptyState from "../presentation/TeachingPlanEmptyState";

const TeachingPlanContainer = () => {
  const { teachingPlans, isLoading } = useTeachingPlan();

  return (
    <div className="max-w-6xl mx-auto font-normal text-black font-kumbh">
      <h1 className="text-2xl font-bold">Rencana Pembelajaran</h1>

      <div className="grid gap-4 md:mt-6">
        {isLoading ? (
          <TeachingPlanListSkeleton />
        ) : teachingPlans.length == 0 ? (
          <EmptyState className="!mt-1" />
        ) : (
          teachingPlans.map((plan, idx) => {
            return (
              <TeachingPlanList
                key={"teaching_plan" + idx}
                id={plan.id}
                title={plan.title}
                tasks={plan.tasks}
                description={plan.markdown}
                teaching_materials={plan.teaching_materials}
                teaching_goal={plan.teaching_goal}
                teaching_activity={plan.teaching_activity}
                teaching_scoring={plan.teaching_scoring}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TeachingPlanContainer;
