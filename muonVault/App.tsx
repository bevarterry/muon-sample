import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, type PropsWithChildren} from 'react';
import {navigationRef} from './src/view/RootNavigation';
import {ActivityIndicator, LogBox, useColorScheme} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Splash from './src/view/Splash';
import Home from './src/view/home';
import Crypto from './src/view/crypto';
import Asset from './src/view/asset';
import {SafeAreaView} from 'react-native-safe-area-context';
import StepOne from './src/view/onboard/StepOne';
import StepTwo from './src/view/onboard/StepTwo';
import Main from './src/view/main';
import {Provider, useSelector} from 'react-redux';
import store from './src/store';
import VaultDetail from './src/view/vault/detail';
import CoinDetail from './src/view/vault/coinDetail';
import WithDraw from './src/view/vault/coinDetail/withdraw/withDraw';
import CompleteWithdraw from './src/view/vault/coinDetail/withdraw/completeWithdraw';
import BuyVp from './src/view/vault/coinDetail/buyVp/buyVp';
import CompleteBuyVp from './src/view/vault/coinDetail/buyVp/completeBuyVp';
import InputEmail from './src/view/auth/inputEmail';
import VerifyCode from './src/view/auth/verifyCode';
import messaging from '@react-native-firebase/messaging';
import {setCommonInfo} from '~/store/global/state';
import {STORED_FCM_TOKEN} from '~/view/constantProperties';
import InputInheritCode from '~/view/inherit/inputInheritCode';
import MyInsurance from '~/view/concierge/myInsurance';
import MyInsuranceConfirm from '~/view/concierge/myInsuranceConfirm';
import MyInsuranceComplete from '~/view/concierge/myInsuranceComplete';
import InputPhone from '~/view/auth/inputPhone';
import GlobalLoading from '~/view/common/GlobalLoading';
import {RootState} from '~/store/modules';
import ConfirmBuyVp from '~/view/vault/coinDetail/buyVp/confirmBuyVp';
import TransactionHistory from '~/view/vault/coinDetail/transactionHistory';
import BiometicContainer from '~/view/auth/biometicContainer';
LogBox.ignoreLogs([
  "The provided value 'ms-stream' is not a valid 'responseType'.",
  "The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
]);
const Stack = createStackNavigator();
const baseTransitionOption = {
  ...TransitionPresets.SlideFromRightIOS,
};
const modalPresentOption = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
};
const App = () => {
  async function requestUserPermissionForFCM() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();

      console.log('fcm token:', token);
      console.log('Authorization status:', authStatus);
      setCommonInfo(STORED_FCM_TOKEN, token);
    } else {
      console.log('fcm auth fail');
    }
  }

  useEffect(() => {
    requestUserPermissionForFCM();
  }, []);

  return (
    <>
      <Provider store={store}>
        <NavigationContainer
          ref={navigationRef}
          fallback={<ActivityIndicator color="blue" size="large" />}>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen
              name="Main"
              component={Main}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="InputEmail"
              component={InputEmail}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="InputPhone"
              component={InputPhone}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="VerifyCode"
              component={VerifyCode}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="BiometicContainer"
              component={BiometicContainer}
              options={modalPresentOption}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="Crypto"
              component={Crypto}
              options={baseTransitionOption}
            />

            <Stack.Screen
              name="Asset"
              component={Asset}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="StepOne"
              component={StepOne}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="StepTwo"
              component={StepTwo}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="Inherit"
              component={InputInheritCode}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="VaultDetail"
              component={VaultDetail}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="CoinDetail"
              component={CoinDetail}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="TransactionHistory"
              component={TransactionHistory}
              options={baseTransitionOption}
            />

            <Stack.Screen
              name="WithDraw"
              component={WithDraw}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="BuyVP"
              component={BuyVp}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="ConfirmBuyVp"
              component={ConfirmBuyVp}
              options={baseTransitionOption}
            />

            <Stack.Screen
              name="CompleteBuyVp"
              component={CompleteBuyVp}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="CompleteWithdraw"
              component={CompleteWithdraw}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="MyInsurance"
              component={MyInsurance}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="MyInsuranceConfirm"
              component={MyInsuranceConfirm}
              options={baseTransitionOption}
            />
            <Stack.Screen
              name="MyInsuranceComplete"
              component={MyInsuranceComplete}
              options={baseTransitionOption}
            />

            {/*
        <Stack.Screen name="Character" component={Character} options={{...TransitionPresets.ModalSlideFromBottomIOS, 
          title: 'Select Character',
          headerShown: true }}
          /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
