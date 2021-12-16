import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  Alert,
  // Platform,
  // KeyboardAvoidingView,
  // TouchableWithoutFeedback,
  // Keyboard,
  Dimensions,
} from 'react-native';
import * as Yup from 'yup';

import {Button} from '../../../../shared/components/Button';
import {Input} from '../../../../shared/components/Input';
import {PasswordInput} from '../../../../shared/components/PasswordInput';

import LogoSvg from '../../../../assets/tarotonline_logo.svg';
import FacebookSvg from '../../../../assets/fb_logo.svg';
// import GoogleSvg from '../../assets/google_logo.svg';
// import AppleSvg from '../../assets/apple_logo.svg';
import {useAuth} from '../../../../shared/hooks/globalContext';

import {SignInSocialButton} from '../../../../shared/components/SignInSocialButton';

import {
  Container,
  LogoView,
  Header,
  // CardIcon,
  Content,
  // Title,
  // SubTitle,
  UserLogin,
  ConfirmationButton,
  CredentialsLabel,
  Form,
  FooterWrapper,
} from './styles';

export function SignIn() {
  const {width} = Dimensions.get('window');

  const {signIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {signInWithFacebook} = useAuth();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  async function handleSignInWithFacebook() {
    try {
      setIsLoading(true);
      return await signInWithFacebook();
    } catch (error) {
      console.log('error:', error);
      Alert.alert(
        'Não foi possível conectar a conta Facebook, tente novamente!',
      );
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    console.log('login w/ Apple');
    // try {
    //   setIsLoading(true);
    //   return await signInWithApple();
    // } catch (error) {
    //   console.log('error:', error);
    //   Alert.alert('Não foi possível conectar a conta Apple, tente novamente! ');
    //   setIsLoading(false);
    // }
  }

  async function handleSignInWithGoogle() {
    console.log('login w/ Google');
    // try {
    //   setIsLoading(true);
    //   await signInWithGoogle();
    //   setIsLoading(false);
    // } catch (error) {
    //   console.log('Cound not connect to google:', error);
    //   Alert.alert(
    //     'Não foi possível conectar a conta Google, tente novamente! ',
    //   );
    //   setIsLoading(false);
    // }
  }

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório!')
          .email('Digite uma e-mail válido!'),
        password: Yup.string().required('Senha obrigatória!'),
      });

      await schema.validate({email, password});

      await signIn({
        email,
        password,
      });
    } catch (error: any) {
      console.log('error: ', error);

      return Alert.alert(`Não foi possível Logar no app: ${error.message}`);
    }
  }

  return (
    // <KeyboardAvoidingView behavior="height" enabled>
    //   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent
      />
      <LogoView>
        <LogoSvg width={width / 2 - 250} />
      </LogoView>
      <Header />
      <Content>
        <UserLogin>
          <CredentialsLabel>Entrar no app</CredentialsLabel>
          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
              style={{textTransform: 'lowercase'}}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>
        </UserLogin>
        <ConfirmationButton>
          <Button
            title="Iniciar sessão"
            onPress={handleSignIn}
            enabled={!isLoading}
            loading={isLoading}
            color="secondary"
          />
        </ConfirmationButton>
        <FooterWrapper>
          <CredentialsLabel>Acesso rápido com</CredentialsLabel>
          {/* <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
                Alert.alert(`Não foi possível Logar no app: ${result.error}`);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data: AccessToken | null) => {
                    const accessToken: string | undefined =
                      data?.accessToken.toString();
                    handleSignInWithFacebook(accessToken);
                  },
                );
              }
            }}
            onLogoutFinished={() => console.log('logout.')}
          /> */}
          <SignInSocialButton
            title="Conectar via Facebook"
            svg={FacebookSvg}
            onPress={handleSignInWithFacebook}
          />
          {/* <SignInSocialButton
            title="Conectar via Google"
            svg={}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === 'ios' && (
            <SignInSocialButton
              title="Conectar via Apple"
              svg={}
              onPress={handleSignInWithApple}
            />
          )} */}
        </FooterWrapper>
      </Content>
    </Container>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
}
