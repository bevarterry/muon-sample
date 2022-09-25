import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getAccessToken} from '../storage/AccessTokenStorage';
import {setCommonInfo} from '../store/global/state';
import {CC_LOGHT_YELLOW, SPLASH_BACKGROUND} from './ColorCode';
import {STORED_ACCESS_TOKEN} from './constantProperties';
const splash_log_1 = require('../../assets/image/splash_logo_1.png');
const splash_log_2 = require('../../assets/image/splash_logo_2.png');
const splash_log_3 = require('../../assets/image/splash_logo_3.png');
const Splash = (props: any) => {
  useEffect(() => {
    setTimeout(() => {
      accessTokenCheck();
    }, 800);
  });

  async function accessTokenCheck() {
    const accessTokenStore = await getAccessToken();

    if (!accessTokenStore) return props.navigation.replace('StepOne');

    console.log(':::: Splash access token : ', accessTokenStore);
    setCommonInfo(STORED_ACCESS_TOKEN, accessTokenStore.accessToken);

    props.navigation.replace('Main');
  }

  return (
    <View style={s.wrapper}>
      <FastImage resizeMode="contain" style={s.logo1} source={splash_log_1} />
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
    width: 220,
    height: 40,
    marginBottom: 200,
  },
  logo3: {
    width: 122,
    height: 17,
    zIndex: 2,
    position: 'absolute',
    bottom: 111,
  },
});
