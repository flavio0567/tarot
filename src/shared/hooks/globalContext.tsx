/* eslint-disable no-shadow */
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import api from '../services/api';
import {Alert, Platform} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  qtdcreditos: number;
}

interface Token {
  token: string;
  expiration: Date;
}

interface AuthState {
  user: User;
  token: Token;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signInWithApple(): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signInWithFacebook(): Promise<void>;
  signOut(): Promise<void>;
  isLoading: boolean;
  selectedMode: (mode: string) => Promise<void>;
  mode: string;
  selectedCountry: (country: string) => Promise<void>;
  callingCode: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [mode, setMode] = useState('');
  const [callingCode, setCallingCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');
  const [expiration, setExpiration] = useState(new Date(''));

  useEffect(() => {
    const {APIKEY} = process.env;
    api.defaults.headers.APIKEY = APIKEY;

    async function clearAll(): Promise<void> {
      await AsyncStorage.multiRemove([
        // '@TarotOnline:user',
        '@TarotOnline:token',
      ]);
    }
    clearAll();
  }, []);

  async function loadStorageData(): Promise<void> {
    const [user, token] = await AsyncStorage.multiGet([
      '@TarotOnline:user',
      '@TarotOnline:token',
    ]);
    if (user[1] && token[1]) {
      api.defaults.headers.TOKEN = JSON.parse(token[1]).token;
      console.log('expiration in context:', JSON.parse(token[1]).expiration);
      setData({
        user: JSON.parse(user[1]),
        token: {
          token: JSON.parse(token[1]).token,
          expiration: JSON.parse(token[1]).expiration,
        },
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadStorageData();
  }, []);

  async function setClientDetail(avatar: string | null) {
    try {
      const authenticationResponse = await api.get(
        'autenticacao/detalhes-cliente/',
      );

      const {Codigo, Email, Nome, QtdCreditos} = authenticationResponse.data;

      const dataValues = {
        id: Codigo,
        email: Email,
        name: Nome,
        avatar,
        qtdcreditos: QtdCreditos,
      };
      
      console.log('dataValues in client details:', dataValues);
      await AsyncStorage.setItem(
        '@TarotOnline:user',
        JSON.stringify(dataValues),
      );

      setData({
        user: dataValues,
        token: {token, expiration},
      });
    } catch (err) {
      console.log('Could not get client informations:', err);
      Alert.alert('Erro ao obter detalhes do cliente!');
    }
  }

  const getTokenFromPlatform = async (
    provider: string,
    token: string,
    id_token: string | null,
    avatar: string | null,
  ) => {
    console.log('gettokenFromPlarform:', provider, token, id_token, avatar);
    try {
      await api
        .post('autenticacao/login-social/', {
          Provedor: provider,
          AccessToken: token,
          id_token,
        })
        .then(async res => {
          const {Token, DataExpiracao} = res.data;
          api.defaults.headers.TOKEN = Token;

          setToken(Token);
          setExpiration(DataExpiracao);

          await AsyncStorage.setItem(
            '@TarotOnline:token',
            JSON.stringify({Token, DataExpiracao}),
          );

          setClientDetail(avatar);
        });
    } catch (error: any) {
      console.log('in getTokenFromPlatform login failed:', error);
      throw new Error(error);
    }
  };

  async function signInWithApple() {
    loadStorageData();
    console.log('data:', data)

    try {
      let avatar: string | null;
      await api
        .get('outros/login-social/')
        .then(async res => {
          const { Apple } = res.data;

          const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
          })
          const { identityToken, nonce, fullName, email } = appleAuthRequestResponse;
          // console.log('identityToken, nonce______', appleAuthRequestResponse);
          const name = fullName?.givenName! + ' ' + fullName?.familyName;

          if (fullName?.givenName) {
            avatar = `https://ui-avatars.com/api/?name=${name}&length=2`;
          }

          getTokenFromPlatform('Apple', nonce, identityToken, avatar);
        })
    } catch (error: any) {
      console.log('Social athentication is not working:', error);
      throw new Error(error);
    }
  }

  async function signInWithFacebook() {
    try {
      await LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        async function (result) {
          if (result.isCancelled) {
            console.log('Login cancelled');
            setIsLoading(false);
          } else {
            console.log(
              'Login success with permissions: ' +
                result?.grantedPermissions?.toString(),
            );
            await AccessToken.getCurrentAccessToken().then(data => {
              const token: any = data?.accessToken;
              fetch(
                `https://graph.facebook.com/me?fields=id,name,picture.type(large),email&access_token=${data?.accessToken}`,
              )
                .then(response => response.json())
                .then(json => {
                  const {picture} = json;
                  getTokenFromPlatform('Facebook', token, picture.data.url);
                });
            });
          }
        },
        function (error) {
          console.log('Login fail with error: ' + error);
        },
      );

      // await api
      //   .post('autenticacao/login-social/', {
      //     Provedor: 'Facebook',
      //     AccessToken: accessToken,
      //   })
      //   .then(async res => {
      //     const {Token, DataExpiracao} = res.data;
      //     console.log('retorno da autenticacao do login-social:', res.data);
      //     api.defaults.headers.TOKEN = Token;

      //     setToken(Token);
      //     setExpiration(DataExpiracao);

      //     await AsyncStorage.setItem(
      //       '@TarotOnline:token',
      //       JSON.stringify({Token, DataExpiracao}),
      //     );

      //     setClientDetail('');
      //   });

      // await FB.initializeAsync({appId: facebookAppId, appName: 'tarotonline'});
      // const data = await FB.logInWithReadPermissionsAsync({
      //   permissions: ['public_profile', 'email'],
      // });
      // const {type} = data;

      // if (type === 'success') {
      //   const response = await fetch(
      //     `https://graph.facebook.com/me?fields=id,name,picture.type(large),email&access_token=${data.token}`,
      //   );
      //   const userInfo = await response.json();
      //   console.log(userInfo);
      // const {url} = userInfo.picture.data;
      // getTokenFromPlatform('Facebook', data.token, url);
      // }
    } catch (error: any) {
      console.log('Social athentication is not working:', error);
      throw new Error(error);
    }
  }

  async function signInWithGoogle() {
    
    try {
      await api
        .get('outros/login-social/')
        .then(async res => {
          const { Google } = res.data;
          console.log('Google token:', Google);

          if (Platform.OS === 'ios') {
            console.log('ios configure');
            GoogleSignin.configure({
              webClientId: Google,
              offlineAccess: true,
            });
            signIn();
          } else {
            console.log('Google Android  Auth')
            GoogleSignin.configure({
              scopes: ['profile', 'email'],
              webClientId: Google,
              offlineAccess: true,
            });
            signIn();
          }
        
          async function signIn() {
            try {
              await GoogleSignin.hasPlayServices();
              const userInfo = await GoogleSignin.signIn();
              Alert.alert("success:" + JSON.stringify(userInfo));
              console.log(userInfo);
            } catch (error) {
              console.log('Error:', error);
            };
          }


          // const userInfo = await GoogleSignin.signInSilently();
        });
    } catch (error: any) {
      console.log('Social athentication is not working:', error);
      throw new Error(error);
    }
  }

  async function signIn({email, password}: SignInCredentials) {
    try {
      const signInResponse = await api.post('autenticacao/login/', {
        Email: email,
        Senha: password,
      });
      const {Token, DataExpiracao} = signInResponse.data;
      console.log('in singin token:', signInResponse.data);
      setExpiration(DataExpiracao);
      api.defaults.headers.TOKEN = Token;

      setClientDetail('');
    } catch (error) {
      console.log('Could not login on app:', error);
      Alert.alert(
        'Erro ao tentar realizar Login no app, verifique suas credenciais!',
      );
    }
  }

  async function signOut() {
    async function clearAll(): Promise<void> {
      await AsyncStorage.multiRemove([
        // '@TarotOnline:user', retirado por conta do login Apple que so entrega o nome no primeiro acesso
        '@TarotOnline:token',
      ]);
    }
    clearAll();

    setData({} as AuthState);
  }

  async function selectedMode(mode: string) {
    setMode(mode);
  }

  async function selectedCountry(country: string) {
    setCallingCode(country);
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        selectedMode,
        mode,
        signIn,
        signInWithApple,
        signInWithGoogle,
        signInWithFacebook,
        signOut,
        isLoading,
        selectedCountry,
        callingCode,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export {AuthProvider, useAuth};
