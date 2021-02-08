import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { NoteSetScreenStackParamList } from './NoteSetScreenStack';
import { useNoteListQuery } from '../../hooks/notes/useNoteListQuery';
import { NoteList } from '../../components/note/NoteList';
import { ListPlaceholder } from '../../utils/ListPlaceholder';
import { NoteResponse } from '../../types/notes/noteResponse';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Container } from '../../components/layout/Container';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'react-native-paper';
import { AppText } from '../../components/shared/AppText';
import { theme } from '../../theme';

type NoteBrowserScreenProps = StackScreenProps<
  NoteSetScreenStackParamList,
  'NoteBrowser'
>;

export const NoteBrowserScreen: React.FC<NoteBrowserScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();
  const noteList = useNoteListQuery({ page: 1 });
  const [isLoading, setLoading] = useState(true);

  const noteListReduced = useMemo(() => {
    const initialLoad =
      (noteList.isFetching || noteList.isError) && !noteList.isFetchingNextPage;

    if (initialLoad) {
      setLoading(true);
      return [];
    }

    setLoading(false);

    return noteList.data!.pages.reduce((list, page) => {
      return [...list, ...page.results];
    }, [] as NoteResponse[]);
  }, [
    noteList.isFetching,
    noteList.isError,
    noteList.isFetchingNextPage,
    noteList.data,
  ]);

  return (
    <Container>
      <View style={styles.noteList}>
        {!isLoading ? (
          <NoteList
            onListEndReached={() => {
              if (noteList.hasNextPage) {
                noteList.fetchNextPage();
              }
            }}
            noteList={noteListReduced}
          />
        ) : (
          <ListPlaceholder placeholderCount={5} />
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  noteList: {
    marginTop: 20,
    marginBottom: 20,
  },
});
