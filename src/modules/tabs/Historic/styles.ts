import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

export const Container = styled.SafeAreaView`
  background-color: ${({theme}) => theme.colors.shape};
  height: 100%;
`;

export const BoxSelection = styled.View`
  margin-top: 106px;
  margin-left: 20px;
  margin-right: 20px;
  height: 276px;
  background-color: ${({theme}) => theme.colors.secondary};
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: solid 2px ${({theme}) => theme.colors.secondary};
`;

export const ModalTextLabel = styled.Text`
  margin-top: 8px;
  padding: 10px;
  font-size: ${RFValue(14)};
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.medium};
`;

export const Title = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: ${RFValue(28)}px;
  align-items: center;
`;

export const TitleText = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.secondary};
  font-size: 18px;
  font-weight: bold;
  margin-left: ${width / 8}px;
`;

export const Separator = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 1px;
  background-color: ${({theme}) => theme.colors.text};
`;

export const BackButton = styled(RectButton)`
  margin-top: 24px;
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  color: ${({theme}) => theme.colors.secondary};
`;

export const Icon = styled(Ionicons)`
  color: ${({theme}) => theme.colors.secondary};
  font-size: ${RFValue(22)}px;
  margin-top: 8px;
`;

export const SelectButton = styled(RectButton)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
