/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import {AppRoutes} from './app.routes';
import {AuthRoutes} from './auth.routes';

import {useAuth} from '../hooks/globalContext';

export function Routes() {
  const {loading, user} = useAuth();

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
}
