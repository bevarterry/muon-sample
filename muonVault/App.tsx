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

const Stack = createStackNavigator();
const baseTransitionOption = {
  ...TransitionPresets.SlideFromRightIOS,
};
const modalPresentOption = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
};
const App = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      fallback={<ActivityIndicator color="blue" size="large" />}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
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
        {/*
        <Stack.Screen name="Character" component={Character} options={{...TransitionPresets.ModalSlideFromBottomIOS, 
          title: 'Select Character',
          headerShown: true }}
          /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
