import { getTeachingMaterialList } from "../../teaching-material/repository/teaching-material-service";
import { getTeachingPlans } from "./Pane/TeachingPlan/repository/teaching-plan-service";
import ClassDetailContainer from "./view/container/ClassDetailContainer";

async function getClassDetailPageData(classId) {
  const [teachingPlanData, teachingMaterialData] = await Promise.all([
    getTeachingPlans(),
    getTeachingMaterialList(classId, "", "", ""),
  ]);

  return {
    teachingPlanData: teachingPlanData.success
      ? teachingPlanData.data.filter((plan) => {
          return plan.class_id === parseInt(classId);
        })
      : null,
    teachingMaterialData: teachingMaterialData.success
      ? teachingMaterialData.data
      : null,
  };
}
const TeachingPlanPage = async ({ params }) => {
  const { classId } = params;
  const initialData = await getClassDetailPageData(classId);
  return <ClassDetailContainer initialData={initialData} />;
};

export default TeachingPlanPage;
