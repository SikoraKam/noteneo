import { useMutation, useQueryClient } from 'react-query';

import { QUERY_USER_PROFILE_KEY } from '../../const/query.const';
import { useAxios } from '../useAxios';

export const useCancelSubscriptionMutation = () => {
  const axios = useAxios();
  const queryCache = useQueryClient();

  return useMutation(() => axios.delete('subscriptions/stripe/cancel/'), {
    onSuccess: () => {
      queryCache.invalidateQueries(QUERY_USER_PROFILE_KEY);
    },
  });
};
