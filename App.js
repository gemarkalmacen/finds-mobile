import React from 'react';
import { Transaction, TevDetail, Log, Login } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import Tabs from "./navigation/tabs";


const Stack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Login'}
      >
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Home"
          component={Tabs}
        />
        <Stack.Screen
          name="TevDetail"
          component={TevDetail}
        />
        <Stack.Screen
          name="Transaction"
          component={Transaction}
        />
        <Stack.Screen
          name="Log"
          component={Log}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;