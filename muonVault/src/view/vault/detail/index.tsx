import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useSelector} from 'react-redux';
import {Vault} from '../../../model/vaults';
import {RootState} from '../../../store/modules';
import {BASE_BACKGROUND, DIMED_GRAY} from '../../ColorCode';
import CoinTitleComponent from '../../common/coinTitleComponent';
import Top from '../../common/top';

const btc_icon = require('../../../../assets/image/btc_icon.png');
const eth_icon = require('../../../../assets/image/eth_icon.png');
const bnb_icon = require('../../../../assets/image/bnb_icon.png');
const usdc_icon = require('../../../../assets/image/usdc_icon.png');
const muon_icon = require('../../../../assets/image/muon_icon.png');

const VaultDetail = (props: any) => {
  const ratioStore = useSelector((root: RootState) => root.ratioStore);
  const navigation = useNavigation();
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
    if (props.route.params.element) {
      setVault(props.route.params.element);
    }
  }, []);

  const totalValueInDallor = () => {
    return (
      vault.BTC * ratioStore.ratioSet.BTC +
      vault.ETH * ratioStore.ratioSet.ETH +
      vault.BNB * ratioStore.ratioSet.BNB +
      vault.USDC * ratioStore.ratioSet.USDC +
      vault.MU * ratioStore.ratioSet.MU
    );
  };

  const coinRow = (symbol: string, icon: any, value: number, ratio: number) => {
    return (
      <TouchableOpacity
        style={s.coinRow}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate(
            'CoinDetail' as never,
            {
              value: value,
              symbol: symbol,
              ratio: ratio,
              icon: icon,
              vault: vault,
            } as never,
          );
        }}>
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
          <Text style={s.value}>{value}</Text>
          <Text style={s.dollarValue}>${value * ratio}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <Top
        title={vault.name}
        backgroundColor={BASE_BACKGROUND}
        left={true}
        onTouchBackButton={navigation.goBack}
      />

      <View style={s.wrapper}>
        <Text style={s.title}>Total Value</Text>
        <Text style={s.totalValueDollar}>${totalValueInDallor()}</Text>
        {coinRow('BTC', btc_icon, vault.BTC, ratioStore.ratioSet.BTC)}
        {coinRow('ETH', eth_icon, vault.ETH, ratioStore.ratioSet.ETH)}
        {coinRow('BNB', bnb_icon, vault.BNB, ratioStore.ratioSet.BNB)}
        {coinRow('USDC', usdc_icon, vault.USDC, ratioStore.ratioSet.USDC)}
        {coinRow('MU', muon_icon, vault.MU, ratioStore.ratioSet.MU)}
      </View>
    </>
  );
};

export default VaultDetail;

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
  totalValueDollar: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 28.8,
    marginBottom: 24,
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
    fontSize: 14,
    fontWeight: '400',
    color: DIMED_GRAY,
    marginBottom: 3,
  },
});
