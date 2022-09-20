import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {BASE_BACKGROUND, CC_WHITE, MAIN_BLACK} from '../../ColorCode';
import BasicBadge from '../../common/basicBadge';
import ButtonComponent from '../../common/ButtonComponent';
import SummaryCard from './summaryCard';

type Props = {
  from: string;
  to: string;
  symbol: string;
  estimateGasFee: number;
  serviceFee: number;
  totalAmount: number;
};
const CompleteWithdraw = (props: any) => {
  const navigation = useNavigation();

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
            paddingHorizontal: 38,
            marginTop: 24,
            marginBottom: 30,
          }}>
          12.00 ETH ($18,702.20) has been transferred to the address 0x09e3…44E7
        </Text>
        <SummaryCard
          amountComponent={
            <>
              {badge('Amount')}
              <Text style={s.componentText}>12 ETH</Text>
            </>
          }
          toComponent={
            <>
              {badge('To')}
              <Text style={s.componentText}>1aa21111212121221</Text>
            </>
          }
          fromComponent={
            <>
              {badge('From')}
              <Text style={s.componentText}>Safe1</Text>
            </>
          }
          totalComponent={
            <>
              {badge('Total')}
              <Text style={s.componentText}>$19,723.10</Text>
            </>
          }
        />
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
            navigation.goBack();
          }}
        />
      </View>
    </>
  );
};

export default CompleteWithdraw;

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
});
