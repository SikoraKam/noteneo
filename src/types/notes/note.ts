import { UserProfileResponse } from '../user/userProfileResponse';
import { Category } from './category';

export interface Note {
  id: number;
  title: string;
  content: string;
  categories: Category[];
  author: UserProfileResponse;
  likes_count: number;
}
