import AcademicAPI from '@/api/academic';
import { useQuery } from '@tanstack/react-query';

export const useExtracurriculars = () => {
  return useQuery({
    queryKey: ['extracurriculars'],
    queryFn: async () => (await AcademicAPI.getAllExtra()).data.data,
  });
};
