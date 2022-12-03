import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

export type ButtonTypes = 'primary' | 'secondary' | 'loading';

export interface ButtonProps extends TouchableOpacityProps {
  type?: null | ButtonTypes | undefined;
  text: string;
}

export function Button({ text, style, ...props }: ButtonProps) {
  var currentStyle: StyleProp<ViewStyle>[] = [styles.btn];

  if (props.type == 'secondary') currentStyle.push(styles.btnSecondary);
  else currentStyle.push(styles.btnPrimary);

  if (props.disabled) currentStyle.push(styles.btnDisabled);

  currentStyle.push(style);

  return (
    <TouchableOpacity activeOpacity={0.8} style={currentStyle} {...props}>
      {props.type == 'loading' ? (
        <ActivityIndicator size={24} color={THEME.COLORS.WHITE} />
      ) : (
        <Text style={styles.txtBtn}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}
