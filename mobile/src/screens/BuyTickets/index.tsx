import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL, TICKET_PRICE } from '@env';
import Icon from '@expo/vector-icons/FontAwesome5';

import { BuyTicketsParams } from '../../@types/navigation';
import { Heading } from '../../components/Heading';
import { InputText } from '../../components/InputText';
import { Button } from '../../components/Button';
import { PixModal, PixModalStatus } from '../../components/PixModal';

import { styles } from './styles';
import { THEME } from '../../theme';

interface FormMsg {
  type: string;
  msg: string;
}

var countdownInterval: NodeJS.Timer;

export function BuyTickets() {
  const route = useRoute();
  const navigation = useNavigation();

  const routeParams = route.params as BuyTicketsParams;

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

  function convertTimeToString(time: number): string {
    const minutes = Math.trunc(time / 60);
    const seconds = time - minutes * 60;

    const str =
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0');

    return str;
  }

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisiblePixModal, setIsVisiblePixModal] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [pixCode, setPixCode] = useState<string>('');
  const [paymentId, setPaymentId] = useState<number>();
  const [paymentStatus, setPaymentStatus] = useState<string>('');

  useEffect(() => {
    if (!isVisiblePixModal) {
      clearInterval(countdownInterval);
    }

    if (!isVisiblePixModal && paymentStatus == 'pending') {
      axios
        .delete(`${API_URL}/payments/${paymentId}`)
        .then((response) => {
          if (response.data.status == 'cancelled') {
            setFormMsg({
              type: 'error',
              msg: 'Pagamento cancelado.',
            });
          } else {
            throw new Error('Failed to cancel payment.');
          }
        })
        .catch((error) => {
          setFormMsg({
            type: 'error',
            msg: 'Ops... Algo deu errado!',
          });
        });
    }
  }, [isVisiblePixModal]);

  useEffect(() => {
    if (countdown == 0 && paymentStatus == 'pending') {
      setPaymentStatus('cancelled');
    }
  }, [countdown]);

  async function handleBuyTickets() {
    if (ticketsCount == 0) {
      setFormMsg({
        type: 'error',
        msg: 'Selecione um valor maior do que 0 (zero).',
      });
      return;
    }

    if (ticketsCount > 30) {
      setFormMsg({
        type: 'error',
        msg: 'Selecione um valor menor do que 30 (trinta).',
      });
      return;
    }

    try {
      setIsLoading(true);

      const paymentResponse = await axios.post(`${API_URL}/payments`, {
        transaction: {
          amount: parseFloat((ticketsCount * TICKET_PRICE).toFixed(2)),
        },
        customer: {
          id: routeParams.userMercadopagoId,
          email: routeParams.userEmail,
        },
      });

      setPixCode(paymentResponse.data.qrCode);
      setPaymentId(paymentResponse.data.id);
      setPaymentStatus(paymentResponse.data.status);
      setCountdown(30 * 60);
      setIsVisiblePixModal(true);
      setIsLoading(false);

      countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      var status = paymentResponse.data.status;

      await new Promise((resolve) => {
        var paymentStatusInterval = setInterval(async () => {
          try {
            const paymentStatusResponse = await axios.get(
              `${API_URL}/payments/${paymentResponse.data.id}/status`
            );

            if (paymentStatusResponse.data.status != 'pending') {
              setPaymentStatus(paymentStatusResponse.data.status);
              status = paymentStatusResponse.data.status;
              clearInterval(countdownInterval);
              setCountdown(0);
              clearInterval(paymentStatusInterval);
              resolve(null);
            }
          } catch (error) {
            throw error;
          }
        }, 5000);
      });

      if (status != 'approved') return;

      const getTicketsResponse = await axios.get(
        `${API_URL}/users/${routeParams.userId}/tickets`
      );

      const updateTicketsResponse = await axios.put(
        `${API_URL}/users/${routeParams.userId}/tickets`,
        {
          tickets: getTicketsResponse.data.tickets + ticketsCount,
        }
      );

      setFormMsg({
        type: 'success',
        msg: 'Tickets adicionados com sucesso.',
      });
    } catch (error) {
      if (paymentStatus != 'approved') {
        setPaymentStatus('error');
      }

      setFormMsg({
        type: 'error',
        msg: 'Ops... Algo deu errado!',
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.4} onPress={handleGoBack}>
          <Icon name="chevron-left" size={26} color={THEME.COLORS.BLUE} />
        </TouchableOpacity>
      </View>

      <Heading
        title="Comprar Tickets"
        subtitle="Informe a quantidade de fichas desejadas"
        style={styles.heading}
      />

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

      <View style={styles.detailsContainer}>
        <View style={styles.detailsItem}>
          <Text style={styles.detailsTitle}>Quantidade mínima:</Text>
          <Text style={styles.detailsData}>1</Text>
        </View>

        <View style={styles.detailsItem}>
          <Text style={styles.detailsTitle}>Quantidade máxima:</Text>
          <Text style={styles.detailsData}>30</Text>
        </View>

        <View style={styles.detailsItem}>
          <Text style={styles.detailsTitle}>Valor unitário:</Text>
          <Text style={styles.detailsData}>
            R$ {TICKET_PRICE.toString().replace('.', ',')}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailsItem}>
          <Text style={styles.detailsTotalTitle}>VALOR TOTAL:</Text>
          <Text style={styles.detailsTotalData}>
            R${' '}
            {(ticketsCount * TICKET_PRICE)
              .toFixed(2)
              .toString()
              .replace('.', ',')}
          </Text>
        </View>
      </View>

      <Button
        text="COMPRAR COM PIX"
        type={isLoading ? 'loading' : 'primary'}
        disabled={isLoading}
        style={styles.btnBuyTickets}
        onPress={handleBuyTickets}
      />

      <PixModal
        pixCode={pixCode}
        status={paymentStatus as PixModalStatus}
        countdown={convertTimeToString(countdown)}
        onClose={() => {
          setIsVisiblePixModal(false);
        }}
        visible={isVisiblePixModal}
      />
    </SafeAreaView>
  );
}
