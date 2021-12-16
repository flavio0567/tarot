import styled, {css} from 'styled-components/native';
import {Platform} from 'react-native';

import {MotiImage as Image} from 'moti';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {RectButton} from 'react-native-gesture-handler';

interface TypeProps {
  type: string;
}

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.shape};
  margin: ${RFPercentage(48)}px ${RFPercentage(20)}px;
  padding: 18px 8px;
  margin-top: ${Platform.OS === 'ios' ? RFPercentage(46) : RFPercentage(52)}px;
  margin-left: ${RFPercentage(0)}px;
  border-radius: 5px;
`;

export const PhotoWrapper = styled.View``;

export const Photo = styled(Image).attrs({
  from: {
    rotate: '100deg',
    opacity: 0,
  },
  animate: {
    rotate: '0deg',
    opacity: 1,
  },
  transitions: {
    type: 'timing',
    duration: 5000,
    repeat: 5,
  },
})`
  width: ${RFValue(110)}px;
  height: ${RFValue(180)}px;
  padding: 12px 24px;
`;

export const AttendantWrapper = styled.View`
  flex-direction: row;
`;

export const Attendant = styled.View`
  padding-left: ${RFValue(10)}px;
`;

export const AttendantName = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.secondary};
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(16)}px;
`;

export const BackButton = styled(Feather).attrs({
  name: 'x',
})`
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(20)}px;
  margin-bottom: ${RFValue(10)}px;
`;

export const StatusWrapper = styled.View``;

export const Availability = styled.Text<TypeProps>`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(12)}px;
  padding: 8px 4px;
  margin-left: 24px
    ${({type}) =>
      type === 'DISPONIVEL' &&
      css`
        color: ${({theme}) => theme.colors.success};
      `};

  ${({type}) =>
    type === 'OCUPADO' &&
    css`
      color: ${({theme}) => theme.colors.attention};
    `};

  text-transform: capitalize;
`;

export const AttendantDescription = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  height: ${RFValue(150)}px;
`;

export const ProfileDetailsText = styled.Text`
  width: ${Platform.OS === 'ios' ? RFValue(208) : RFValue(242)}px;
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text};
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 10px;
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  width: ${RFValue(43)}px;
  height: ${RFValue(43)}px;
  background-color: ${({theme}) => theme.colors.primary};
  border-radius: 25px;
`;

export const ButtonText = styled.Text`
  color: ${({theme}) => theme.colors.title};
  padding-left: 10px;
  font-size: 10px;
`;

export const Icon = styled(Ionicons)`
  color: ${({theme}) => theme.colors.secondary};
  font-size: ${RFValue(28)}px;
  margin-bottom: ${RFValue(10)}px;
`;

export const IconStart = styled(AntDesign)`
  color: ${({theme}) => theme.colors.gold};
  font-size: ${RFValue(12)}px;
  margin-bottom: ${RFValue(12)}px;
`;

export const ChatIconService = styled(Entypo)`
  color: ${({theme}) => theme.colors.secondary};
  font-size: ${RFValue(28)}px;
`;

export const Separator = styled.View`
  margin: 10px 0 10px;
  justify-content: center;
  align-items: center;
  height: ${RFValue(24)}px;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const SeparatorText = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.secondary};
  font-size: 14px;
  font-weight: bold;
`;

export const TimeTableText = styled.Text`
  text-align: center;
  text-transform: none;
  color: ${({theme}) => theme.colors.text};
`;

export const CommentView = styled.ScrollView`
  flex: 1;
`;

export const CommentsWrapper = styled.View`
  background-color: ${({theme}) => theme.colors.shape};
  margin: 2px;
  padding: 8px;
  border: solid 5px;
  border-color: ${({theme}) => theme.colors.primary};
  border-radius: 8px;
`;

export const CommentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CommentNameView = styled.View`
  height: 18px;
  padding: 0 6px;
  border-radius: 10px;
  background-color: ${({theme}) => theme.colors.attention};
`;

export const CommentedBy = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  text-transform: lowercase;
`;

export const CommentDate = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text};
  font-size: 10px;
`;

export const Comments = styled.Text`
  padding-left: 10px;
  padding-top: 4px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text};
  font-size: 14px;
`;
