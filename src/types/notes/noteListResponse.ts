import { Note } from './note';
import { NoteResponse } from './noteResponse';

export interface NoteListResponse {
  countItemsOnPage: number;
  next: string | null;
  previous: string | null;
  results: NoteResponse[];
  current: number;
}
