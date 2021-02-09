import { useInfiniteQuery } from 'react-query';

import { useAxios } from '../useAxios';
import { QUERY_NOTES_KEY } from '../../const/query.const';
import { NoteListResponse } from '../../types/notes/noteListResponse';

const PAGE_SIZE = 10;

export const useNotesFromCategoryQuery = ({
  page = 1,
  category,
}: {
  page: number;
  category: string;
}) => {
  const axios = useAxios();

  return useInfiniteQuery<NoteListResponse>(
    `${QUERY_NOTES_KEY}/${category}`,
    async ({ pageParam = page }) => {
      const response = await axios.get(
        `notes/?category=${category}&page=${pageParam}&page_size=${PAGE_SIZE}`
      );

      return response.data;
    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => {
        return lastPage.next ? lastPage.current + 1 : false;
      },
    }
  );
};
