import UsersAPI from '@/api/users';
import { useQuery } from '@tanstack/react-query';

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () =>
      (await UsersAPI.getAllUsers('student')).data.data.filter(
        (student) => student.status === 'active'
      ),
  });
};
