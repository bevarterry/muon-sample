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
import {CoinDetailType} from '~/model/coin';
import {Vault} from '~/model/vaults';
import { ConfirmBuyVpProps } from './confirmBuyVp';

const muDollarRatio = 1;

const BuyVp = (props: any) => {
  const navigation = useNavigation();
  const [inputMuAmount, setInputMuAmount] = useState(0);
  const [posibleBuyAmount, setPosibleBuyAmount] = useState(0);

  const [coin, setCoin] = useState<CoinDetailType>({
    value: 0,
    ratio: 0,
    symbol: '',
    privateKey: '',
    contractAddress: ''
  });
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

  const isActiveDoneButton = () => {
    
    return inputMuAmount !== 0 && posibleBuyAmount !== 0 && !isExcessBalance();
  };

  useEffect(() => {
    if (props.route.params.fromVault) {

      const {coin, fromVault} = props.route.params;


      setFromVault(fromVault);
      setCoin(coin);

      setPosibleBuyAmount((coin.ratio * coin.value) / muDollarRatio);
    }
  }, []);

  const isExcessBalance = () => {
    return posibleBuyAmount < inputMuAmount;
  };

  function moveToComfirmPage() {
    if(!isActiveDoneButton()) return;
    
    const param : ConfirmBuyVpProps = {coin: coin, muAmount: inputMuAmount, fromVault: fromVault}

    navigation.navigate(
      'ConfirmBuyVp' as never,
      param as never,
    );
  }

  
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
          <View style={{marginTop: 34, marginHorizontal: 12}}>
            <InsertVpCard
              coin={coin}
              updateInput={(e: number) => {
                setInputMuAmount(e);
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
              Balance{' '}
              <Text style={{color: MAIN_BLACK}}>
                {coin.value} {coin.symbol}{' '}
              </Text>
              (${Number(coin.value * coin.ratio).toFixed(2)})
            </Text>
            <Text style={s.balanceText}>1 MU:P = ${muDollarRatio}</Text>
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
                moveToComfirmPage();
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
