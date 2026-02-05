import React, {memo, useCallback, useMemo, useState, forwardRef} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
//internal imports
import useStyles from './styles';
import {AppInputProps} from './types';
import {useTheme} from '@react-navigation/native';

const AppInput = forwardRef<TextInput, AppInputProps>(
  (
    {
      value,
      setError,
      maxLength,
      title = '',
      error = '',
      placeholder,
      onChangeText,
      keyboardType,
      editable = true,
      password = false,
      isContactNumber = false,
      returnKeyType,
      onSubmitEditing,
    }: AppInputProps,
    ref,
  ) => {
    const styles = useStyles();
    const {colors} = useTheme();
    const [secureTextEntry, setSecureTextEntry] = useState(password);

    const handleOnchangeText = useCallback(
      (text: string): void => {
        const regext = /^\s*\d*\s*$/;
        if (isContactNumber) {
          if (regext.test(text)) {
            onChangeText && onChangeText(text);
          }
        } else {
          onChangeText && onChangeText(text);
        }
        setError && setError('');
      },
      [onChangeText, setError],
    );

    return (
      <View style={styles.wrapper}>
        {title && (
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
        <View style={styles.inputWrapper}>
          <TextInput
            ref={ref}
            value={value}
            editable={editable}
            maxLength={maxLength}
            keyboardType={keyboardType}
            placeholder={placeholder}
            cursorColor={colors.primary}
            selectionColor={colors.primary}
            secureTextEntry={secureTextEntry}
            onChangeText={handleOnchangeText}
            placeholderTextColor={colors.text}
            style={[styles.textInput, {color: colors.text, flex: 1}]}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
          />
        </View>

        {error !== '' && error !== null && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
    );
  },
);

export default memo(AppInput);
