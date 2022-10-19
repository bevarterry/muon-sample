import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { CoinDetailType } from '../../../../model/coin';
import { Vault } from '../../../../model/vaults';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
} from '../../../ColorCode';
import BasicBadge from '../../../common/basicBadge';
import ButtonComponent from '../../../common/ButtonComponent';
import TextInputComponent from '../../../common/TextInputComponent';
import { WITHDRAW_BEFORE_EXECUTE } from '../../../constantProperties';
const convert_value_icon = require('../../../../../assets/image/convert_value_icon.png');

type Props = {
  coin: CoinDetailType;
  toVault: Vault;
  fromVault: Vault;
  updateStep: Function;
  updateAmount: Function;
};
const InputAmount: React.FC<React.PropsWithChildren<Props>> = ({
  coin,
  toVault,
  fromVault,
  updateStep,
  updateAmount,
}) => {


  useEffect(() => {
    console.log(1111111, coin);
  }, [])


  const [amount, setAmount] = useState('0');

  const isActiveDoneButton = () => {
    return Number(amount) !== 0;
  };

  const isExcessBalance = () => {
    return Number(amount)! > Number(coin.value);
  };

  return (
    <>
      <TextInputComponent
        keypad={'number-pad'}
        leftComponent={
          <BasicBadge
            title={'Amount'}
            paddingHorizontal={12}
            paddingVertical={4}
            backgroundColor={MAIN_BLACK}
            fontColor={'#ffffff'}
            fontSize={12}
          />
        }
        rightComponent={
          <View style={{ marginLeft: 5 }}>
            <Text style={{ fontSize: 22, fontWeight: '700' }}>{coin.symbol}</Text>
          </View>
        }
        fontSize={22}
        fontWeight={'700'}
        backgroundColor={'#ffffff'}
        update={(e: string) => {
          updateAmount(e);
          setAmount(e);
        }}
        active={amount !== ''}
        blur={(e: string) => { }}
      />
      <View
        style={[
          s.rowCenter,
          {
            width: '100%',
            justifyContent: 'space-between',
            marginTop: 14,
            paddingLeft: 32,
            paddingRight: 23,
          },
        ]}>
        <Text>Value</Text>
        <View style={[s.rowCenter, { paddingHorizontal: 0 }]}>
          <TouchableOpacity style={s.convertButton} activeOpacity={0.7}>
            <FastImage
              resizeMode="contain"
              style={{
                width: 13.5,
                height: 13.5,
              }}
              source={convert_value_icon}
            />
          </TouchableOpacity>
          <Text>${(coin?.ratio * Number(amount)).toFixed(2)}</Text>
        </View>
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
            Balance{' '}
            <Text style={{ color: MAIN_BLACK }}>
              {Number(coin?.value).toFixed(6)} {coin.symbol}
            </Text>
            (${(coin?.value * coin?.ratio).toFixed(2)})
          </Text>
        <Text style={s.balanceText}>
          1 {coin?.symbol} = ${coin?.ratio}
        </Text>
        {isExcessBalance() && (
          <Text style={[s.balanceText, { color: 'red' }]}>Excess balance</Text>
        )}
      </View>
      <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 30 }}>
        <ButtonComponent
          title="Done"
          width="100%"
          borderColor={BASE_BUTTON}
          titleColor={DIMED_GRAY}
          borderRadius={20}
          activeColor={
            isActiveDoneButton() && !isExcessBalance() ? MAIN_BLACK : undefined
          }
          activeFontColor={
            isActiveDoneButton() && !isExcessBalance() ? CC_WHITE : undefined
          }
          bodyColor={BASE_BUTTON}
          click={() => {
            if (isActiveDoneButton() && !isExcessBalance()) {
              updateStep(WITHDRAW_BEFORE_EXECUTE);
            }
          }}
        />
      </View>
    </>
  );
};

export default InputAmount;

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
  rowCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  convertButton: {
    paddingHorizontal: 17,
    paddingVertical: 9,
    backgroundColor: CC_WHITE,
    borderRadius: 20,
  },
  convertValue: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
    backgroundColor: MAIN_BLACK,
  },
  balanceText: {
    color: DIMED_GRAY,
    fontSize: 14,
    fontWeight: '500',
  },
});
