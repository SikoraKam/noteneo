import * as React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { Category } from '../../types/notes/category';

interface CategoryListProps {
  categoryList: Category[];
}

export const CategoryList: React.FC<CategoryListProps> = (props) => {
  const theme = useTheme();

  const renderItem = ({ item }: ListRenderItemInfo<Category>) => (
    <List.Item
      accessibilityTraits=""
      accessibilityComponentType
      title={item.name}
      titleStyle={styles.elementName}
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
      data={props.categoryList}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      keyExtractor={(note) => note.id.toString()}
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
