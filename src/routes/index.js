import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Settings from "../screens/Settings";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawer } from "./drawer";
import SignIn from "../screens/SignIn";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <NavigationContainer
    initialRouteName="SignIn"
    >
      <Drawer.Navigator
        defaultStatus="closed"
        screenOptions={{
          overlayColor: 'transparent',
          drawerType: 'slide',
          headerTintColor: '#111',
        }}
        drawerContent={CustomDrawer}
      >
        <Drawer.Screen name="Home">
          {() => (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignIn" component={SignIn} />
            </Stack.Navigator>
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
