import { Note } from './note';

export interface NoteResponse extends Note {
  created_at: string;
  updated_at: string;
}
