import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";

export function resturctureTeachingMaterialList(
  teachingPlans,
  teachingMaterials
) {
  const userData = getClientSession();
  const userId = userData?.id;

  const combinedData = teachingPlans
    .map((item) => {
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

      if (matchedMaterials.length > 0) {
        return {
          topic: item.title,
          items: matchedMaterials,
        };
      }
      return null;
    })
    .filter(Boolean);

  return combinedData;
}

export function restructTeachingMaterialListRpp(
  teachingPlans,
  teachingMaterials
) {
  const combinedData = teachingPlans
    .map((item) => {
      const matchedMaterials = item.teaching_materials
        .map((material) =>
          teachingMaterials.find((tm) => tm.id === material.id)
        )
        .filter(Boolean);

      if (matchedMaterials.length > 0) {
        return {
          topic: item.title,
          items: matchedMaterials,
        };
      }
      return null;
    })
    .filter(Boolean);

  return combinedData;
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
