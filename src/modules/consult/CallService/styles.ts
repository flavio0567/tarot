import styled from 'styled-components/native';
import {Dimensions, TextInput} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {RFValue} from 'react-native-responsive-fontsize';

const {height, width} = Dimensions.get('window');

export const Container = styled.View`
  margin-top: 50px;
`;

export const Form = styled.View`
  /* margin-top: 64px; */
  align-items: center;
  padding: 6px 6px;
`;

export const Input = styled(TextInput)`
  height: 40px;
  margin: 12px;
  border-width: 1px;
  padding: 10px;
  border-color: ${({theme}) => theme.colors.secondary};
`;

export const ConfirmationButton = styled.View`
  flex-direction: row;
  width: 50%;
  margin: 10px;
  padding: 4px 24px 24px;
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
  color: ${({theme}) => theme.colors.secondary};
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

export const Country = styled.View`
  margin-top: 106px;
  margin-bottom: ${height - 626};
  margin-left: 20px;
  margin-right: 20px;
  padding: 14px;
  height: 340px;
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: solid 2px ${({theme}) => theme.colors.secondary};
  /* align-items: center; */
`;

export const ModalTextLabel = styled.Text`
  margin-top: 8px;
  padding: 10px;
  font-size: ${RFValue(14)};
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.medium};
`;

export const ModalText = styled.Text`
  padding: 10px;
  font-size: ${RFValue(14)};
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.medium};
  border: solid 1px ${({theme}) => theme.colors.secondary};
`;

export const Time = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.bold};
`;
