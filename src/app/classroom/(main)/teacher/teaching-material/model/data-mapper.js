import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";

export function resturctureTeachingMaterialList(data) {
  const userData = getClientSession();
  const userId = userData?.id;

  const mappedData = Object.values(
    data.reduce((acc, item) => {
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

  return mappedData;
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
