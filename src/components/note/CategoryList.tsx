import * as React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { Category } from '../../types/notes/category';

interface CategoryListProps {
  categoryList: Category[];
  onPressCategory(categoryName: string): void;
}

export const CategoryList: React.FC<CategoryListProps> = (props) => {
  const theme = useTheme();

  const renderIcon = (name: string) => {
    switch (name) {
      case 'sport':
        return 'run-fast';
      case 'math':
        return 'code-greater-than-or-equal';
      case 'it':
        return 'desktop-mac';
      case 'programming':
        return 'code-tags';
      case 'physics':
        return 'chart-line';
      case 'tech':
        return 'cellphone-iphone';
      default:
        return 'note';
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<Category>) => (
    <List.Item
      accessibilityTraits=""
      accessibilityComponentType
      title={item.name}
      titleStyle={styles.elementName}
      style={styles.itemStyle}
      onPress={() => props.onPressCategory(item.name)}
      left={(props) => (
        <List.Icon
          {...props}
          style={{ paddingTop: 10 }}
          icon={renderIcon(item.name)}
        />
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
    paddingTop: 10,
    fontSize: 20,
  },
  rightIndexStyle: {
    fontWeight: 'bold',
    textAlign: 'justify',
    marginRight: 12,
    paddingTop: 6,
  },
  itemStyle: {
    height: 70,
    marginLeft: 15,
  },
});
