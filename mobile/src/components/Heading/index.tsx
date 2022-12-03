import { View, Text, ViewProps } from 'react-native';

import { styles } from './styles';

export interface Props extends ViewProps {
  title: string;
  subtitle: string;
}

export function Heading({ title, subtitle, style, ...rest }: Props) {
  return (
    <View style={[styles.container, style]} {...rest}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
