import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { Container } from '../../components/layout/Container';
import { CategoriesScreenStackParamList } from './CategoriesScreenStack';
import { StyleSheet, View } from 'react-native';
import { NoteList } from '../../components/note/NoteList';
import { ListPlaceholder } from '../../utils/ListPlaceholder';
import { NoteResponse } from '../../types/notes/noteResponse';
import { useNotesFromCategoryQuery } from '../../hooks/notes/notesFromCategoryQuery';
import { AppText } from '../../components/shared/AppText';

type NotesFromCategoryScreenProps = StackScreenProps<
  CategoriesScreenStackParamList,
  'NotesFromCategory'
>;

export const NotesFromCategoryScreen: React.FC<NotesFromCategoryScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();

  const notesFromCategory = useNotesFromCategoryQuery({
    page: 1,
    category: route.params.category,
  });
  const [isLoading, setLoading] = useState(true);

  const noteListReduced = useMemo(() => {
    const initialLoad =
      (notesFromCategory.isFetching || notesFromCategory.isError) &&
      !notesFromCategory.isFetchingNextPage;

    if (initialLoad) {
      setLoading(true);
      return [];
    }

    setLoading(false);

    return notesFromCategory.data!.pages.reduce((list, page) => {
      return [...list, ...page.results];
    }, [] as NoteResponse[]);
  }, [
    notesFromCategory.isFetching,
    notesFromCategory.isError,
    notesFromCategory.isFetchingNextPage,
    notesFromCategory.data,
  ]);

  return (
    <Container>
      <View style={styles.noteList}>
        {!isLoading ? (
          <NoteList
            onListEndReached={() => {
              if (notesFromCategory.hasNextPage) {
                notesFromCategory.fetchNextPage();
              }
            }}
            noteList={noteListReduced}
          />
        ) : (
          <ListPlaceholder placeholderCount={8} />
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
