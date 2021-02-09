import { useQuery } from 'react-query';

import { QUERY_NOTES_CATEGORIES_KEY } from '../../const/query.const';
import { useAxios } from '../useAxios';
import { Category } from '../../types/notes/category';

export const useCategoryListQuery = () => {
  const axios = useAxios();

  return useQuery<Category[]>(QUERY_NOTES_CATEGORIES_KEY, async () => {
    const response = await axios.get<Category[]>('notes/categories/');
    return response.data;
  });
};
