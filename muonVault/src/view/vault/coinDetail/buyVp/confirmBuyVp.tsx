import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../store/modules';
import FastImage from 'react-native-fast-image';
import {CoinDetailType} from '~/model/coin';
import {requestBnbWithdrawConfirm} from '~/bc/VaultBinanceApi';
import {requestEtherWithdrawConfirm} from '~/bc/VaultEtherApi';
import {
  BNB_BUY_MU_ADDRESS,
  BNB_SYMBOL,
  ETH_BUY_MU_ADDRESS,
  ETH_SYMBOL,
} from '~/view/constantProperties';
import {setGlobalLoadingState} from '~/store/modules/GlobalLoadingReducer';
import Toast from 'react-native-simple-toast';
import VaultApi from '../../../../api/Vault';
import {CompleteBuyVpProps} from './completeBuyVp';
import {Vault} from '~/model/vaults';
import GlobalLoading from '~/view/common/GlobalLoading';
import {checkBiometic} from '~/view/auth/biometic';

const buy_vp_icon = require('../../../../../assets/image/buy_vp_icon.png');
const arrow_down_img = require('../../../../../assets/image/arrow_down_img.png');

export type ConfirmBuyVpProps = {
  coin: CoinDetailType;
  fromVault: Vault;
  muAmount: number;
};
const muDollarRatio = 1;

const ConfirmBuyVp = (props: any) => {
  const globalLoadingStateStore = useSelector(
    (root: RootState) => root.globalLoadingState,
  );
  const ratioStore = useSelector((root: RootState) => root.ratioStore);
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const [muAmount, setMuPointAmount] = useState(0);
  const [toValue, setToValue] = useState(0);

  const [fromVault, setFromVault] = useState<Vault>({
    id: '',
    idx: '',
    name: '',
    BTC: 0,
    BNB: 0,
    USDC: 0,
    ETH: 0,
    VP: 0,
    color: '#000000',
  });

  const [coin, setCoin] = useState<CoinDetailType>({
    value: 0,
    ratio: 0,
    symbol: '',
    privateKey: '',
    contractAddress: '',
  });

  useEffect(() => {
    if (props.route.params.coin) {
      const {coin, muAmount, fromVault} = props.route.params;

      setFromVault(fromVault);
      setCoin(coin);
      setToValue((muAmount * muDollarRatio) / coin.ratio);
      setMuPointAmount(muAmount);
    }
  }, []);

  async function requestConfirmForBuy() {
    if(!await checkBiometic()) {
      return Toast.show(`생체인증에 실패했습니다.`, Toast.SHORT);
    }

    dispatch(setGlobalLoadingState(true));
    try {
      const hash = await requestWithdrawConfirm();

      sendTxid(hash);
    } catch (error) {
      dispatch(setGlobalLoadingState(false));
    }
  }

  function sendTxid(txid: string) {
    VaultApi.sendTxid({
      txid: txid,
      symbol: coin.symbol,
    })
      .then(res => {
        dispatch(setGlobalLoadingState(false));
        Toast.show(`전송 요청을 완료. 컨펌이후 잔고 변경.`, Toast.SHORT);

        const param: CompleteBuyVpProps = {
          coin: coin,
          fromVault: fromVault,
          amount: toValue,
        };

        console.log(JSON.stringify(param));

        navigation.replace('CompleteBuyVp' as never, param as never);
      })
      .catch(e => {
        console.log('error txid send', JSON.stringify(e));
        dispatch(setGlobalLoadingState(false));
      });
  }

  async function requestWithdrawConfirm() {
    let res;

    console.log(coin.symbol);
    if (coin.symbol === ETH_SYMBOL) {
      res = await requestEtherWithdrawConfirm(
        ETH_BUY_MU_ADDRESS,
        String(toValue.toFixed(8)),
        coin.privateKey,
        coin.contractAddress,
      );
    } else if (coin.symbol === BNB_SYMBOL) {
      console.log(coin.symbol);
      res = await requestBnbWithdrawConfirm(
        BNB_BUY_MU_ADDRESS,
        String(toValue.toFixed(8)),
        coin.privateKey,
        coin.contractAddress,
      );
    }

    return res;
  }

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
          <Text style={s.value}>{value.toFixed(6)}</Text>
          <Text style={s.dollarValue}>$({value * ratio})</Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
            <Text style={s.summaryText}>Buy {muAmount} MU:Points using</Text>
            <Text style={s.summaryText}>
              {toValue.toFixed(6)} {coin.symbol} ($ {toValue * coin.ratio})
            </Text>

            <View style={{width: '100%', marginTop: 96}}>
              {coinRow(coin.symbol, coin.icon, toValue, coin.ratio)}
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
              {coinRow('MU:Point', buy_vp_icon, muAmount, muDollarRatio)}
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
                requestConfirmForBuy();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <GlobalLoading action={globalLoadingStateStore.state} />
    </>
  );
};

export default ConfirmBuyVp;

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
