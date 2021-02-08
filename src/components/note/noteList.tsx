import * as React from 'react';
import { Text, FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { formatDate } from '../../utils/formatBackendTime';
import { NoteResponse } from '../../types/notes/noteResponse';
import { AppText } from '../shared/AppText';

interface NoteListProps {
  noteList: NoteResponse[];
  onListEndReached(): void;
}

export const NoteList: React.FC<NoteListProps> = (props) => {
  const renderItem = ({ item }: ListRenderItemInfo<NoteResponse>) => (
    <List.Item
      accessibilityTraits=""
      accessibilityComponentType
      title={item.title}
      titleStyle={styles.elementName}
      description={item.categories.map((category) => category)}
      left={(props) => <List.Icon {...props} icon="note-outline" />}
      right={(props) => (
        <AppText style={{ fontWeight: 'bold' }}>
          {formatDate(item.updated_at)}
        </AppText>
      )}
    />
  );
  return (
    <FlatList
      data={props.noteList}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      keyExtractor={(note) => note.id.toString()}
      onEndReached={props.onListEndReached}
      onEndReachedThreshold={0.7}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 16,
  },
  elementName: {
    fontWeight: 'bold',
  },
  rightIndexStyle: {
    fontWeight: 'bold',
    textAlign: 'justify',
    marginRight: 12,
    paddingTop: 6,
  },
});
