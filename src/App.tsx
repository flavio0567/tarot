// App.js
import 'react-native-reanimated';

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components';

import {Routes} from './shared/routes';
import AppProvider from './shared/hooks';
import SplashScreen from 'react-native-splash-screen';
import theme from './shared/global/theme';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="dark-content"
          translucent
        />
        <AppProvider>
          <Routes />
        </AppProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
