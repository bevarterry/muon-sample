import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
} from '../../../ColorCode';
import BasicBadge from '../../../common/basicBadge';
import ButtonComponent from '../../../common/ButtonComponent';
import SummaryCard from '../component/summaryCard';
import Top from '../../../common/top';
import InsertVpCard from './insertVpCard';
import CoinTitleComponent from '../../../common/coinTitleComponent';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/modules';
import FastImage from 'react-native-fast-image';

const buy_vp_icon = require('../../../../../assets/image/buy_vp_icon.png');
const arrow_down_img = require('../../../../../assets/image/arrow_down_img.png');
type Props = {
  from: string;
  to: string;
  symbol: string;
  estimateGasFee: number;
  serviceFee: number;
  totalAmount: number;
};
const CompleteBuyVp = (props: any) => {
  const ratioStore = useSelector((root: RootState) => root.ratioStore);
  const navigation: any = useNavigation();
  const [vpValue, setVp] = useState(0);

  const coinRow = (symbol: string, icon: any, value: number, ratio: number) => {
    return (
      <View style={s.coinRow}>
        <CoinTitleComponent
          symbol={symbol}
          imageSource={icon}
          size={30}
          fontSize={16}
          fontWeight={'800'}
          gap={14}
        />
        <View
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <Text style={s.value}>{value}</Text>
          <Text style={s.dollarValue}>$({value * ratio})</Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding": "height"}>
        <View style={s.wrapper}>
          <Top
            title={'Buy Vault MU:Point'}
            backgroundColor={BASE_BACKGROUND}
            left={true}
            onTouchBackButton={navigation.goBack}
          />

          <View
            style={[
              {
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center',
                paddingHorizontal: 12,
                marginTop: 12,
              },
            ]}>
            <Text style={s.summaryText}>Buy 1000 MU:Points using</Text>
            <Text style={s.summaryText}>0.6 ETH ($1,000)</Text>

            <View style={{width: '100%', marginTop: 96}}>
              {coinRow(
                'Vault Point',
                buy_vp_icon,
                1000,
                ratioStore.ratioSet.USDC,
              )}
            </View>

            <View style={{marginVertical: 40}}>
              <FastImage
                resizeMode="contain"
                style={{
                  width: 38,
                  height: 38,
                }}
                source={arrow_down_img}
              />
            </View>

            <View style={{width: '100%'}}>
              {coinRow('MU:Point', buy_vp_icon, 1000, ratioStore.ratioSet.USDC)}
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
              click={() => {
                navigation.pop(1);
                navigation.goBack();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default CompleteBuyVp;

const s = StyleSheet.create({
  wrapper: {
    zIndex: -1,
    paddingTop: 50 + getStatusBarHeight(),
    width: '100%',
    backgroundColor: BASE_BACKGROUND,
    height: '100%',
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
  summaryText: {
    color: MAIN_BLACK,
    fontSize: 16,
    fontWeight: '400',
  },
  coinRow: {
    paddingHorizontal: 29,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: CC_WHITE,
    paddingVertical: 18,
    borderRadius: 20,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 3,
  },
  dollarValue: {
    fontSize: 14,
    fontWeight: '400',
    color: DIMED_GRAY,
    marginBottom: 3,
  },
});
