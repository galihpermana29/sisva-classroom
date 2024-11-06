import AcademicAPI from '@/api/academic';
import { useQuery } from '@tanstack/react-query';

export const useExtracurricularMembers = () => {
  return useQuery({
    queryKey: ['extracurricular-members'],
    queryFn: async () => (await AcademicAPI.getAllExtraStudent()).data.data,
  });
};
