import React from 'react';
import {
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {MAIN_BLACK} from './ColorCode';
import deviceInfoModule from 'react-native-device-info';
import Home from './home';
import Vault from './vault';
import Nft from './nft';
import Life from './life';
import Concierge from './concierge';
import TabIcon from './common/tabIcon';
const Tab = createBottomTabNavigator();

const home_icon = require('../../assets/image/home_icon.png');
const vault_icon = require('../../assets/image/vault_icon.png');
const nft_icon = require('../../assets/image/nft_icon.png');
const life_icon = require('../../assets/image/life_icon.png');
const concierge_icon = require('../../assets/image/concierge_icon.png');

const Main = () => {
  // 탭 메뉴 함수
  function TabOption({state, descriptors, navigation, props}: any) {
    return (
      <>
        <View style={s.wrapper}>
          {state.routes.map(
            (route: {key: string; name: string}, index: any) => {
              const icon = (name: string, index: any) => {
                let tapColor = '#222222';
                if (state.index === index) tapColor = MAIN_BLACK;

                if (name === 'Home')
                  return (
                    <TabIcon
                      title="Home"
                      active={state.index === index}
                      icon={home_icon}
                    />
                  );
                else if (name === 'Vault')
                  return (
                    <TabIcon
                      title="Vault"
                      active={state.index === index}
                      icon={vault_icon}
                    />
                  );
                else if (name === 'Nft')
                  return (
                    <TabIcon
                      title="NFT"
                      active={state.index === index}
                      icon={nft_icon}
                    />
                  );
                else if (name === 'Life')
                  return (
                    <TabIcon
                      title="Life"
                      active={state.index === index}
                      icon={life_icon}
                    />
                  );
                else if (name === 'Concierge')
                  return (
                    <TabIcon
                      title="Concierge"
                      active={state.index === index}
                      icon={concierge_icon}
                    />
                  );
              };
              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={() => {
                    navigation.navigate(route.name);
                  }}
                  style={s.tabOptionWrapper}>
                  {icon(route.name, index)}
                </TouchableOpacity>
              );
            },
          )}
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor="#0000ff00"
        barStyle="dark-content"
        translucent={true}
      />
      <View
        style={{
          width: '100%',
          height: getStatusBarHeight(),
        }}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
        }}
        tabBar={tabProps => {
          return <TabOption {...{...tabProps}} />;
        }}>
        <Tab.Screen component={Home} name="Home" />
        <Tab.Screen component={Vault} name="Vault" />
        <Tab.Screen component={Nft} name="Nft" />
        <Tab.Screen component={Life} name="Life" />
        <Tab.Screen component={Concierge} name="Concierge" />
      </Tab.Navigator>
      {/* <GlobalLoading action={globalLoadingStateStore.state} /> */}
    </>
  );
};

export default Main;

const s = StyleSheet.create({
  wrapper: {
    zIndex: 1,
    flexDirection: 'row',
    paddingHorizontal: 22,
    paddingTop: 5,
    paddingBottom:
      Platform.OS === 'ios' && deviceInfoModule.hasNotch() ? 30 : 0,
  },
  tabOptionWrapper: {
    width: '20%',
    height: 60,
  },
});
