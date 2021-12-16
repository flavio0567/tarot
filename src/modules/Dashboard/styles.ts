import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList, Platform} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RectButton} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';

import {AttendantDTO} from '../../dtos/AttendantDTO';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.shape};
`;

export const Header = styled.View`
  width: 100%;
  margin-top: 10px;
  background-color: ${({theme}) => theme.colors.shape};
  padding: ${Platform.OS === 'ios' ? getStatusBarHeight() - 12 : 0}px 14px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const SearchAttendant = styled(Picker)`
  margin: 10px;
  /* width: 300px; */
  height: 5px;
  /* border-width: 2px; */
  background-color: ${({theme}) => theme.colors.shape};
`;

export const UserWrapper = styled.View`
  width: 100%;
  height: ${RFPercentage(14)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View`
  width: 250px;
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${Platform.OS === 'ios' ? RFValue(45) : RFValue(55)}px;
  height: ${Platform.OS === 'ios' ? RFValue(45) : RFValue(55)}px;

  margin: 16px 0 6px;
  border-radius: 25px;
`;

export const User = styled.View`
  margin-top: 10px;
  margin-left: 17px;
  /* margin-left:  */
`;

export const UserAvatar = styled.View`
  width: 80px;
  align-items: center;
`;

export const UserPanelText = styled.Text`
  color: ${({theme}) => theme.colors.gold};
  font-size: ${RFValue(10)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  text-decoration: underline;
  text-decoration-color: ${({theme}) => theme.colors.gold};
`;

export const UserGreeting = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  width: ${RFValue(200)}px;
  height: ${RFValue(46)}px;
  color: ${({theme}) => theme.colors.text};

  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`;

export const SideWrapper = styled.View`
  flex-direction: column;
  margin-top: ${RFValue(20)};
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 13px;
`;

export const Icon = styled(Feather).attrs({
  name: 'power',
})`
  color: ${({theme}) => theme.colors.attention};
  font-size: ${Platform.OS === 'ios' ? RFValue(26) : RFValue(32)}px;
`;

export const BalanceView = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const BalanceText = styled.Text`
  color: ${({theme}) => theme.colors.text};

  font-size: ${RFValue(8)}px;
`;

export const SearchView = styled.View`
  background-color: ${({theme}) => theme.colors.primary};
  width: 100%;
  height: ${RFPercentage(26)}px;

  position: absolute;
  margin-top: ${RFPercentage(18)}px;
`;

export const AttendantList = styled(
  FlatList as new () => FlatList<AttendantDTO>,
).attrs({
  showVerticalScrollIndicator: false,
})`
  margin-top: ${Platform.OS === 'ios' ? RFValue(0) : RFValue(6)}px;
  margin-left: 8px;
`;
