import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useSelector} from 'react-redux';
import {CoinDetailType} from '../../../model/coin';
import {Vault} from '../../../model/vaults';
import {RootState} from '../../../store/modules';
import {BASE_BACKGROUND, DIMED_GRAY} from '../../ColorCode';
import CoinTitleComponent from '../../common/coinTitleComponent';
import Top from '../../common/top';

const CoinDetail = (props: any) => {
  const ratioStore = useSelector((root: RootState) => root.ratioStore);
  const navigation = useNavigation();
  const [coin, setCoin] = useState<CoinDetailType>({
    value: 0,
    ratio: 0,
    symbol: '',
    txHistories: [],
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
      <View style={s.wrapper}>
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
      </View>
    </>
  );
};

export default CoinDetail;

const s = StyleSheet.create({
  wrapper: {
    marginTop: 50 + getStatusBarHeight(),
    width: '100%',
    height: '100%',
    backgroundColor: BASE_BACKGROUND,
    paddingHorizontal: 13,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: '600',
    color: '#838383',
    lineHeight: 19.09,
  },
  coinValue: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 28.8,
  },
  coinRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginTop: 6,
    paddingVertical: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingHorizontal: 24,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 3,
  },
  dollarValue: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: '600',
    color: DIMED_GRAY,
  },
});
