import React, {useState} from 'react';
import {useTheme} from 'styled-components';

import {Alert} from 'react-native';

import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

import * as Progress from 'react-native-progress';
import {WebView} from 'react-native-webview';

import {Container, Separator, BackButton, SeparatorText, Icon} from './styles';

type NavProps = NavigationProp<ParamListBase>;

export function PaymentWebView({route}: any) {
  const {Link, attendant, paymentMethods, price, mode} = route.params;
  const navigation = useNavigation<NavProps>();
  const theme = useTheme();

  const [progress, setProgress] = useState(0);
  const [isLoaded, setLoaded] = useState(false);

  const js =
    "window.alert('Você será direcionado para a site TarotOnline. A qualquer momento use a seta no canto superior esquerdo para retornar ao app!')";

  // const localFile = Platform.OS === 'ios' ? require('../../assets/chat.html') :
  //   { uri: 'file:///android_asset/chat.html' };

  return (
    <Container>
      <Separator>
        <BackButton
          onPress={() =>
            navigation.navigate('SelectedAttendant', {attendant, mode})
          }>
          <Icon name="chevron-back" />
        </BackButton>
        <SeparatorText>Comprar Créditos</SeparatorText>
      </Separator>
      {!isLoaded && (
        <Progress.Bar
          borderWidth={0}
          borderRadius={0}
          color={theme.colors.secondary}
          progress={progress}
          width={null}
        />
      )}
      <WebView
        source={{uri: `${Link}`}}
        // injectedJavaScriptBeforeContentLoaded={js}
        onError={event =>
          Alert.alert(`WebView error ${event.nativeEvent.description}`)
        }
        onLoadProgress={event => setProgress(event.nativeEvent.progress)}
        onLoadEnd={() => setLoaded(true)}
      />
    </Container>
  );
}
