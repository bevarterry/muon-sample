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
const MyInsuranceConfirm = (props: any) => {
  const navigation = useNavigation();

  function moveToNext() {
    navigation.navigate(
      'MyInsuranceComplete' as never,
      {title: 'Add $200,000 to Protection'} as never,
    );
  }

  return (
    <>
      <KeyboardAvoidingView behavior="padding">
        <View style={s.wrapper}>
          <Top
            title={props.route.params.title}
            backgroundColor={BASE_BACKGROUND}
            left={true}
            onTouchBackButton={navigation.goBack}
          />
          <FastImage resizeMode="cover" style={s.graph} source={graph_2} />

          <View style={s.summary}>
            <View style={[s.row, {marginTop: 35}]}>
              <Text style={s.title}>Change</Text>
              <Text style={s.value}>+$200,000</Text>
            </View>
            <View style={[s.row, {marginTop: 5}]}>
              <Text style={s.title}>Insured Crypto</Text>
              <Text style={s.value}>$400,000</Text>
            </View>
            <View style={[s.row, {marginTop: 29}]}>
              <Text style={s.title}>Add</Text>
              <Text style={s.value}>+ $200,000</Text>
            </View>

            <View style={{width: '100%', borderWidth: 1, marginVertical: 28}} />

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
                +10 MU:Points/m
              </Text>
            </View>

            <View style={[s.endSummary, {marginTop: 30}]}>
              <Text
                style={{fontSize: 12, fontWeight: '500', color: DIMED_GRAY}}>
                Balance:
              </Text>
              <Text style={{fontSize: 12, fontWeight: '500', color: '#000000'}}>
                123,013 MU:P
              </Text>
            </View>
            <View style={[s.endSummary]}>
              <Text
                style={{fontSize: 12, fontWeight: '500', color: DIMED_GRAY}}>
                15 MU:Points will be charged on
              </Text>
              <Text style={{fontSize: 12, fontWeight: '500', color: '#000000'}}>
                Feb 1st. 20
              </Text>
            </View>
            <View style={[s.endSummary]}>
              <Text
                style={{fontSize: 12, fontWeight: '500', color: DIMED_GRAY}}>
                MU:Points will be charged starting
              </Text>
              <Text style={{fontSize: 12, fontWeight: '500', color: '#000000'}}>
                March 1st.
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 22,
              position: 'absolute',
              bottom: 43,
            }}>
            <ButtonComponent
              title="Confirm"
              width="100%"
              borderColor={MAIN_BLACK}
              titleColor={CC_WHITE}
              borderRadius={20}
              bodyColor={MAIN_BLACK}
              click={moveToNext}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default MyInsuranceConfirm;

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

  summary: {
    width: '100%',
    marginTop: 0,
    marginHorizontal: 8,
    paddingHorizontal: 30,
    paddingBottom: 39,
  },
  row: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  endSummary: {
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
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
});
