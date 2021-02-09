import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { NoteScreenStackParamList } from './NoteScreenStack';
import { AppInput } from '../../components/shared/AppInput';
import { HelperText, RadioButton, Text } from 'react-native-paper';
import * as yup from 'yup';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../components/shared/AppText';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppButton } from '../../components/shared/AppButton';
import { Container } from '../../components/layout/Container';
import { NoteCreateScreen } from './NoteCreateScreen';

type NoteSettingsScreenProps = StackScreenProps<
  NoteScreenStackParamList,
  'NoteSettings'
>;

type NoteSettingsFormData = {
  title: string;
};

const NoteSettingsSchema = yup.object().shape({
  title: yup.string().required('Tytul jest wymagany'),
});

export const NoteSettingsScreen: React.FC<NoteSettingsScreenProps> = ({
  navigation,
}) => {
  const [category, setCategory] = React.useState('first');

  const {
    register,
    setValue,
    setError,
    errors,
    handleSubmit,
  } = useForm<NoteSettingsFormData>({
    resolver: yupResolver(NoteSettingsSchema),
  });

  useEffect(() => {
    register('title');
  }, [register]);

  const onSave = async ({ title }: NoteSettingsFormData) => {
    navigation.push('NoteCreate', { title, category });
  };

  return (
    <Container style={{ margin: 8 }}>
      <AppInput
        style={styles.row}
        mode="outlined"
        label="Tytul"
        error={!!errors.title}
        onChangeText={(text) => setValue('title', text)}
      />
      {!!errors.title && (
        <HelperText type="error" visible={!!errors.title}>
          {errors.title?.message}
        </HelperText>
      )}

      <View style={styles.radioGroup}>
        <AppText
          style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>
          Kategorie
        </AppText>
        <RadioButton.Group
          onValueChange={(newValue) => setCategory(newValue)}
          value={category}>
          <RadioButton.Item label="IT" value="it" />
          <RadioButton.Item label="Math" value="math" />
          <RadioButton.Item label="Physics" value="physics" />
          <RadioButton.Item label="Programming" value="programming" />
          <RadioButton.Item label="Sport" value="sport" />
          <RadioButton.Item label="Tech" value="tech" />
        </RadioButton.Group>
      </View>

      <View style={styles.action}>
        <AppButton
          mode="contained"
          // disabled={mutateAvatar.isLoading}
          disabled={false}
          onPress={handleSubmit(onSave)}>
          Dalej
        </AppButton>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    marginBottom: 8,
  },
  action: {
    marginTop: 16,
  },
  radioGroup: {
    margin: 4,
  },
  radioBtnRow: {},
});
