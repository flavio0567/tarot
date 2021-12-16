import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

export function App() {
  // GoogleSignin.configure();
  // const [userState, setUserState] = useState();

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     setUserState(userInfo);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  return (
    <SafeAreaView>
      <View>
        <Text>Teste</Text>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(
                (data: AccessToken | null) => {
                  console.log('token:', data?.accessToken.toString());
                },
              );
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        />
        {/* <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        /> */}
      </View>
    </SafeAreaView>
  );
}
