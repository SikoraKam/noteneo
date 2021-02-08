import { UserProfileResponse } from '../user/userProfileResponse';

export interface Note {
  id: number;
  title: string;
  content: string;
  categories: []; //TODO: ZMIENIC NA CATEGORY GDY DOSTEPNE
  author: UserProfileResponse;
  likes_count: number;
}
