import AcademicAPI from '@/api/academic';
import type { Extracurricular } from '@/globalcomponents/BERespondTypes';
import { useQuery } from '@tanstack/react-query';

export const useExtracurriculars = () => {
  return useQuery<Extracurricular[]>({
    queryKey: ['extracurriculars'],
    queryFn: async () => (await AcademicAPI.getAllExtra()).data.data,
  });
};
