import styled from 'styled-components/native';
import {Platform, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RFValue} from 'react-native-responsive-fontsize';

const {width} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.shape};
`;

export const LogoView = styled.View`
  margin-top: ${Platform.OS === 'ios'
    ? getStatusBarHeight() + RFValue(14)
    : RFValue(14)}px;
  padding: 10px 72px 0;
`;

export const Header = styled.View`
  width: 100%;

  background-color: ${({theme}) => theme.colors.shape};
  margin-top: ${Platform.OS === 'ios'
    ? getStatusBarHeight() + RFValue(24)
    : RFValue(30)}px;
`;

export const CardIcon = styled(Ionicons).attrs({
  name: 'cart-outline',
})`
  font-size: 44px;
  color: ${({theme}) => theme.colors.title};
  margin-left: ${width / 2 - 22}px;
  border-radius: 12px;
`;

export const Title = styled.Text`
  font-size: ${Platform.OS === 'ios' ? RFValue(20) : RFValue(22)}px;
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.title};
  text-align: center;
`;

export const SubTitle = styled.Text`
  padding-top: 40px;
  font-size: ${Platform.OS === 'ios' ? RFValue(12) : RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text};
  line-height: ${Platform.OS === 'ios' ? RFValue(22) : RFValue(18)}px;
  text-align: center;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 0,
  },
  showsVerticalScrollIndicator: false,
})``;

export const UserLogin = styled.View`
  width: 100%;
  /* height: ${Platform.OS === 'ios' ? 32 : 38}%; */
`;

export const ConfirmationButton = styled.View`
  width: 100%;
  padding: 4px 24px 24px;
`;

export const CredentialsLabel = styled.Text`
  padding: 10px;
  font-size: ${Platform.OS === 'ios' ? RFValue(12) : RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text};
  line-height: ${RFValue(18)}px;
  text-align: center;
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;
  padding: 4px 24px;
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFValue(10)}px;
  padding: 0 32px;
  justify-content: space-between;
`;
