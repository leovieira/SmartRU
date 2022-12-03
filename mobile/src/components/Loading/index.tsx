import { View, ActivityIndicator } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={28} color={THEME.COLORS.BLUE} />
    </View>
  );
}
