import { useMutation, useQueryClient } from 'react-query';

import { QUERY_USER_PROFILE_KEY } from '../../const/query.const';
import { useAxios } from '../useAxios';

export const useUpdateAvatarMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

  return useMutation(
    (avatarUri: string) => {
      const uriParts = avatarUri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const formData = new FormData();
      formData.append(
        'image',
        JSON.parse(
          JSON.stringify({
            uri: avatarUri,
            type: `image/${fileType}`,
            name: `image.${fileType}`,
          })
        )
      );

      return axios.patch(`user/profile/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    {
      onSuccess: () => {
        queryCache.refetchQueries(QUERY_USER_PROFILE_KEY, { active: true });
      },
    }
  );
};
