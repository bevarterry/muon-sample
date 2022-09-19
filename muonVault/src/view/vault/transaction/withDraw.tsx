import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {CoinDetailType} from '../../../model/coin';
import {Vault} from '../../../model/vaults';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
} from '../../ColorCode';
import BasicBadge from '../../common/basicBadge';
import ButtonComponent from '../../common/ButtonComponent';
import TextInputComponent from '../../common/TextInputComponent';
import Top from '../../common/top';
import {
  WITHDRAW_BEFORE_EXECUTE,
  WITHDRAW_INPUT_AMOUNT,
  WITHDRAW_INPUT_TO_ADDRESS,
} from '../../constantProperties';
import Step0 from './step0';
import Step1 from './step1';
import Step2 from './step2';

const WithDraw = (props: any) => {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(WITHDRAW_INPUT_TO_ADDRESS);
  const [showAmountInput, setShowAmountInput] = useState(false);

  const navigation = useNavigation();
  const [coin, setCoin] = useState<CoinDetailType>({
    value: 0,
    ratio: 0,
    symbol: '',
  });

  const [vault, setVault] = useState<Vault>({
    id: '',
    name: '',
    BTC: 0,
    BNB: 0,
    USDC: 0,
    ETH: 0,
    MU: 0,
    color: '#000000',
  });

  useEffect(() => {
    if (props.route.params.vault) {
      const {coin, vault} = props.route.params;

      setVault(vault);
      setCoin(coin);
    }
  }, []);

  const topCompoennt = (
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <FastImage
        resizeMode="contain"
        style={{
          width: 15,
          height: 15,
        }}
        source={coin.icon}
      />
      <Text style={{fontSize: 16, fontWeight: '700', marginLeft: 5}}>
        Withdraw {coin.symbol}
      </Text>
    </View>
  );

  return (
    <>
      <Top
        title={''}
        component={topCompoennt}
        backgroundColor={BASE_BACKGROUND}
        left={true}
        onTouchBackButton={navigation.goBack}
      />
      <View style={s.wrapper}>
        <View style={s.fromRow}>
          <BasicBadge
            title={'From'}
            paddingHorizontal={12}
            paddingVertical={4}
            backgroundColor={MAIN_BLACK}
            fontColor={'#ffffff'}
            fontSize={12}
          />
          <Text style={{fontSize: 22, fontWeight: '700'}}>{vault.name}</Text>
        </View>
        {step !== WITHDRAW_INPUT_TO_ADDRESS && (
          <View style={s.fromRow}>
            <BasicBadge
              title={'To'}
              paddingHorizontal={12}
              paddingVertical={4}
              backgroundColor={MAIN_BLACK}
              fontColor={'#ffffff'}
              fontSize={12}
            />
            <Text style={{fontSize: 22, fontWeight: '700'}}>{toAddress}</Text>
          </View>
        )}
        {step !== WITHDRAW_INPUT_TO_ADDRESS && step !== WITHDRAW_INPUT_AMOUNT && (
          <>
            <View style={s.fromRow}>
              <BasicBadge
                title={'Amount'}
                paddingHorizontal={12}
                paddingVertical={4}
                backgroundColor={MAIN_BLACK}
                fontColor={'#ffffff'}
                fontSize={12}
              />
              <Text style={{fontSize: 22, fontWeight: '700'}}>
                {amount} ETH
              </Text>
            </View>
            <View
              style={{
                marginTop: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 30,
              }}>
              <Text style={s.dollarAmount}>($19.702.20)</Text>
            </View>
            <View style={{height: 13}} />
          </>
        )}

        {step === WITHDRAW_INPUT_TO_ADDRESS && (
          <Step0
            updateStep={(next: string) => {
              setStep(next);
            }}
            updateToAddress={(toAddress: string) => {
              setToAddress(toAddress);
            }}
          />
        )}

        {step === WITHDRAW_INPUT_AMOUNT && (
          <Step1
            updateStep={(next: string) => {
              setStep(next);
            }}
            updateAmount={(amount: string) => {
              setAmount(amount);
            }}
          />
        )}

        {step === WITHDRAW_BEFORE_EXECUTE && <Step2 />}
      </View>
    </>
  );
};

export default WithDraw;

const s = StyleSheet.create({
  wrapper: {
    paddingTop: 50 + getStatusBarHeight(),
    width: '100%',
    backgroundColor: BASE_BACKGROUND,
    height: '100%',
  },
  fromRow: {
    width: '100%',
    paddingVertical: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  dollarAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: DIMED_GRAY,
  },
});
