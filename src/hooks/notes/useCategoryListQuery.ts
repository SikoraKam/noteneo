import { useQuery } from 'react-query';

import { QUERY_USER_PROFILE_KEY } from '../../const/query.const';
import { useAxios } from '../useAxios';
import { Category } from '../../types/notes/category';

export const useCategoryListQuery = () => {
  const axios = useAxios();

  return useQuery<Category[]>(QUERY_USER_PROFILE_KEY, async () => {
    const response = await axios.get<Category[]>('notes/categories/');
    return response.data;
  });
};
