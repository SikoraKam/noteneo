import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { NoteSetScreenStackParamList } from './NoteSetScreenStack';
import { StyleSheet, Text } from 'react-native';
import { NoteView } from '../../components/note/NoteView';
import { Container } from '../../components/layout/Container';
import { useQueryClient } from 'react-query';
import { QUERY_USER_PROFILE_KEY } from '../../const/query.const';
import { useUserProfileQuery } from '../../hooks/user/useUserProfileQuery';

type NoteViewScreenProps = StackScreenProps<
  NoteSetScreenStackParamList,
  'NoteView'
>;

export const NoteViewScreen: React.FC<NoteViewScreenProps> = ({
  navigation,
  route,
}) => {
  const queryClient = useQueryClient();
  const profile = useUserProfileQuery();
  const [hasInvalidated, setHasInvalidated] = useState(false);

  /**
   * Update user has_access status
   */
  useEffect(() => {
    if (!hasInvalidated && profile.isSuccess && !profile.data.is_subscriber) {
      queryClient.invalidateQueries(QUERY_USER_PROFILE_KEY);
      setHasInvalidated(true);
    }
  }, [profile.isSuccess, hasInvalidated, profile.data]);

  return (
    <Container>
      {profile.isSuccess && profile.data.has_access && (
        <NoteView noteId={route.params.noteId} />
      )}
      {profile.isSuccess && !profile.data.has_access && (
        <Text>U has no access here</Text>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({});
