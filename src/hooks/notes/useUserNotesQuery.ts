import { useInfiniteQuery } from 'react-query';

import { useAxios } from '../useAxios';
import { QUERY_USER_NOTES_KEY } from '../../const/query.const';
import { NoteListResponse } from '../../types/notes/noteListResponse';

const PAGE_SIZE = 10;

export const useUserNoteListQuery = ({ page = 1 }) => {
  const axios = useAxios();

  return useInfiniteQuery<NoteListResponse>(
    QUERY_USER_NOTES_KEY,
    async ({ pageParam = page }) => {
      const response = await axios.get(
        `notes/my-notes/?page=${pageParam}&page_size=${PAGE_SIZE}`
      );

      return response.data;
    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => {
        return lastPage.next ? 2 : false; //TODO: zmienic po aktualizacji backendu
      },
    }
  );
};
