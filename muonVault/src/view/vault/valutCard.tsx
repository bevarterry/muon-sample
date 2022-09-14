import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Vault} from '../../model/vaults';
import {RootState} from '../../store/modules';
import {DIMED_GRAY} from '../ColorCode';

const btc_icon = require('../../../assets/image/btc_icon.png');
const eth_icon = require('../../../assets/image/eth_icon.png');
const bnb_icon = require('../../../assets/image/bnb_icon.png');
const usdc_icon = require('../../../assets/image/usdc_icon.png');
const muon_icon = require('../../../assets/image/muon_icon.png');

const {width, height} = Dimensions.get('window');
const paddingHorizontalLength = 17;

type Prop = {
  vault: Vault;
};
const ValutCard: React.FC<React.PropsWithChildren<Prop>> = ({vault}) => {
  const ratioStore = useSelector((root: RootState) => root.ratioStore);

  useEffect(() => {}, [vault]);

  const coinRigntView = (symbol: string, imageSource: any) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 20,
            height: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <FastImage
            resizeMode="contain"
            style={s.coinIcon}
            source={imageSource}
          />
        </View>
        <Text style={{fontSize: 14, fontWeight: '700'}}>{symbol}</Text>
      </View>
    );
  };

  const devider = () => {
    return (
      <View
        style={{
          width: width - (paddingHorizontalLength * 2 + 26),
          borderBottomWidth: 1,
          borderColor: '#ECECEC',
        }}
      />
    );
  };

  const displayValue = (value: number, ratio: number) => {
    return (
      <>
        <View style={s.assetValueWrapper}>
          <Text style={s.displayCoinName}>{value}</Text>
          <Text style={s.dollarValue}>(${value * ratio})</Text>
        </View>
      </>
    );
  };

  const totalValueInDallor = () => {
    return (
      vault.BTC * ratioStore.ratioSet.BTC +
      vault.ETH * ratioStore.ratioSet.ETH +
      vault.BNB * ratioStore.ratioSet.BNB +
      vault.USDC * ratioStore.ratioSet.USDC +
      vault.MU * ratioStore.ratioSet.MU
    );
  };

  return (
    <TouchableOpacity style={s.valutCard} activeOpacity={0.7}>
      <View style={[s.cardTitle, {backgroundColor: vault.color}]}>
        <Text style={s.cardTitleText}>{vault.name}</Text>
        <Text style={{fontSize: 16, fontWeight: '700', color: '#ffffff'}}>
          ${totalValueInDallor()}
        </Text>
      </View>
      <View style={s.cardRow}>
        {coinRigntView('BTC', btc_icon)}
        {displayValue(vault.BTC, ratioStore.ratioSet.BTC)}
      </View>

      {devider()}

      <View style={s.cardRow}>
        {coinRigntView('ETH', eth_icon)}
        {displayValue(vault.ETH, ratioStore.ratioSet.ETH)}
      </View>

      {devider()}

      <View style={s.cardRow}>
        {coinRigntView('BNB', bnb_icon)}
        {displayValue(vault.BNB, ratioStore.ratioSet.BNB)}
      </View>

      {devider()}

      <View style={s.cardRow}>
        {coinRigntView('USDC', usdc_icon)}
        {displayValue(vault.USDC, ratioStore.ratioSet.USDC)}
      </View>

      {devider()}

      <View style={s.cardRow}>
        {coinRigntView('MU', muon_icon)}
        {displayValue(vault.MU, ratioStore.ratioSet.MU)}
      </View>
    </TouchableOpacity>
  );
};

export default ValutCard;

const s = StyleSheet.create({
  valutCard: {
    width: width - paddingHorizontalLength * 2,
    marginRight: 8,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#E6E6E6',
    alignItems: 'center',
    paddingBottom: 3,
  },
  cardTitle: {
    width: '100%',
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 16,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardTitleText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  cardRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  coinIcon: {
    width: 20,
    height: 20,
  },
  displayCoinName: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 28,
    marginRight: 2,
  },
  coinValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 28,
    marginRight: 5,
  },
  dollarValue: {
    fontSize: 14,
    fontWeight: '400',
    color: DIMED_GRAY,
    lineHeight: 28,
  },
  assetValueWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
