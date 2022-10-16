import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {CoinDetailType} from '../../../../model/coin';
import {Vault} from '../../../../model/vaults';
import {BASE_BACKGROUND, DIMED_GRAY, MAIN_BLACK} from '../../../ColorCode';
import BasicBadge from '../../../common/basicBadge';
import Top from '../../../common/top';
import {
  WITHDRAW_BEFORE_EXECUTE,
  WITHDRAW_INPUT_AMOUNT,
  WITHDRAW_INPUT_TO_ADDRESS,
} from '../../../constantProperties';
import InputToStep from './inputToStep';
import Step1 from './inputAmount';
import SendToAddress from './sendToAddress';
import SendToVault from './sendToVault';
import GlobalLoading from '~/view/common/GlobalLoading';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/modules';

const WithDraw = (props: any) => {
  const globalLoadingStateStore = useSelector(
    (root: RootState) => root.globalLoadingState,
  );

  const navigation = useNavigation();

  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(WITHDRAW_INPUT_TO_ADDRESS);

  
  const [withdrawItems, setWithrawItems ] = useState({
    to: '',
    amount : ''
  })


  const [coin, setCoin] = useState<CoinDetailType>({
    value: 0,
    ratio: 0,
    symbol: '',
    privateKey: '',
    contractAddress: '',
  });

  const [toVault, setToVault] = useState<Vault>({
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

  useEffect(() => {
    if (props.route.params.vault) {
      const {coin, vault} = props.route.params;

      setFromVault(vault);
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
      <ScrollView contentContainerStyle={s.wrapper} style={{height: '100%', backgroundColor: BASE_BACKGROUND}}>
        <Top
          title={''}
          component={topCompoennt}
          backgroundColor={BASE_BACKGROUND}
          left={true}
          onTouchBackButton={navigation.goBack}
        />

        {/* 보낼사람 */}
        <View style={s.fromRow}>
          <BasicBadge
            title={'From'}
            paddingHorizontal={12}
            paddingVertical={0}
            backgroundColor={MAIN_BLACK}
            fontColor={'#ffffff'}
            fontSize={12}
          />
          <Text style={{fontSize: 22, fontWeight: '700'}}>
            {fromVault.name}
          </Text>
        </View>
        
        
        {/* 보낼사람 입력완료시 */}
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
            {toAddress && 
              <Text ellipsizeMode='middle' numberOfLines={1} style={{width: 150, fontSize: 16, fontWeight: '500'}}>
                {toAddress}
              </Text>
            }

            {!toAddress && toVault?.name &&
              <Text style={{fontSize: 22, fontWeight: '700'}}>
                {toVault?.name}
              </Text>
            }
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
                {amount} {coin.symbol}
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
              <Text style={s.dollarAmount}>
                (${(Number(amount) * coin.ratio).toFixed(2)})
              </Text>
            </View>
            <View style={{height: 13}} />
          </>
        )}

        {step === WITHDRAW_INPUT_TO_ADDRESS && (
          <InputToStep
            vault={fromVault}
            updateStep={(next: string) => {
              setStep(next);
            }}
            updateToAddress={(toAddress: string) => {
              setToAddress(toAddress);
            }}
            selectVault={(selectedVault: Vault) => {
              setToVault(selectedVault);
            }}
          />
        )}

        {step === WITHDRAW_INPUT_AMOUNT && (
          <Step1
            coin={coin}
            toVault={toVault}
            fromVault={fromVault}
            updateStep={(next: string) => {
              setStep(next);
            }}
            updateAmount={(amount: string) => {
              setAmount(amount);
            }}
          />
        )}

        {step === WITHDRAW_BEFORE_EXECUTE && toAddress !== '' && (
          <SendToAddress
            props={{
              coin: coin,
              amount: amount,
              fromVault: fromVault,
              toAddress: toAddress,
            }}
          />
        )}
        {step === WITHDRAW_BEFORE_EXECUTE && toAddress === '' && (
          <SendToVault
            prop={{
              coin: coin,
              amount: Number(amount),
              fromVault: fromVault,
              toVault: toVault,
              toAddress: toAddress,
            }}
          />
        )}
      </ScrollView>
      <GlobalLoading action={globalLoadingStateStore.state} />
    </>
  );
};

export default WithDraw;

const s = StyleSheet.create({
  wrapper: {
    zIndex: -1,
    paddingTop: 50 + getStatusBarHeight(),
    width: '100%',
    backgroundColor: BASE_BACKGROUND,
    paddingBottom: 150
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
