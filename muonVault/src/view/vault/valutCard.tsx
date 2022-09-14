import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Vault} from '../../model/vaults';
import {RootState} from '../../store/modules';
import {BASE_BACKGROUND, DIMED_GRAY} from '../ColorCode';

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

  return (
    <TouchableOpacity style={s.valutCard}>
      <View style={s.cardTitle}>
        <Text style={s.cardTitleText}>{vault.name}</Text>
      </View>
      <View style={s.cardRow}>
        {coinRigntView('BTC', btc_icon)}
        <Text>{vault.BTC}</Text>
      </View>

      {devider()}

      <View style={s.cardRow}>
        {coinRigntView('ETH', eth_icon)}
        <Text>{vault.ETH}</Text>
      </View>

      {devider()}

      <View style={s.cardRow}>
        {coinRigntView('BNB', bnb_icon)}
        <Text>{vault.BNB}</Text>
      </View>

      {devider()}

      <View style={s.cardRow}>
        {coinRigntView('USDC', usdc_icon)}
        <Text>{vault.USDC}</Text>
      </View>

      {devider()}

      <View style={s.cardRow}>
        {coinRigntView('MU', muon_icon)}
        <Text>{vault.MU}</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 17,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '800',
  },
  cardRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  coinIcon: {
    width: 20,
    height: 20,
  },
});
