import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";
import { Plus } from "@untitled-ui/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import EmptyState from "../../../../view/presentation/EmptyState/EmptyState";
import { useTeachingPlan } from "../../usecase/use-teaching-plan";
import TeachingPlanList from "../presentation/TeachingPlanList";
import TeachingPlanListSkeleton from "../presentation/TeachingPlanListSkeleton";
import TeachingPlanTitle from "../presentation/TeachingPlanTitle";

const TeachingPlanContainer = () => {
  const { classId } = useParams();
  const { teachingPlans, isLoading } = useTeachingPlan();

  return (
    <div className="max-w-6xl mx-auto font-normal text-black font-kumbh">
      <div className="items-center justify-between hidden md:flex">
        <h1 className="text-2xl font-bold">Rencana Pembelajaran</h1>
        <Link href={`/classroom/teacher/class/${classId}/create-rpp`}>
          <SisvaButton className="font-bold" icon={<Plus className="size-5" />}>
            <span className="text-sm font-bold">Tambah Rencana</span>
          </SisvaButton>
        </Link>
      </div>

      <div className="grid gap-4 md:mt-6">
        {isLoading ? (
          <TeachingPlanListSkeleton />
        ) : (
          teachingPlans?.map((plan, idx) => {
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

        <TeachingPlanTitle title="Add Topics" />
        <EmptyState className="!mt-1" />
      </div>
    </div>
  );
};

export default TeachingPlanContainer;
