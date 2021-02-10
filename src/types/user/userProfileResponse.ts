import { User } from './user';

export interface UserProfileResponse extends User {
  pk: number;
  date_joined: string;
  is_subscriber: boolean;
  is_subscription_cancelled: boolean;
  subscription_to?: any;
  monthly_views: number;
  has_access: boolean;
}
