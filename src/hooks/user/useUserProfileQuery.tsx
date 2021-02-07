import { useQuery } from 'react-query';

import { QUERY_USER_PROFILE_KEY } from '../../const/query.const';
import { UserProfileResponse } from '../../types/user/userProfileResponse';
import { useAxios } from '../useAxios';

export const useUserProfileQuery = () => {
  const axios = useAxios();

  return useQuery<UserProfileResponse>(QUERY_USER_PROFILE_KEY, async () => {
    const response = await axios.get<UserProfileResponse>('user');
    return response.data;
  });
};
