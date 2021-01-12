import {createStackNavigator} from '@react-navigation/stack';
import {useColorScheme} from 'react-native';
import theme from './assets/theme.json';
import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Lab from './pages/Lab';

const Stack = createStackNavigator();

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: theme.colors.dark,
  },
};

export default () => {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? darkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Lab" component={Lab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
