import { useState, useEffect } from 'react';
import { View, Text, Image, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';

import { InputText } from '../../components/InputText';
import { InputPassword } from '../../components/InputPassword';
import { Button } from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { styles } from './styles';

export function Login() {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [formMsg, setFormMsg] = useState<string>('');

  const navigation = useNavigation();

  async function handleLogin() {
    if (username == '' || password == '') {
      setFormMsg('Preencha os campos.');
      return;
    }

    axios
      .post(`${API_URL}/auth/login`, {
        username,
        password,
      })
      .then((response) => {
        // destroy login

        navigation.navigate('home', { userId: response.data.id });
      })
      .catch((error) => {
        if (error.response.status == 401) {
          setFormMsg('Usuário ou senha inválidos.');
        } else {
          setFormMsg('Ops... Algo deu errado!');
        }
      });
  }

  async function handleGoToRecoveryPassword() {
    navigation.navigate('recoveryPassword');
  }

  return (
    <SafeAreaView style={styles.container}>
      {!keyboardIsVisible && <Image source={logoImg} style={styles.logo} />}

      <View style={styles.form}>
        <InputText
          placeholder="Usuário"
          style={styles.formItem}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <InputPassword
          placeholder="Senha"
          style={styles.formItem}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={styles.formMsg}>{formMsg && `*${formMsg}`}</Text>
        <Button text="ENTRAR" style={styles.formItem} onPress={handleLogin} />
        <Button
          text="ESQUECI MINHA SENHA"
          type="secondary"
          style={styles.formItem}
          onPress={handleGoToRecoveryPassword}
        />
      </View>
    </SafeAreaView>
  );
}
