import React, {useCallback} from 'react';
import {useTheme} from 'styled-components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {Dashboard} from '../../modules/Dashboard';
import {Credits} from '../../modules/tabs/Credits';
import {Historic} from '../../modules/tabs/Historic';
import {Points} from '../../modules/tabs/Points';
import {AttendantDetails} from '../../modules/attendants/AttendantDetails';
import {SelectedAttendant} from '../../modules/attendants/SelectedAttendant';
import {PaymentOptions} from '../../modules/@components/PaymentOptions';
import {PaymentWebView} from '../../modules/@components/PaymentWebView';
import {VideoService} from '../../modules/consult/VideoService';
import {CallService} from '../../modules/consult/CallService';
import {EmailService} from '../../modules/consult/EmailService';
import {ChatService} from '../../modules/consult/ChatService';
import {OtherOptionsWebView} from '../../modules/@components/OtherOptionsWebView';
import glyphmap from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';

type IconsVariation = {
  [key: string]: keyof typeof glyphmap;
};

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export function AppRoutes() {
  MaterialCommunityIcons.loadFont();
  const theme = useTheme();

  const MainTab = useCallback(() => {
    return (
      <Tab.Navigator>
        <Tab.Group
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarIcon: ({color, size}) => {
              const icons: IconsVariation = {
                Consultar: 'cards-playing-outline',
                Créditos: 'cart-outline',
                Histórico: 'text-to-speech',
                Pontos: 'currency-brl',
              };

              return (
                <MaterialCommunityIcons
                  name={icons[route.name]}
                  color={color}
                  size={size}
                />
              );
            },
            tabBarActiveTintColor: theme.colors.secondary,
            tabBarInactiveTintColor: theme.colors.primary,
          })}>
          <Tab.Screen name="Consultar" component={Dashboard} />
          <Tab.Screen name="Histórico" component={Historic} />
          <Tab.Screen
            name="Créditos"
            component={Credits}
            options={{
              tabBarItemStyle: {
                width: 10,
              },
            }}
          />
          <Tab.Screen name="Pontos" component={Points} />
        </Tab.Group>
      </Tab.Navigator>
    );
  }, [theme.colors.primary, theme.colors.secondary]);

  const AttendantDetailsStack = useCallback(() => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="AttendantDetails"
          component={AttendantDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SelectedAttendant"
          component={SelectedAttendant}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PaymentOptions"
          component={PaymentOptions}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PaymentWebView"
          component={PaymentWebView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OtherOptions"
          component={OtherOptionsWebView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatService"
          component={ChatService}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VideoService"
          component={VideoService}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CallService"
          component={CallService}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EmailService"
          component={EmailService}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailsOfAnAttendant"
        component={AttendantDetailsStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
