import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TxHistory} from '../../../model/transactionHistory';
import {Vault} from '../../../model/vaults';
import {MAIN_BORDER_COROR} from '../../ColorCode';
import {BUY_VP, DEPOSIT, WITHDRAW} from '../../constantProperties';
import TransactionHistoryCard from './transactionHistoryCard';
import VaultApi from '../../../api/Vault';
import {RootState} from '~/store/modules';
import {useSelector} from 'react-redux';
const search_icon = require('../../../../assets/image/search_icon.png');
type Props = {
  symbol: string;
  vault: Vault;
};
const TransactionHistoryContainer: React.FC<React.PropsWithChildren<Props>> = ({
  symbol,
  vault,
}) => {
  const vaultStore = useSelector((root: RootState) => root.vaultsStore);
  const [histories, setHistories] = useState<Array<TxHistory>>([]);

  useEffect(() => {
    VaultApi.history(vault.idx, symbol)
      .then(res => {
        console.log(res);
        historiesMap(res);
      })
      .catch(e => {
        console.log(111, e);
      });
  }, [symbol]);

  function getStoreVaultNameByIdx(idx: string) {
    const index = vaultStore.vaults.findIndex(x => {
      return x.idx == idx;
    });

    if (index !== -1) return vaultStore.vaults[index].name;

    return '';
  }

  function historiesMap(hists: Array<any>) {
    const historyList: Array<TxHistory> = [];

    hists.forEach(e => {
      const action = dispplayActionName(e.to, e.from);

      if (action !== '' || e.purpose) {
        historyList.push({
          from: displayFromName(e.from),
          to: displayToName(e.to),
          purpose: action,
          value: e.value,
        });
      }
    });

    setHistories(historyList);
  }

  const displayToName = (to: string) => {
    if (vault.idx == to) return vault.name;
    const toVaultName = getStoreVaultNameByIdx(to);
    if (toVaultName !== '') return toVaultName;
    return to;
  };

  const displayFromName = (from: string) => {
    if (vault.idx == from) return vault.name;

    const fromVaultName = getStoreVaultNameByIdx(from);
    if (fromVaultName !== '') return fromVaultName;

    return from;
  };

  const dispplayActionName = (to: string, from: string) => {
    if (vault.idx == from) return WITHDRAW;
    if (vault.idx == to) return DEPOSIT;
    if (to === 'asdasdasdasdas') return BUY_VP;

    return '';
  };

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
    height: '100%',
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
