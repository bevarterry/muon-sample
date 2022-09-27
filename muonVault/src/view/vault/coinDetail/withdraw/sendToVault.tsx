import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
  MAIN_BORDER_COROR,
} from '../../../ColorCode';
import ButtonComponent from '../../../common/ButtonComponent';
import {CoinDetailType} from '~/model/coin';
import {Vault} from '~/model/vaults';

const {width, height} = Dimensions.get('window');
const buttonWidth = (width - 34) / 2;
type Props = {
  prop: {
    coin: CoinDetailType;
    amount: number;
    fromVault: Vault;
    toVault: Vault;
    toAddress: string;
  };
};
const SendToVault: React.FC<React.PropsWithChildren<Props>> = ({prop}) => {
  const navigation = useNavigation();

  function requestVaultUpdate() {}
  return (
    <>
      <View
        style={{
          marginTop: 30,
          position: 'absolute',
          bottom: 43,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          paddingHorizontal: 12,
        }}>
        <ButtonComponent
          title="Send"
          width={buttonWidth}
          borderColor={BASE_BUTTON}
          titleColor={CC_WHITE}
          paddingVertical={21}
          borderRadius={16}
          bodyColor={MAIN_BLACK}
          click={() => {
            //@ts-ignore
            navigation.replace('CompleteWithdraw', {
              from: '',
              to: '',
              symbol: '',
              estimateGasFee: 0,
              serviceFee: 0,
              totalAmount: 0,
            });
          }}
        />
        <View style={{width: 10}} />
        <ButtonComponent
          title="Cancel"
          width={buttonWidth}
          borderColor={BASE_BUTTON}
          titleColor={MAIN_BLACK}
          paddingVertical={21}
          borderRadius={16}
          bodyColor={BASE_BUTTON}
          click={() => {
            //@ts-ignore
            navigation.goBack();
          }}
        />
      </View>
    </>
  );
};

export default SendToVault;

const s = StyleSheet.create({
  withdrawSummary: {
    marginHorizontal: 8,
    paddingVertical: 40,
    backgroundColor: CC_WHITE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: MAIN_BORDER_COROR,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
  },
});
