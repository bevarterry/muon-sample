import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {CoinDetailType} from '../../../model/coin';
import {Vault} from '../../../model/vaults';
import {BASE_BACKGROUND, DIMED_GRAY} from '../../ColorCode';
import Top from '../../common/top';
import TransactionButtonContainer from './transactionButtonContainer';
import TransactionHistoryContainer from './transactionHistoryContainer';

const CoinDetail = (props: any) => {
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
      const {value, symbol, ratio, icon, vault} = props.route.params;

      setVault(vault);
      setCoin({
        value: value,
        ratio: ratio,
        icon: icon,
        symbol: symbol,
      });
    }
  }, []);

  return (
    <>
      <Top
        title={vault.name}
        backgroundColor={BASE_BACKGROUND}
        left={true}
        onTouchBackButton={navigation.goBack}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{height: '100%'}}
        contentContainerStyle={s.wrapper}
        bounces={false}>
        <FastImage
          resizeMode="contain"
          style={{
            marginTop: 30,
            width: 64,
            height: 64,
          }}
          source={coin.icon}
        />
        <Text style={s.coinValue}>
          {coin.value} {coin.symbol}
        </Text>
        <Text style={s.dollarValue}>Value ${coin.value * coin.ratio}</Text>

        <TransactionButtonContainer onPress={(type: string) => {}} />
        <TransactionHistoryContainer symbol={coin.symbol} vault={vault} />
      </ScrollView>
    </>
  );
};

export default CoinDetail;

const s = StyleSheet.create({
  wrapper: {
    paddingTop: 50 + getStatusBarHeight(),
    width: '100%',

    backgroundColor: BASE_BACKGROUND,
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 50,
  },
  coinValue: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 28.8,
  },
  dollarValue: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: '600',
    color: DIMED_GRAY,
  },
});
