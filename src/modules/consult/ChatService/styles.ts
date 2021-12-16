import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {RFValue} from 'react-native-responsive-fontsize';

const {width} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  margin-top: 50px;
`;

export const Icon = styled(Ionicons)`
  color: ${({theme}) => theme.colors.secondary};
  font-size: ${RFValue(22)}px;
`;

export const Separator = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: ${RFValue(28)}px;
`;

export const SeparatorText = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.secondary};
  font-size: 18px;
  font-weight: bold;
  margin-left: ${width / 6}px;
`;

export const BackButton = styled(RectButton)`
  margin-top: 24px;
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
`;

export const TimeInfoWrapper = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  padding: 5px;
  background-color: ${({theme}) => theme.colors.secondary};
`;

export const TimeInfo = styled.View`
  align-items: center;
`;

export const TimeInfoLabel = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(10)};
`;

export const Time = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.bold};
`;

export const Button = styled(RectButton)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.attention}
  /* margin-bottom: 20px; */
  align-items: center;
  padding: 18px;
`;