import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Auth from '../../api/Auth';
import {setCommonInfo} from '../../store/global/state';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
} from '../ColorCode';
import BasicTextInput from '../common/basicTextInput';
import ButtonComponent from '../common/ButtonComponent';
import Top from '../common/top';
import {STORED_ACCESS_TOKEN} from '../constantProperties';

const {width, height} = Dimensions.get('window');
const paddingHorizontal = 18;
const graph_1 = require('../../../assets/image/graph_1.png');
const MyInsurance = (props: any) => {
  const navigation = useNavigation();

  function moveToNext() {
    navigation.navigate(
      'MyInsuranceConfirm' as never,
      {title: 'Add $200,000 to Protection'} as never,
    );
    // const param = {
    //   type: 'email',
    //   value: inheritCode,
    // };
    // Auth.auth(param)
    //   .then(res => {
    //     const {token} = res.data;
    //     setCommonInfo(STORED_ACCESS_TOKEN, token);
    //     navigation.navigate('VerifyCode' as never, {email: email} as never);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     Alert.alert('네트워크 호출도중 오류발생');
    //   });
  }

  return (
    <>
      <KeyboardAvoidingView behavior="padding">
        <View style={s.wrapper}>
          <Top
            title={'View My Insurance'}
            backgroundColor={BASE_BACKGROUND}
            left={true}
            onTouchBackButton={navigation.goBack}
          />
          <FastImage resizeMode="cover" style={s.graph} source={graph_1} />

          <Text style={s.title}>Edit My Insurance</Text>
          <Text style={s.subTitle}>
            55% of your cryptocurrency is covered by insurance. Protect more of
            your assets against certain types of hacking and accidents.
          </Text>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 22,
              position: 'absolute',
              bottom: 43,
            }}>
            <ButtonComponent
              title="Add $200,000 to Protection"
              subTitle="(+10 MU:Points/m)"
              width="100%"
              borderColor={MAIN_BLACK}
              titleColor={CC_WHITE}
              borderRadius={20}
              bodyColor={MAIN_BLACK}
              click={moveToNext}
            />
            <View style={{height: 10}} />
            <ButtonComponent
              title="Subtract $200,000 from Protection"
              subTitle="(-10 MU:Points/m)"
              width="100%"
              borderColor={BASE_BUTTON}
              titleColor={MAIN_BLACK}
              borderRadius={20}
              bodyColor={BASE_BUTTON}
              click={() => {}}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default MyInsurance;

const s = StyleSheet.create({
  wrapper: {
    zIndex: -1,
    paddingTop: 50 + getStatusBarHeight(),
    width: '100%',
    backgroundColor: BASE_BACKGROUND,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    marginLeft: 23,
    marginTop: 35,
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 28.8,
  },
  inputTitle: {
    marginLeft: 23,
    marginTop: 50,
    fontSize: 14,
    fontWeight: '600',
    color: DIMED_GRAY,
  },
  graph: {
    // width: width - paddingHorizontal * 2,
    // height: ((width - paddingHorizontal * 2) * 236) / 340,
    width: width,
    height: (width * 236) / 340,
    marginTop: 19,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18.75,
    color: '#000000',
    paddingHorizontal: 28,
    marginTop: 28,
  },
});
