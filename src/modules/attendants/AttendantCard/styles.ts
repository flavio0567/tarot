import styled, {css} from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Platform} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

interface TypeProps {
  type: String;
  title: string;
}

export const Container = styled(RectButton)`
  align-items: center;
  width: 80%;
  background-color: ${({theme}) => theme.colors.shape};
  border-radius: 10px;
  margin-left: 10%;
  margin-bottom: 30px;
  padding: 10px;
  border: solid;
  border-width: 5px;
  /* border-left-width: 5px;
  border-right-width: 5px;
  border-top-width: 5px;
  border-bottom-width: 5px; */
  border-color: ${({theme}) => theme.colors.primary};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const Title = styled.Text`
  width: 100%;
  font-size: ${RFValue(26)}px;
  text-align: center;
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.secondary};
  text-decoration: none;
`;

export const Photo = styled.Image`
  width: ${Platform.OS === 'ios' ? RFValue(200) : RFValue(200)}px;
  height: ${Platform.OS === 'ios' ? RFValue(200) : RFValue(200)}px;
  margin: ${RFValue(8)}px ${RFValue(10)}px;
`;

export const PricePerMinute = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const PricePerMinuteText = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(15)};
  color: ${({theme}) => theme.colors.secondary};
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 12px 0 10px;
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  width: ${RFValue(44)}px;
  height: ${RFValue(44)}px;
  background-color: ${({theme}) => theme.colors.primary};
  border-radius: 25px;
`;

export const IconService = styled(Ionicons)`
  color: ${({theme}) => theme.colors.secondary};
  font-size: ${RFValue(28)}px;
`;

export const ChatIconService = styled(Entypo)`
  color: ${({theme}) => theme.colors.secondary};
  font-size: ${RFValue(28)}px;
`;

export const Content = styled.View``;

export const Availability = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${RFValue(8)}px;
  border-radius: 5px;
`;

export const AvailabilityWrapper = styled.View`
  padding: 10px;
  border-radius: 6px;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const AvailabilityText = styled.Text<TypeProps>`
  margin-left: ${RFValue(10)}px;
  margin-right: ${RFValue(10)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${Platform.OS === 'ios' ? 16 : 12}px;
  text-transform: capitalize;

  ${({type}) =>
    type === 'OCUPADO' &&
    css`
      color: ${({theme}) => theme.colors.gold};
    `};

  ${({type}) =>
    type === 'DISPONIVEL' &&
    css`
      color: ${({theme}) => theme.colors.success};
    `};
`;

export const PerfilText = styled.Text`
  margin-left: ${RFValue(10)}px;
  margin-right: ${RFValue(10)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${Platform.OS === 'ios' ? 16 : 12}px;
  text-transform: capitalize;
  color: ${({theme}) => theme.colors.secondary};
`;
