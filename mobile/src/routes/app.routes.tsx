import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../screens/Login';
import { Home } from '../screens/Home';
import { BuyTickets } from '../screens/BuyTickets';
import { RecoveryPassword } from '../screens/RecoveryPassword';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="home" component={Home} />
      <Screen name="buyTickets" component={BuyTickets} />
      <Screen name="recoveryPassword" component={RecoveryPassword} />
    </Navigator>
  );
}
