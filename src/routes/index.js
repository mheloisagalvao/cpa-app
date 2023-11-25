import React from "react";
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Settings from "../screens/Settings";
import { CustomDrawer, DrawerIcon } from "./drawer";
import SignIn from "../screens/SignIn";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerScreens = () => (
  <Drawer.Navigator
    defaultStatus="closed"
    screenOptions={{
      overlayColor: 'transparent',
      drawerType: 'slide',
      headerTintColor: '#111',
    }}
    drawerContent={CustomDrawer}
  >
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Settings" component={Settings} />
  </Drawer.Navigator>
);

const Routes = () => {
  const headerLeft = React.useCallback(
    (props) => {
      return <DrawerIcon {...props} />;
    },
    [],
  );

  return (
    <NavigationContainer
    >
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen
          name="DrawerScreens"
          component={DrawerScreens}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default Routes;
