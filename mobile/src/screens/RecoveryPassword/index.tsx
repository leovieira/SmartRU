import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/FontAwesome5';

import { Heading } from '../../components/Heading';
import { InputText } from '../../components/InputText';
import { Button } from '../../components/Button';

import { styles } from './styles';
import { THEME } from '../../theme';

export function RecoveryPassword() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  const [ticketsCount, setTicketsCount] = useState<number>(1);

  function handleDecrementTickets() {
    if (ticketsCount == 0) return;
    setTicketsCount(ticketsCount - 1);
  }

  function handleIncrementTickets() {
    if (ticketsCount == 99) return;
    setTicketsCount(ticketsCount + 1);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.4} onPress={handleGoBack}>
          <Icon name="chevron-left" size={26} color={THEME.COLORS.BLUE} />
        </TouchableOpacity>
      </View>

      <Heading
        title="Recuperar senha"
        subtitle="Informe seu email de cadastrado"
        style={styles.heading}
      />

      <InputText placeholder="E-mail" style={styles.inputEmail} />
      <Button text="ENVIAR CÓDIGO DE RECUPERAÇÃO" style={styles.btnRecovery} />
    </SafeAreaView>
  );
}
