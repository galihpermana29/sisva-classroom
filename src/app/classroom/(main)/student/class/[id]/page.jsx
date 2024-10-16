import { getTeachingPlans } from "../../../teacher/class/[classId]/Pane/TeachingPlan/repository/teaching-plan-service";
import { getTeachingMaterialList } from "../../../teacher/teaching-material/repository/teaching-material-service";
import ClassDetailContainer from "./view/container/ClassDetailContainer";

async function getClassDetailPageData(classId) {
  const [teachingPlanData, teachingMaterialData] = await Promise.all([
    getTeachingPlans(),
    getTeachingMaterialList(classId, "", "", ""),
  ]);

  return {
    teachingPlanData: teachingPlanData.success ? teachingPlanData.data : null,
    teachingMaterialData: teachingMaterialData.success
      ? teachingMaterialData.data
      : null,
  };
}
export default async function page({ params }) {
  const { id } = params;
  const initialData = await getClassDetailPageData(id);
  return <ClassDetailContainer initialData={initialData} />;
}
