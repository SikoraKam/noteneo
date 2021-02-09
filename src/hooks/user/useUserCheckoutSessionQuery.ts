import { useQuery } from 'react-query';

import { QUERY_USER_CHECKOUT_SESSION } from '../../const/query.const';
import { useAxios } from '../useAxios';
import { getAccessToken } from '../../utils/tokenUtils';

export const useUserCheckoutSessionQuery = () => {
  const axios = useAxios();

  return useQuery<string>(QUERY_USER_CHECKOUT_SESSION, async () => {
    const token = await getAccessToken();
    console.log(token);
    const response = await axios.get<string>('subscriptions/stripe/session/');
    return response.data;
  });
};
