import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TxHistory} from '../../../model/transactionHistory';
import {Vault} from '../../../model/vaults';
import {MAIN_BORDER_COROR} from '../../ColorCode';
import {BNB_BUY_MU_ADDRESS, BUY_VP, DEPOSIT, ETH_BUY_MU_ADDRESS, WITHDRAW} from '../../constantProperties';
import TransactionHistoryCard from './transactionHistoryCard';
import VaultApi from '../../../api/Vault';
import {RootState} from '~/store/modules';
import {useSelector} from 'react-redux';
import { parseToWei } from '~/bc/VaultEtherApi';
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
  const walletStore = useSelector((root: RootState) => root.walletStore);

  
  const navigation = useNavigation();
  const [histories, setHistories] = useState<Array<TxHistory>>([]);

  useEffect(() => {
    if(!vault.idx || !symbol) return;
    
    VaultApi.history(vault.idx, symbol)
      .then(res => {
        
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

    if (index === -1) {
      
    }
    // index = vaultStore.vaults.findIndex(x => {
    //   return x.idx == idx;
    // });

    if (index !== -1) return vaultStore.vaults[index].name;

    return '';
  }

  function historiesMap(hists: Array<any>) {
    const historyList: Array<TxHistory> = [];

    hists
    .filter(e => {
      return (e.purpose === WITHDRAW || e.purpose === DEPOSIT || e.purpose === 'Transfer')
    })
    .forEach(e => {
      
      historyList.push({
        from: displayFromName(e.from),
        to: displayToName(e.to),
        purpose: e.purpose === 'Transfer' ? 'Transfer' : displayActionName(e.to, e.purpose),
        value: e.purpose === 'Transfer' ? parseToWei(e.value) : e.value,
      });
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

  const displayActionName = (to: string, purose: string) => {

    if(to === ETH_BUY_MU_ADDRESS) return BUY_VP;
    if(to === BNB_BUY_MU_ADDRESS) return BUY_VP;
    
    return purose;
  };

  return (
    <View style={s.wrapper}>
      <View style={s.titleWrapper}>
        <Text style={s.title}>{symbol} transaction history</Text>
        <TouchableOpacity activeOpacity={0.8} style={[s.centerAlign, s.searchIcon]}
          onPress={()=> {
            navigation.navigate('TransactionHistory' as never, {histories: histories, symbol: symbol} as never);
          }}>
          <FastImage
            resizeMode="contain"
            tintColor={'#000000'}
            style={{width: 13.9, height: 13.9}}
            source={search_icon}
          />
        </TouchableOpacity>
      </View>
      {histories && histories.length > 0 && (
        <View style={s.historiesWrapper}>
          {histories.map((history: TxHistory, index: number) => {
            if(!history.value) return;

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
