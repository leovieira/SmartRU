import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';

import { InputText, InputTextProps } from '../InputText';

import { styles } from './styles';
import { THEME } from '../../theme';

export interface InputPasswordProps extends InputTextProps {}

export function InputPassword({ style, ...props }: InputPasswordProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <InputText
        secureTextEntry={!isVisible}
        style={{ paddingRight: 50, ...(style as any) }}
        {...props}
      />
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.btnToggle}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Icon
          name={isVisible ? 'eye-slash' : 'eye'}
          size={20}
          color={THEME.COLORS.BLUE}
        />
      </TouchableOpacity>
    </View>
  );
}
