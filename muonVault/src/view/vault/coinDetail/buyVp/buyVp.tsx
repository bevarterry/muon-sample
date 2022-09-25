import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
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

type Props = {
  from: string;
  to: string;
  symbol: string;
  estimateGasFee: number;
  serviceFee: number;
  totalAmount: number;
};
const BuyVp = (props: any) => {
  const navigation = useNavigation();
  const [vpValue, setVp] = useState(0);

  const isActiveDoneButton = () => {
    return vpValue !== 0;
  };

  return (
    <>
      <KeyboardAvoidingView behavior="padding">
        <View style={s.wrapper}>
          <Top
            title={'Buy Vault Point'}
            backgroundColor={BASE_BACKGROUND}
            left={true}
            onTouchBackButton={navigation.goBack}
          />
          <View style={{marginTop: 34, marginHorizontal: 12}}>
            <InsertVpCard
              updateInput={(e: number) => {
                setVp(e);
              }}
            />
          </View>
          <View
            style={[
              {
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center',
                marginTop: 24,
              },
            ]}>
            <Text style={s.balanceText}>
              Balance <Text style={{color: MAIN_BLACK}}>23.5ETH</Text>
              ($38,528.12)
            </Text>
            <Text style={s.balanceText}>1 ETH = $1,642.04</Text>
          </View>

          <View
            style={{
              width: '100%',
              paddingHorizontal: 22,
              position: 'absolute',
              bottom: 43,
            }}>
            <ButtonComponent
              title="Next"
              width="100%"
              borderColor={BASE_BUTTON}
              titleColor={DIMED_GRAY}
              borderRadius={20}
              activeColor={isActiveDoneButton() ? MAIN_BLACK : BASE_BUTTON}
              activeFontColor={isActiveDoneButton() ? CC_WHITE : DIMED_GRAY}
              bodyColor={BASE_BUTTON}
              click={() => {
                navigation.navigate('CompleteBuyVP' as never);
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default BuyVp;

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
  balanceText: {
    color: DIMED_GRAY,
    fontSize: 14,
    fontWeight: '500',
  },
});
