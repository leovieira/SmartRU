import { useState, useEffect } from 'react';
import {
  Modal,
  ModalProps,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Icon from '@expo/vector-icons/FontAwesome5';

import { styles } from './styles';
import { THEME } from '../../theme';

export type PixModalStatus = 'pending' | 'approved' | 'cancelled' | 'error';

export interface Props extends ModalProps {
  pixCode: string;
  status: PixModalStatus;
  countdown: string;
  onClose: () => void;
}

interface StatusDetails {
  icon: string;
  text: string;
  color: string;
}

export function PixModal({
  pixCode,
  status,
  countdown,
  onClose,
  ...rest
}: Props) {
  var statusDetails: StatusDetails;

  if (status == 'pending') {
    statusDetails = {
      icon: 'clock',
      text: 'Pendente',
      color: THEME.COLORS.YELLOW,
    };
  } else if (status == 'approved') {
    statusDetails = {
      icon: 'check-circle',
      text: 'Aprovado',
      color: THEME.COLORS.GREEN,
    };
  } else if (status == 'cancelled') {
    statusDetails = {
      icon: 'times-circle',
      text: 'Cancelado',
      color: THEME.COLORS.RED,
    };
  } else {
    statusDetails = {
      icon: 'times-circle',
      text: 'Erro',
      color: THEME.COLORS.RED,
    };
  }

  const [statusBtnCopy, setStatusBtnCopy] = useState<string>('default');

  async function handleCopyPixCodeToClipboard() {
    setStatusBtnCopy('copying');
    await Clipboard.setStringAsync(pixCode);
    setStatusBtnCopy('copied');
    setTimeout(() => {
      setStatusBtnCopy('default');
    }, 2000);
  }

  return (
    <Modal transparent statusBarTranslucent animationType="fade" {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Icon name="times" size={22} color={THEME.COLORS.GRAY} />
          </TouchableOpacity>

          <Icon
            name={statusDetails.icon}
            size={64}
            color={statusDetails.color}
          />

          <View style={styles.heading}>
            <Text style={styles.headingTitle}>{statusDetails.text}</Text>
            <Text style={styles.headingSubtitle}>
              Copie o código e pague no seu APP bancário
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={
              statusBtnCopy == 'default'
                ? styles.pixBtn
                : { ...styles.pixBtn, ...styles.pixBtnDisabled }
            }
            onPress={handleCopyPixCodeToClipboard}
            disabled={statusBtnCopy != 'default'}
          >
            {statusBtnCopy == 'copying' ? (
              <ActivityIndicator size={24} color={THEME.COLORS.WHITE} />
            ) : statusBtnCopy == 'copied' ? (
              <Text style={styles.pixBtnText} numberOfLines={1}>
                Copiado!
              </Text>
            ) : (
              <>
                <Text style={styles.pixBtnText} numberOfLines={1}>
                  {pixCode}
                </Text>
                <Icon name="clipboard" size={20} color={THEME.COLORS.WHITE} />
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Tempo restante: {countdown}</Text>
        </View>
      </View>
    </Modal>
  );
}
