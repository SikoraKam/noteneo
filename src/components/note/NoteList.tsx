import * as React from 'react';
import {
  Text,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { formatDate } from '../../utils/formatBackendTime';
import { NoteResponse } from '../../types/notes/noteResponse';
import { AppText } from '../shared/AppText';

interface NoteListProps {
  noteList: NoteResponse[];
  onListEndReached(): void;
  onItemPressed(id: number): void;
}

export const NoteList: React.FC<NoteListProps> = (props) => {
  const theme = useTheme();

  const renderItem = ({ item }: ListRenderItemInfo<NoteResponse>) => (
    <List.Item
      onPress={() => props.onItemPressed(item.id)}
      accessibilityTraits=""
      accessibilityComponentType
      title={item.title}
      titleStyle={styles.elementName}
      description={
        item.categories.map((category) => category.name) +
        ' | ' +
        'Autor: ' +
        item.author.first_name +
        ' ' +
        item.author.last_name
      }
      left={(props) => <List.Icon {...props} icon="note-outline" />}
      right={(props) => (
        <AppText style={{ color: theme.colors.backdrop }}>
          {formatDate(item.updated_at)}
        </AppText>
      )}
    />
  );

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '90%',
          backgroundColor: '#CED0CE',
          marginLeft: '7%',
        }}
      />
    );
  };

  return (
    <FlatList
      data={props.noteList}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      keyExtractor={(note) => note.id.toString()}
      onEndReached={props.onListEndReached}
      onEndReachedThreshold={0.7}
      ItemSeparatorComponent={renderSeparator}
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
