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
  MAIN_BORDER_COROR,
} from '../ColorCode';
import BasicBadge from '../common/basicBadge';

import ButtonComponent from '@view/common/ButtonComponent';
import Top from '../common/top';

const {width, height} = Dimensions.get('window');
const paddingHorizontal = 18;
const graph_2 = require('../../../assets/image/graph_2.png');
const MyInsuranceComplete = (props: any) => {
  const navigation: any = useNavigation();

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

  const badge = (title: string) => {
    return (
      <BasicBadge
        title={title}
        paddingHorizontal={12}
        paddingVertical={4}
        backgroundColor={MAIN_BLACK}
        fontColor={'#ffffff'}
        fontSize={12}
      />
    );
  };

  return (
    <>
      <View style={s.wrapper}>
        <Text style={s.completeText}>Complete!</Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 24,
            marginBottom: 30,
          }}>
          12.00 ETH ($18,702.20) has been transferred to{'\n'} the address
          0x09e3…44E7
        </Text>
        <View style={s.withdrawSummary}>
          <View style={[s.row, {marginTop: 35}]}>
            <Text style={s.title}>Insured Cryptocurrency</Text>
            <Text style={s.value}>$400,000</Text>
          </View>

          <View style={[s.row, {marginTop: 29}]}>
            <Text style={s.title}>Add</Text>
            <Text style={s.value}>+ $200,000</Text>
          </View>

          <View style={{width: '100%', borderWidth: 1, marginVertical: 31}} />
          <View style={[s.row]}>
            <BasicBadge
              title={'Charge'}
              paddingHorizontal={12}
              paddingVertical={2}
              backgroundColor={MAIN_BLACK}
              fontColor={'#ffffff'}
              fontSize={12}
            />
            <Text style={{fontSize: 22, fontWeight: '700', color: '#000000'}}>
              +10 MU:Points/mm
            </Text>
          </View>
          <View style={[s.endSummary, {marginTop: 30}]}>
            <Text style={{fontSize: 12, fontWeight: '500', color: DIMED_GRAY}}>
              Balance:
            </Text>
            <Text style={{fontSize: 12, fontWeight: '500', color: '#000000'}}>
              123,013VP
            </Text>
          </View>
          <View style={[s.endSummary]}>
            <Text style={{fontSize: 12, fontWeight: '500', color: DIMED_GRAY}}>
              15 Vault:Points will be charged on
            </Text>
            <Text style={{fontSize: 12, fontWeight: '500', color: '#000000'}}>
              Feb 1st. 20
            </Text>
          </View>
          <View style={[s.endSummary]}>
            <Text style={{fontSize: 12, fontWeight: '500', color: DIMED_GRAY}}>
              Vault:Points will be charged starting
            </Text>
            <Text style={{fontSize: 12, fontWeight: '500', color: '#000000'}}>
              March 1st.
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 22,
          position: 'absolute',
          bottom: 50,
        }}>
        <ButtonComponent
          title="Done"
          width="100%"
          borderColor={MAIN_BLACK}
          titleColor={CC_WHITE}
          borderRadius={20}
          bodyColor={MAIN_BLACK}
          click={() => {
            navigation.pop(1);
            navigation.pop(2);
            navigation.goBack();
          }}
        />
      </View>
    </>
  );
};

export default MyInsuranceComplete;

const s = StyleSheet.create({
  wrapper: {
    paddingTop: getStatusBarHeight(),
    width: '100%',
    height: '100%',
    backgroundColor: BASE_BACKGROUND,
    paddingHorizontal: 13,
    display: 'flex',
    alignItems: 'center',
  },
  completeText: {
    marginTop: 20,
    fontWeight: '700',
    fontSize: 28,
  },
  componentText: {
    fontSize: 22,
    fontWeight: '700',
  },
  withdrawSummary: {
    width: '100%',
    marginTop: 0,
    marginHorizontal: 8,
    paddingHorizontal: 13,
    paddingBottom: 39,
    backgroundColor: CC_WHITE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: MAIN_BORDER_COROR,
  },
  row: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16.7,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
    color: DIMED_GRAY,
  },
  endSummary: {
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});
