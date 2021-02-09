import { useQuery } from 'react-query';

import { QUERY_NOTES_KEY } from '../../const/query.const';
import { useAxios } from '../useAxios';
import { NoteResponse } from '../../types/notes/noteResponse';

export const useNoteByIdQuery = (noteId: number) => {
  const axios = useAxios();

  return useQuery<NoteResponse>(`${QUERY_NOTES_KEY}/${noteId}`, async () => {
    const response = await axios.get<NoteResponse>(`notes/${noteId}`);
    return response.data;
  });
};
