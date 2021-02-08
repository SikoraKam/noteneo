import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { Container } from '../../components/layout/Container';
import { CategoriesScreenStackParamList } from './CategoriesScreenStack';

type CategoryListScreenProps = StackScreenProps<
  CategoriesScreenStackParamList,
  'CategoryList'
>;

export const CategoryListScreen: React.FC<CategoryListScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();

  const onCategoryPress = () => {
    console.log('HEH');
  };

  return <Container />;
};
