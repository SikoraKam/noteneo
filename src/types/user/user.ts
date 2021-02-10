export interface User {
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  address?: string;
  image?: string;
  client_id?: string;
  pk?: number;
  date_joined?: string;
  is_subscriber?: boolean;
  subscription_to?: any;
  monthly_views?: number;
  has_access?: boolean;
}
