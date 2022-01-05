import styled from 'styled-components/native';
import {Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.shape};
`;

export const Header = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  margin-right: 64px;
`;

export const LogoView = styled.View`
  margin-left: 10px;
  margin-top: ${Platform.OS === 'ios' ? RFValue(0) : RFValue(22)}px;
`;

export const SafeView = styled.View`
  align-items: center;
  margin-top: ${RFValue(10)}px;
`;

export const BackButton = styled(RectButton)`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  margin-top: ${Platform.OS === 'ios' ? RFValue(0) : RFValue(20)}px;
  color: ${({theme}) => theme.colors.secondary};
`;

export const IconView = styled.View`
  width: ${Platform.OS === 'ios' ? RFValue(74) : RFValue(97)}px;
  height: ${Platform.OS === 'ios' ? RFValue(74) : RFValue(97)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${Platform.OS === 'ios' ? RFValue(36) : RFValue(50)}px;
  background-color: ${({theme}) => theme.colors.secondary};
  padding: 10px;
`;

export const Icon = styled(Ionicons)`
  margin-top: 14px;
  color: ${({theme}) => theme.colors.secondary};
  font-size: ${RFValue(22)}px;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 14px;
  margin-left: 20px;
`;

export const Box = styled(RectButton)`
  width: ${RFValue(260)}px;
  height: ${RFValue(210)}px;
  margin: ${RFValue(18)}px ${RFValue(42)}px;
`;

export const BoxLogo = styled.View`
  width: ${Platform.OS === 'ios' ? RFValue(259) : RFValue(274)}px;
  height: ${Platform.OS === 'ios' ? RFValue(56) : RFValue(64)}px;
  align-items: center;
  justify-content: center;

  background: #f6f6f6;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: solid 2px ${({theme}) => theme.colors.secondary};
`;

export const ImageIcon = styled.Image`
  /* margin-top: 5px; */
  margin-left: 12px;
`;

export const BoxCards = styled.View`
  width: ${Platform.OS === 'ios' ? RFValue(259) : RFValue(274)}px;
  height: ${RFValue(156)}px;
  margin-top: 3px;
  padding: 6px;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${({theme}) => theme.colors.secondary};
`;

export const CardView = styled.View`
  flex-direction: row;
  padding: 48px 26px;
  /* margin-top: 60px; */
`;

export const CreditImage = styled.Image`
  margin-left: 12px;
`;

export const CardText = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: 18px;
  color: ${({theme}) => theme.colors.primary};
  padding-left: 12px;
  margin-top: 8px;
`;

export const BoxTimeToRelease = styled.View`
  margin: 4px;
  border-radius: 5px;
  background-color: ${({theme}) => theme.colors.primary_dark};
  /* margin-bottom: 50px; */
`;

export const TimeToReleaseTextText = styled.Text`
  font-size: ${RFValue(16)};
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.attention};
  text-align: center;
  padding: 3px;
`;

export const MultiCardView = styled.View`
  flex-direction: column;
`;

export const IconCardView = styled.View`
  flex-direction: row;
  padding: 8px;
`;

export const BankImage = styled.Image`
  margin: 12px;
`;

export const CardIcon = styled(Ionicons).attrs({
  name: 'cart-outline',
})`
  font-size: 30px;
  color: ${({theme}) => theme.colors.shape};
`;

export const IconText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.shape};
`;

export const SelectionText = styled.Text`
  font-size: 16px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.secondary};
`;
