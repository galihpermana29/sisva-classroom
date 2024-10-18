import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";

export function restructureTeachingMaterialList(
  teachingPlans,
  teachingMaterials
) {
  const userData = getClientSession();
  const userId = userData?.id;

  return teachingPlans
    .map((item) => {
      if (!item.teaching_materials) return null;

      const matchedMaterials = item.teaching_materials
        .map((material) => {
          const fullMaterial = teachingMaterials.find(
            (tm) => tm.id === material.id
          );
          if (fullMaterial) {
            return {
              ...fullMaterial,
              isOwner: fullMaterial.create_by === userId,
            };
          }
          return null;
        })
        .filter(Boolean);

      return matchedMaterials.length > 0
        ? { topic: item.title, items: matchedMaterials }
        : null;
    })
    .filter(Boolean);
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
