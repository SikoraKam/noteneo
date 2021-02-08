import { useMutation, useQueryClient } from 'react-query';

import { QUERY_USER_PROFILE_KEY } from '../../const/query.const';
import { useAxios } from '../useAxios';
import { UserProfilePayload } from '../../types/user/userProfilePayload';

export const useUserProfileUpdateMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

  return useMutation(
    (newProfileSettings: UserProfilePayload) =>
      axios.patch('user/profile/', {
        email: newProfileSettings.email,
        first_name: newProfileSettings.first_name,
        last_name: newProfileSettings.last_name,
      }),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_USER_PROFILE_KEY);
      },
    }
  );
};
