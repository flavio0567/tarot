/* eslint-disable no-shadow */
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import api from '../services/api';
import {Alert} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import { appleAuth } from '@invertase/react-native-apple-authentication';
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
  // signInWithGoogle(): Promise<void>;
  signInWithFacebook(): Promise<void>;
  signOut(): Promise<void>;
  isLoading: boolean;
  selectedMode: (mode: string) => Promise<void>;
  mode: string;
  selectedCountry: (country: string) => Promise<void>;
  callingCode: string;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface AuthorizationFacebookResponse {
  token: string;
  type: string;
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

  const getTokenFromPlatform = async (
    provider: string,
    token: string,
    avatar: string,
  ) => {
    try {
      await api
        .post('autenticacao/login-social/', {
          Provedor: provider,
          AccessToken: token,
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
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const { 
          email,
          fullName,
          identityToken
        } = appleAuthRequestResponse;
        const name = fullName?.givenName! + ' ' + fullName?.familyName;
        console.log(appleAuthRequestResponse)
        if (fullName?.givenName) {
          const avatar = `https://ui-avatars.com/api/?name=${name}&length=2`;

          const dataValues = {
            id: appleAuthRequestResponse.user,
            email,
            name,
            avatar,
            qtdcreditos: 0,
          };

          console.log('dataValues:', dataValues);


          const tokenApple: Token = {
            token: identityToken!,
            expiration: new Date
          }
        }
      }

      

        // try {
        //   if (name) {
        //     await AsyncStorage.setItem(
        //       '@TarotOnline:user',
        //       JSON.stringify(dataValues),
        //     );
        //     setData({
        //       user: dataValues,
        //       token: {token: '', expiration: new Date('')},
        //     });
        //   } else {
        //     const userLoaded = await AsyncStorage.getItem('@TarotOnline:user');
        //     // await AsyncStorage.setItem(
        //     //   '@TarotOnline:token', JSON.stringify(tokenApple),
        //     // );
        //     setData({
        //       user: JSON.parse(userLoaded!),
        //       token: {token: '', expiration: new Date('')},
        //     });
        //   }
        // } catch (error) {
        //   console.log('Cant set asyncstorage credentials:', error);
        //   Alert.alert('Não foi possível armazenar seus dados no dispositivo!');
        // }
      // }
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

  // async function signInWithGoogle() {
  //   try {
  //     const {CLIENT_ID} = process.env;
  //     const {REDIRECT_URI} = process.env;
  //     const RESPONSE_TYPE = 'token';
  //     const SCOPE = encodeURI('profile email');

  //     const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  //     const {type, params} = (await AuthSession.startAsync({
  //       authUrl,
  //     })) as AuthorizationResponse;

  //     if (type === 'success') {
  //       const response = await fetch(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
  //       );
  //       const userInfo = await response.json();
  //       getTokenFromPlatform('Google', params.access_token, userInfo.picture);
  //       setClientDetail(userInfo.picture);
  //     } else {
  //       console.log('retorno do google por desistencia:');
  //     }
  //   } catch (error: any) {
  //     console.log('Social athentication is not working:', error);
  //     throw new Error(error);
  //   }
  // }

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

  async function setClientDetail(avatar: string) {
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
        // signInWithGoogle,
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
