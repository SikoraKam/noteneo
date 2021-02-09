import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { ProfileScreenStackParamList } from './ProfileScreenStack';
import { ListPlaceholder } from '../../utils/ListPlaceholder';
import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../components/shared/AppText';
import { useUserProfileQuery } from '../../hooks/user/useUserProfileQuery';
import { useUserNoteListQuery } from '../../hooks/notes/useUserNotesQuery';
import { NoteResponse } from '../../types/notes/noteResponse';
import { NoteList } from '../../components/note/NoteList';

type ProfileScreenProps = StackScreenProps<
  ProfileScreenStackParamList,
  'Profile'
>;

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const profile = useUserProfileQuery();
  const userNoteList = useUserNoteListQuery({ page: 1 });
  const [isLoading, setLoading] = useState(true);

  const userNoteListReduced = useMemo(() => {
    const initialLoad =
      (userNoteList.isFetching || userNoteList.isError) &&
      !userNoteList.isFetchingNextPage;

    if (initialLoad) {
      setLoading(true);
      return [];
    }

    setLoading(false);

    return userNoteList.data!.pages.reduce((list, page) => {
      return [...list, ...page.results];
    }, [] as NoteResponse[]);
  }, [
    userNoteList.isFetching,
    userNoteList.isError,
    userNoteList.isFetchingNextPage,
    userNoteList.data,
  ]);

  return (
    <ContainerWithAvatar
      avatar={{ uri: profile.data?.image }}
      isLoading={profile.isFetching}>
      <View style={styles.meta}>
        <AppText variant="h1">{profile.data?.first_name}</AppText>
        <AppText variant="h3">
          Konto: {profile.data?.is_subscriber ? 'Premium' : 'Podstawowe'}
        </AppText>
      </View>
      {!isLoading ? (
        <NoteList
          onItemPressed={(noteId) => navigation.push('NoteView', { noteId })}
          onListEndReached={() => {
            if (userNoteList.hasNextPage) {
              userNoteList.fetchNextPage();
            }
          }}
          noteList={userNoteListReduced}
        />
      ) : (
        <ListPlaceholder placeholderCount={5} />
      )}
    </ContainerWithAvatar>
  );
};

const styles = StyleSheet.create({
  meta: {
    alignItems: 'center',
    marginBottom: 24,
  },
});
