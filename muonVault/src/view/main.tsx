import React, {useEffect, useRef} from 'react';
import {
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {BASE_BACKGROUND, MAIN_BLACK} from './ColorCode';
import deviceInfoModule from 'react-native-device-info';
import Home from './home';
import Vault from './vault';
import Nft from './nft';
import Life from './life';
import Concierge from './concierge';
import TabIcon from './common/tabIcon';
import GlobalModal from './globalModal';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/modules';
import GlobalLoading from './common/GlobalLoading';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-simple-toast';
import { NOTI_AUTH_PHONE } from './constantProperties';

const Tab = createBottomTabNavigator();

const home_icon = require('../../assets/image/home_icon.png');
const vault_icon = require('../../assets/image/vault_icon.png');
const nft_icon = require('../../assets/image/nft_icon.png');
const life_icon = require('../../assets/image/life_icon.png');
const concierge_icon = require('../../assets/image/concierge_icon.png');

const Main = () => {
  const globalLoadingStateStore = useSelector(
    (root: RootState) => root.globalLoadingState,
  );
  let globalModalStore = useSelector(
    (root: RootState) => root.globalModalStore,
  );
  const bottomModalRef = useRef();

  useEffect(() => {
    if (globalModalStore.open) {
      //@ts-ignore
      bottomModalRef.current.openModal();
    } else {
      //@ts-ignore
      bottomModalRef.current.closeModal();
    }
  }, [globalModalStore]);




  // messaging().onMessage(async remoteMessage => {
  //   if (remoteMessage === null) return;

  //   console.log('**************** 앱 켜져있을떄 호출됨 : ', remoteMessage.data,);
    
  // });

  // messaging().onNotificationOpenedApp(remoteMessage => {
  //   if (remoteMessage === null) return;
  //   console.log('**************** 노티 클릭후 떴을떄 : ', remoteMessage);
  //   Toast.show(`푸시 옴`+ remoteMessage.data, Toast.SHORT);
  // });

  // messaging().getInitialNotification().then(remoteMessage => {
  //   if (remoteMessage === null) return;
  //   console.log('**************** 앱 완전 재실행시 : ', remoteMessage);
  //   Toast.show(`푸시 옴`+ remoteMessage.data, Toast.SHORT);
  // });
  
  // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    
  //   if (remoteMessage === null) return;
    
  //   console.log('**************** 앱 중지 상태 호출됨 : ', remoteMessage);
  //   Toast.show(`푸시 옴`+ remoteMessage.data, Toast.SHORT);
  // });






  messaging().onMessage(async remoteMessage => {
    if (remoteMessage === null) return;

    pushNextStep(remoteMessage?.data?.title);
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage === null) return;
  
    pushNextStep(remoteMessage?.data?.title);
  });

  messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage === null) return;
    
    console.log("[MAIN getInitialNotification OpenedApp] id ", JSON.stringify(remoteMessage));
    pushNextStep(remoteMessage?.data?.title);
  });
  
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    
    if (remoteMessage === null) return;
    

    console.log("[MAIN Background Push] id ", JSON.stringify(remoteMessage));
    pushNextStep(remoteMessage?.data?.title);
  });



  function pushNextStep(id: string | undefined) {
    if (id === undefined) return;

    if (id === NOTI_AUTH_PHONE) {
      
      //return props.navigation.navigate('Character' as never);
    }

  }











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
        backgroundColor={BASE_BACKGROUND}
        barStyle="dark-content"
        translucent={true}
      />
      
        <View style={s.allWrapper}>
          <Tab.Navigator
            sceneContainerStyle={{width: '100%', height: '100%'}}
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
        </View>
        
      
      <GlobalModal
        //@ts-ignore
        ref={bottomModalRef}
        content={globalModalStore.content}
        height={globalModalStore.height}
      />
      <GlobalLoading action={globalLoadingStateStore.state} />
    </>
  );
};

export default Main;

const s = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: BASE_BACKGROUND,
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
  allWrapper: {
    zIndex: -1,
    paddingTop: getStatusBarHeight(),
    paddingBottom: Platform.OS==='ios' ? 0: 15,
    width: '100%',
    backgroundColor: BASE_BACKGROUND,
    height: '100%',
  },
});
