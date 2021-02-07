import { NoteResponse } from './noteResponse';

export interface NoteListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NoteResponse[];
}
