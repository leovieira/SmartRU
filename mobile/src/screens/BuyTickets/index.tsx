import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';
import Icon from '@expo/vector-icons/FontAwesome5';

import { BuyTicketsParams } from '../../@types/navigation';
import { InputText } from '../../components/InputText';
import { Button } from '../../components/Button';

import { styles } from './styles';
import { THEME } from '../../theme';

interface FormMsg {
  type: string;
  msg: string;
}

export function BuyTickets() {
  const route = useRoute();
  const navigation = useNavigation();

  const userId = (route.params as BuyTicketsParams).userId;

  function handleGoBack() {
    navigation.goBack();
  }

  const [ticketsCount, setTicketsCount] = useState<number>(1);
  const [formMsg, setFormMsg] = useState<FormMsg>({ type: 'none', msg: '' });

  function handleDecrementTickets() {
    if (ticketsCount == 0) return;
    setTicketsCount(ticketsCount - 1);
  }

  function handleIncrementTickets() {
    if (ticketsCount == 99) return;
    setTicketsCount(ticketsCount + 1);
  }

  async function handleBuyTickets() {
    if (ticketsCount == 0) {
      setFormMsg({
        type: 'error',
        msg: 'Selecione um valor maior do que 0 (zero).',
      });
      return;
    }

    var currentTickets = 0;

    await axios
      .get(`${API_URL}/user/${userId}/tickets`)
      .then((response) => {
        currentTickets = response.data.tickets;
      })
      .catch((error) => {
        // create visual exception
        // user not found: error.response.status == 404
      });

    await axios
      .put(`${API_URL}/user/${userId}/tickets`, {
        tickets: currentTickets + ticketsCount,
      })
      .then((response) => {
        setFormMsg({
          type: 'success',
          msg: 'Tickets adicionados com sucesso.',
        });
      })
      .catch((error) => {
        // create visual exception
        // create exception on server
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.4} onPress={handleGoBack}>
          <Icon name="chevron-left" size={26} color={THEME.COLORS.BLUE} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Comprar Tickets</Text>
      <Text style={styles.subtitle}>
        Informe a quantidade de fichas desejadas
      </Text>

      <View style={styles.ticketsContainer}>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.ticketsBtn}
          onPress={handleDecrementTickets}
        >
          <Icon name="minus" size={24} color={THEME.COLORS.WHITE} />
        </TouchableOpacity>

        <InputText
          keyboardType="numeric"
          maxLength={2}
          style={styles.ticketsInput}
          value={ticketsCount.toString()}
          onChangeText={(text) =>
            setTicketsCount(Number(text.replace(/[^0-9]/g, '')))
          }
        />

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.ticketsBtn}
          onPress={handleIncrementTickets}
        >
          <Icon name="plus" size={24} color={THEME.COLORS.WHITE} />
        </TouchableOpacity>
      </View>

      <Text
        style={
          formMsg.type == 'error' ? styles.formMsgError : styles.formMsgSuccess
        }
      >
        {formMsg.type !== 'none' && `*${formMsg.msg}`}
      </Text>
      <Button
        text="COMPRAR COM PIX"
        style={styles.btnBuyTickets}
        onPress={handleBuyTickets}
      />
    </SafeAreaView>
  );
}
