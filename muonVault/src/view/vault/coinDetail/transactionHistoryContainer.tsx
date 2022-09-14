import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TxHistory} from '../../../model/transactionHistory';
import {Vault} from '../../../model/vaults';
import {MAIN_BORDER_COROR} from '../../ColorCode';
import {BUY_VP, DEPOSIT, WITHDRAW} from '../../constantProperties';
import TransactionHistoryCard from './transactionHistoryCard';
const search_icon = require('../../../../assets/image/search_icon.png');
type Props = {
  symbol: string;
  vault: Vault;
};
const TransactionHistoryContainer: React.FC<React.PropsWithChildren<Props>> = ({
  symbol,
  vault,
}) => {
  const [histories, setHistories] = useState<Array<TxHistory>>([
    {
      from: '0x830B04Cd1E570C09A55E0d82Ec22933D77C7c78e',
      to: '0xeC20Ffc18Daa902567E79919d1f73AFcB427B246',
      purpose: DEPOSIT,
      value: 120,
    },
    {
      from: '0xeC20Ffc18Daa902567E79919d1f73AFcB427B246',
      to: '0x830B04Cd1E570C09A55E0d82Ec22933D77C7c78e',
      purpose: WITHDRAW,
      value: 200,
    },
    {
      from: '0xeC20Ffc18Daa902567E79919d1f73AFcB427B246',
      to: '0x830B04Cd1E570C09A55E0d82Ec22933D77C7c78e',
      purpose: BUY_VP,
      value: 300,
    },
    {
      from: '0x830B04Cd1E570C09A55E0d82Ec22933D77C7c78e',
      to: '0xeC20Ffc18Daa902567E79919d1f73AFcB427B246',
      purpose: DEPOSIT,
      value: 120,
    },
    {
      from: '0xeC20Ffc18Daa902567E79919d1f73AFcB427B246',
      to: '0x830B04Cd1E570C09A55E0d82Ec22933D77C7c78e',
      purpose: WITHDRAW,
      value: 200,
    },
    {
      from: '0xeC20Ffc18Daa902567E79919d1f73AFcB427B246',
      to: '0x830B04Cd1E570C09A55E0d82Ec22933D77C7c78e',
      purpose: BUY_VP,
      value: 300,
    },
  ]);

  return (
    <View style={s.wrapper}>
      <View style={s.titleWrapper}>
        <Text style={s.title}>{symbol} transaction history</Text>
        <View style={[s.centerAlign, s.searchIcon]}>
          <FastImage
            resizeMode="contain"
            tintColor={'#000000'}
            style={{width: 13.9, height: 13.9}}
            source={search_icon}
          />
        </View>
      </View>
      {histories && histories.length > 0 && (
        <View style={s.historiesWrapper}>
          {histories.map((history: TxHistory, index: number) => {
            return (
              <TransactionHistoryCard
                history={history}
                key={index}
                symbol={symbol}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

export default TransactionHistoryContainer;

const s = StyleSheet.create({
  centerAlign: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    marginTop: 20,
    display: 'flex',
    width: '100%',
  },
  titleWrapper: {
    paddingHorizontal: 22,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 21.4,
  },
  searchIcon: {
    width: 48,
    height: 32,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: MAIN_BORDER_COROR,
  },
  historiesWrapper: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 13,
  },
});
