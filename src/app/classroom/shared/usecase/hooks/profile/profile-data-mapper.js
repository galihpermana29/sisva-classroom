export const destructProfileData = (data) => {
  const detailData = JSON.parse(data?.detail.json_text);
  return {
    ...data,
    detail: {
      json_text: detailData,
      total_teaching_hours: data?.detail.total_teaching_hours,
    },
  };
};
