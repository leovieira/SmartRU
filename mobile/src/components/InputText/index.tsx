import { TextInput, TextInputProps } from 'react-native';

import { styles } from './styles';

import { THEME } from '../../theme';

export interface InputTextProps extends TextInputProps {}

export function InputText({ style, ...props }: InputTextProps) {
  return (
    <TextInput
      placeholderTextColor={THEME.COLORS.GRAY}
      cursorColor={THEME.COLORS.BLUE}
      style={{ ...styles.input, ...(style as any) }}
      {...props}
    />
  );
}
