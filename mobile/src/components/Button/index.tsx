import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';

export type ButtonTypes = 'primary' | 'secondary';

export interface ButtonProps extends TouchableOpacityProps {
  type?: null | ButtonTypes | undefined;
  text: string;
}

export function Button({ text, style, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={
        !props.disabled
          ? props.type == 'secondary'
            ? { ...styles.btn, ...styles.btnSecondary, ...(style as any) }
            : { ...styles.btn, ...styles.btnPrimary, ...(style as any) }
          : { ...styles.btn, ...styles.btnDisabled, ...(style as any) }
      }
      {...props}
    >
      <Text style={styles.txtBtn}>{text}</Text>
    </TouchableOpacity>
  );
}
