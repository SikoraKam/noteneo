export interface UserProfileResponse {
  pk: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  date_joined: string;
  address?: string;
  is_subscriber: boolean;
  subscription_to?: any;
}
