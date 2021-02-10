import { useMutation, useQueryClient } from 'react-query';

import {
  QUERY_NOTES_KEY,
  QUERY_USER_PROFILE_KEY,
} from '../../const/query.const';
import { useAxios } from '../useAxios';
import { NotePayload } from '../../types/notes/notePayload';

export const useSaveNoteMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

  return useMutation(
    (notePayload: NotePayload) => {
      return axios.post('notes/', {
        title: notePayload.title,
        categories: [{ name: notePayload.category }],
        content: notePayload.content,
      });
    },
    {
      onSuccess: async () => {
        await queryCache.invalidateQueries(QUERY_NOTES_KEY);
        await queryCache.refetchQueries(QUERY_USER_PROFILE_KEY);
      },
    }
  );
};
