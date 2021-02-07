import { UserProfileResponse } from '../user/userProfileResponse';

export interface NoteResponse {
  id: number;
  title: string;
  content: string;
  categories: []; //TODO: ZMIENIC NA CATEGORY GDY DOSTEPNE
  author: UserProfileResponse;
  likes_count: number;
  created_at?: Date;
  updated_at?: Date;
}
