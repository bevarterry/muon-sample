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
import VaultApi from '../../../../api/Vault';
import {useDispatch} from 'react-redux';
import {updateVaults} from '~/store/action/VaultAction';
import {CompleteWithdrawProps} from './completeWithdraw';
import {setGlobalLoadingState} from '~/store/modules/GlobalLoadingReducer';
import { checkBiometic } from '~/view/auth/biometic';
import Toast from 'react-native-simple-toast';

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
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();


  async function send() {
    if(!await checkBiometic()) {
      return Toast.show(`생체인증에 실패했습니다.`, Toast.SHORT);
    }

    dispatch(setGlobalLoadingState(true));
    requestVaultUpdate();
  }

  function requestVaultUpdate() {
    const param = {
      symbol: prop.coin.symbol,
      fromVaultIdx: prop.fromVault.idx,
      toVaultIdx: prop.toVault.idx,
      value: prop.amount,
    };

    VaultApi.patchVault(param)
      .then(response => {
        const props: CompleteWithdrawProps = {
          from: prop.fromVault.name,
          to: prop.toAddress ? prop.toAddress : prop.toVault.name,
          estimateGasFee: 0,
          serviceFee: 0,
          coin: prop.coin,
          amount: prop.amount,
        };

        setTimeout(() => {
          dispatch(updateVaults(response));
          dispatch(setGlobalLoadingState(false));
          navigation.replace('CompleteWithdraw', props);
        }, 2000);
      })
      .catch(e => {});
  }
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
          click={send}
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
