import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {UserApiResponse} from '../api/interface/userApiResponse';
import User from '../api/User';
import {getAccessToken} from '../storage/AccessTokenStorage';
import {updateScAssets} from '../store/action/scAction';
import {updateVaultsFromApi} from '../store/action/VaultAction';
import {updateWallet} from '../store/action/walletAction';
import {setCommonInfo} from '../store/global/state';
import {setWallets} from '../store/modules/walletReducer';
import {CC_LOGHT_YELLOW, SPLASH_BACKGROUND} from './ColorCode';
import {STORED_ACCESS_TOKEN} from './constantProperties';
const splash_log_1 = require('../../assets/image/splash_logo_1.png');
const splash_log_2 = require('../../assets/image/splash_logo_2.png');
const splash_log_3 = require('../../assets/image/splash_logo_3.png');
const Splash = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
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
  }

  function updateUserInfo() {
    User.info()
      .then(e => {
        const res: UserApiResponse = e;

        //@ts-ignore
        dispatch(updateWallet(res.Wallet));

        //@ts-ignore
        dispatch(updateVaultsFromApi());

        //@ts-ignore
        dispatch(updateScAssets(res.SafeAddress, res.Wallet, res.VP));
        props.navigation.replace('Main');
      })
      .catch(e => {
        props.navigation.replace('StepOne');
      });
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
