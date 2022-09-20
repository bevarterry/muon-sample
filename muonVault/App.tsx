import {NavigationContainer} from '@react-navigation/native';
import React, {type PropsWithChildren} from 'react';
import {navigationRef} from './src/view/RootNavigation';
import {ActivityIndicator, useColorScheme} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Splash from './src/view/Splash';
import Home from './src/view/home';
import Crypto from './src/view/crypto';
import Asset from './src/view/asset';
import {SafeAreaView} from 'react-native-safe-area-context';
import StepOne from './src/view/onboard/StepOne';
import StepTwo from './src/view/onboard/StepTwo';
import Main from './src/view/main';
import {Provider} from 'react-redux';
import store from './src/store';
import VaultDetail from './src/view/vault/detail';
import CoinDetail from './src/view/vault/coinDetail';
import WithDraw from './src/view/vault/transaction/withDraw';
import CompleteWithdraw from './src/view/vault/transaction/completeWithdraw';

const Stack = createStackNavigator();
const baseTransitionOption = {
  ...TransitionPresets.SlideFromRightIOS,
};
const modalPresentOption = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
};
const App = () => {
  return (
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
            name="WithDraw"
            component={WithDraw}
            options={baseTransitionOption}
          />
          <Stack.Screen
            name="CompleteWithdraw"
            component={CompleteWithdraw}
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
  );
};

export default App;
