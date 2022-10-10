import React, {useEffect, useRef} from 'react';
import {
  StatusBar,
  TouchableOpacity,
  View,
  Platform,
  StyleSheet,
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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store/modules';
import GlobalLoading from './common/GlobalLoading';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-simple-toast';
import { NOTI_AUTH_PHONE } from './constantProperties';
import { isDuplicated, stringToHash } from './Hash';
import { updateVaultsFromApi } from '~/store/action/VaultAction';
import { updateWallet } from '~/store/action/walletAction';
import { updateScAssets } from '~/store/action/scAction';
import User from '~/api/User';
import { UserApiResponse } from '~/api/interface/userApiResponse';
import { parseToEther } from '~/bc/VaultEtherApi';

const Tab = createBottomTabNavigator();

const home_icon = require('../../assets/image/home_icon.png');
const vault_icon = require('../../assets/image/vault_icon.png');
const nft_icon = require('../../assets/image/nft_icon.png');
const life_icon = require('../../assets/image/life_icon.png');
const concierge_icon = require('../../assets/image/concierge_icon.png');

const Main = () => {
  const dispatch: any = useDispatch();
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




  messaging().onMessage(async (remoteMessage: any) => {
    if (remoteMessage === null) return;

    console.log('**************** 앱 켜져있을떄 호출됨 : ', remoteMessage.data,);
    const hashCodeRomoteMessage = stringToHash(JSON.stringify(remoteMessage));

    if (isDuplicated(hashCodeRomoteMessage)) return;

    pushNextStep(remoteMessage.data.title, remoteMessage.data.message);
  });

  messaging().onNotificationOpenedApp((remoteMessage: any) => {
    if (remoteMessage === null) return;
    console.log('**************** 노티 클릭후 떴을떄 : ', remoteMessage);
    const hashCodeRomoteMessage = stringToHash(JSON.stringify(remoteMessage));

    if (isDuplicated(hashCodeRomoteMessage)) return;

    pushNextStep(remoteMessage.data.title, remoteMessage.data.message);
  });

  messaging().getInitialNotification().then((remoteMessage: any) => {
    if (remoteMessage === null) return;
    console.log('**************** 앱 완전 재실행시 : ', remoteMessage);
    const hashCodeRomoteMessage = stringToHash(JSON.stringify(remoteMessage));

    if (isDuplicated(hashCodeRomoteMessage)) return;

    pushNextStep(remoteMessage.data.title, remoteMessage.data.message);

  });
  
  messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
    
    if (remoteMessage === null) return;
    
    console.log('**************** 앱 중지 상태 호출됨 : ', remoteMessage);
    const hashCodeRomoteMessage = stringToHash(JSON.stringify(remoteMessage));
    
    if (isDuplicated(hashCodeRomoteMessage)) return;

    pushNextStep(remoteMessage.data.title, remoteMessage.data.message);
  });



  function pushNextStep(id: string | undefined, message: any) {    
    if (id === undefined) return;

    if (id === NOTI_AUTH_PHONE) {
      console.log('main noti ', message);
    }else {
      
      const {symbol,string, purpose, value, status, txid} = JSON.parse(message);
      console.log(symbol);
      console.log(string);
      console.log(purpose);
      console.log(value);
      console.log(status);
      console.log(txid);
      if(value === 0) return;
      Toast.show(`[${string}] -> ${status}, ${parseToEther(value)} ${symbol}`, Toast.LONG);
      updateUserInfo();
    }
  }

  function updateUserInfo() {
    User.info()
      .then(e => {
        const res: UserApiResponse = e;

        dispatch(updateWallet(res.Wallet));
        dispatch(updateVaultsFromApi());
        dispatch(updateScAssets(res.SafeAddress, res.Wallet, res.MUP));
      })
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
