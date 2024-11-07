import UsersAPI from '@/api/users';
import type { User } from '@/globalcomponents/BERespondTypes';
import { useQuery } from '@tanstack/react-query';

export const useTeachers = () => {
  return useQuery<User[]>({
    queryKey: ['teachers'],
    queryFn: async () =>
      (await UsersAPI.getAllUsers('teacher')).data.data.filter(
        (student: User) => student.status === 'active'
      ),
  });
};
