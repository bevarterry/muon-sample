import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import { updateCoinRatioAction } from '~/store/action/coinRatioAction';
import { setGlobalLoadingState } from '~/store/modules/GlobalLoadingReducer';
import {UserApiResponse} from '../api/interface/userApiResponse';
import User from '../api/User';
import {getAccessToken} from '../storage/AccessTokenStorage';
import {updateScAssets} from '../store/action/scAction';
import {updateVaultsFromApi} from '../store/action/VaultAction';
import {updateWallet} from '../store/action/walletAction';
import {getCommonInfo, setCommonInfo} from '../store/global/state';
import {CC_LOGHT_YELLOW, SPLASH_BACKGROUND} from './ColorCode';
import {STORED_ACCESS_TOKEN, STORED_FCM_TOKEN} from './constantProperties';
const splash_log_1 = require('../../assets/image/splash_logo_1.png');
const splash_log_2 = require('../../assets/image/splash_logo_2.png');
const splash_log_3 = require('../../assets/image/splash_logo_3.png');
const Splash = (props: any) => {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(updateCoinRatioAction());
    
    setTimeout(() => {
      accessTokenCheck();
    }, 800);
  }, []);

  async function accessTokenCheck() {
    
    const accessTokenStore = await getAccessToken();
    console.log('[access token] ', accessTokenStore?.accessToken);
    if (!accessTokenStore?.accessToken)
      return props.navigation.replace('StepOne');

    setCommonInfo(STORED_ACCESS_TOKEN, accessTokenStore.accessToken);

    updateUserInfo();

    updateFcmToken();
  }

  function updateUserInfo() {
    dispatch(setGlobalLoadingState(true));
    User.info()
      .then(e => {
        const res: UserApiResponse = e;

        dispatch(updateWallet(res.Wallet));

        dispatch(updateVaultsFromApi());

        console.log(
          '::::::::::::::::::::: [User Info ] ' + JSON.stringify(res),
        );
        dispatch(updateScAssets(res.SafeAddress, res.Wallet, res.MUP));
        dispatch(setGlobalLoadingState(false));
        props.navigation.replace('Main');
      })
      .catch(e => {
        dispatch(setGlobalLoadingState(false));
        props.navigation.replace('StepOne');
      });
  }

  function updateFcmToken() {
    User.updateFcm({fcmToken: getCommonInfo(STORED_FCM_TOKEN)});
  }

  return (
    <View style={s.wrapper}>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <FastImage resizeMode="contain" style={s.logo1} source={splash_log_1} />
        <FastImage resizeMode="contain" style={s.logo2} source={splash_log_2} />
      </View>
      <FastImage resizeMode="contain" style={s.logo3} source={splash_log_3} />
    </View>
  );
};

export default Splash;

const s = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SPLASH_BACKGROUND,
  },
  logo1: {
    width: 196,
    height: 34,
    marginBottom: 5,
  },
  logo2: {
    width: 189,
    height: 19,
  },
  logo3: {
    width: 122,
    height: 17,
    zIndex: 2,
    position: 'absolute',
    bottom: 111,
  },
});
