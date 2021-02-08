import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { Container } from '../../components/layout/Container';
import { CategoriesScreenStackParamList } from './CategoriesScreenStack';
import { useCategoryListQuery } from '../../hooks/notes/useCategoryListQuery';
import { NoteList } from '../../components/note/noteList';
import { ListPlaceholder } from '../../utils/ListPlaceholder';
import { CategoryList } from '../../components/note/categoryList';

type CategoryListScreenProps = StackScreenProps<
  CategoriesScreenStackParamList,
  'CategoryList'
>;

export const CategoryListScreen: React.FC<CategoryListScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();
  const categoryList = useCategoryListQuery();

  return (
    <Container>
      {!categoryList.isLoading && categoryList.data !== undefined ? (
        <CategoryList
          categoryList={categoryList.data}
          onPressCategory={(categoryName) =>
            navigation.push('NotesFromCategory', { category: categoryName })
          }
        />
      ) : (
        <ListPlaceholder placeholderCount={5} />
      )}
    </Container>
  );
};
