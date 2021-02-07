import { useQuery } from 'react-query';

import { useAxios } from '../useAxios';
import { QUERY_USER_NOTES_KEY } from '../../const/query.const';
import { NoteListResponse } from '../../types/notes/noteListResponse';

const PAGE_SIZE = 10;

export const useNoteListQuery = (page: number) => {
  const axios = useAxios();

  return useQuery<NoteListResponse>(
    [QUERY_USER_NOTES_KEY, page],
    async () => {
      const response = await axios.get(
        `user/my-notes/?page=${page}&page_size=${PAGE_SIZE}`
      );

      return response.data;
    },
    { keepPreviousData: true }
  );
};
