import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from '@expo/vector-icons/FontAwesome5';
import axios from 'axios';
import { API_URL } from '@env';

import { HomeParams } from '../../@types/navigation';
import { UserData } from '../../@types/api';
import { Heading } from '../../components/Heading';
import { Button } from '../../components/Button';
import BottomDrawer, { DrawerState } from '../../components/BottomDrawer';

import { styles } from './styles';
import { THEME } from '../../theme';

export function Home() {
  const route = useRoute();
  const userId = (route.params as HomeParams).userId;

  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    axios
      .get(`${API_URL}/users/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        // create visual exception
        // user not found: error.response.status == 404
      });
  }, []);

  const [drawerState, setDrawerState] = useState<DrawerState>(
    DrawerState.Closed
  );

  function handleToggleBottomDrawer() {
    setDrawerState(
      drawerState == DrawerState.Closed ? DrawerState.Peek : DrawerState.Closed
    );
  }

  const [greeting, setGreeting] = useState<string>('Olá');

  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 0 && currentTime <= 4) setGreeting('Boa madrugada');
    if (currentTime >= 5 && currentTime < 12) setGreeting('Bom dia');
    if (currentTime >= 12 && currentTime < 18) setGreeting('Boa tarde');
    if (currentTime >= 18 && currentTime < 24) setGreeting('Boa noite');
  }, []);

  function handleRefreshTickets() {
    axios
      .get(`${API_URL}/users/${userId}/tickets`)
      .then((response) => {
        setUserData(
          (prev) => ({ ...prev, tickets: response.data.tickets } as UserData)
        );
      })
      .catch((error) => {
        // create visual exception
        // user not found: error.response.status == 404
      });
  }

  const navigation = useNavigation();

  function handleGoToBuyTickets() {
    navigation.navigate('buyTickets', {
      userId,
      userEmail: userData?.email,
      userMercadopagoId: userData?.mercadopagoId,
    });
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={handleToggleBottomDrawer}
          >
            <Icon
              name={drawerState == DrawerState.Closed ? 'bars' : 'times'}
              size={26}
              color={THEME.COLORS.BLUE}
            />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.4} onPress={handleRefreshTickets}>
            <Icon name="sync-alt" size={26} color={THEME.COLORS.BLUE} />
          </TouchableOpacity>
        </View>

        <View style={styles.helloContainer}>
          <Image source={{ uri: userData?.profile }} style={styles.helloImg} />
          <Heading
            title={`${greeting},`}
            subtitle={`${userData?.firstName} ${userData?.lastName}`}
            style={styles.helloHeading}
          />
        </View>

        <View style={styles.ticketsContainer}>
          <Text style={styles.ticketsTitle}>TOTAL DE TICKETS</Text>
          <Text style={styles.ticketsCount}>{userData?.tickets}</Text>
        </View>

        <Button
          text="COMPRAR TICKETS"
          style={styles.btnBuyTickets}
          onPress={handleGoToBuyTickets}
        ></Button>
      </SafeAreaView>

      <BottomDrawer
        drawerState={drawerState}
        onDrawerStateChange={(state: DrawerState) => setDrawerState(state)}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity activeOpacity={0.4} style={styles.menuBtn}>
            <Icon name="user-edit" size={20} color={THEME.COLORS.BLUE} />
            <Text style={styles.textMenuBtn}>Atualizar Dados</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.4} style={styles.menuBtn}>
            <Icon name="history" size={20} color={THEME.COLORS.BLUE} />
            <Text style={styles.textMenuBtn}>Histórico</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.4} style={styles.menuBtn}>
            <Icon name="info-circle" size={20} color={THEME.COLORS.BLUE} />
            <Text style={styles.textMenuBtn}>Suporte</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.4} style={styles.menuBtn}>
            <Icon name="sign-out-alt" size={20} color={THEME.COLORS.BLUE} />
            <Text style={styles.textMenuBtn}>Sair</Text>
          </TouchableOpacity>
        </View>
      </BottomDrawer>
    </>
  );
}
