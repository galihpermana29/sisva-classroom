import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";

export function restructureTeachingMaterialList(teachingMaterials) {
  const userData = getClientSession();
  const userId = userData?.id;

  const groupBySubject = Object.values(
    teachingMaterials.reduce((acc, item) => {
      if (!acc[item.subject_name]) {
        acc[item.subject_name] = {
          topic: item.subject_name,
          items: [],
        };
      }

      acc[item.subject_name].items.push({
        ...item,
        isOwner: item.create_by === userId,
      });

      return acc;
    }, {})
  );

  return groupBySubject;
}

export function restructTeachingMaterialListRpp(
  teachingPlans,
  teachingMaterials
) {
  return teachingPlans
    .map((item) => {
      if (!item.teaching_materials) return null;

      const matchedMaterials = item.teaching_materials
        .map((material) =>
          teachingMaterials.find((tm) => tm.id === material.id)
        )
        .filter(Boolean);

      return matchedMaterials.length > 0
        ? { topic: item.title, items: matchedMaterials }
        : null;
    })
    .filter(Boolean);
}

export function mapTeacherName(data) {
  return data.map((item) => item.id);
}

export function searchFilter(filteredTeachingMaterialList, searchTerm) {
  return filteredTeachingMaterialList.filter(
    (materialItem) =>
      materialItem.subject_name.toLowerCase().includes(searchTerm) ||
      materialItem.description.toLowerCase().includes(searchTerm) ||
      materialItem.study_program_name.toLowerCase().includes(searchTerm)
  );
}
