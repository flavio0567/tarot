import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SignIn} from '../../modules/@components/auth/SigIn';

const {Navigator, Screen} = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
