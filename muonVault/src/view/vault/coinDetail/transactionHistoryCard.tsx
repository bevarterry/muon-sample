import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TxHistory} from '../../../model/transactionHistory';
import {Vault} from '../../../model/vaults';
import {MAIN_BORDER_COROR} from '../../ColorCode';
import BasicBadge from '../../common/basicBadge';
import {BUY_VP, WITHDRAW} from '../../constantProperties';

const withdraw_icon = require('../../../../assets/image/withdraw_icon.png');
const deposit_icon = require('../../../../assets/image/deposit_icon.png');
const buy_vp_icon = require('../../../../assets/image/buy_vp_icon.png');
type Props = {
  history: TxHistory;
  symbol: string;
};
const TransactionHistoryCard: React.FC<React.PropsWithChildren<Props>> = ({
  history,
  symbol,
}) => {
  const iconByPurpose = (purpose: string) => {
    let icon: any = deposit_icon;
    if (purpose === WITHDRAW) icon = withdraw_icon;
    if (purpose === BUY_VP) icon = buy_vp_icon;

    return (
      <FastImage
        resizeMode="contain"
        style={{width: 12, height: 12}}
        source={icon}
      />
    );
  };

  const displayPurposeText = (purpose: string) => {
    if (purpose === WITHDRAW) return 'Withdraw';
    if (purpose === BUY_VP) return 'Buy MU:P';

    return 'Deposit';
  };

  return (
    <View style={s.historyBox}>
      <View style={[{alignItems: 'flex-start'}, s.columWrapper]}>
        <View style={s.purpose}>
          {iconByPurpose(history.purpose)}
          <Text style={s.purposeText}>
            {displayPurposeText(history.purpose)}
          </Text>
        </View>
        <View style={s.purpose}>
          <BasicBadge title="from" backgroundColor={'#EFEFEF'} />
          <Text ellipsizeMode="middle" numberOfLines={1} style={s.from}>
            {history.from}
          </Text>
        </View>
      </View>
      <View style={[{alignItems: 'flex-end'}, s.columWrapper]}>
        <Text style={s.value}>
          {history.value} {symbol}
        </Text>
        <View style={s.purpose}>
          <BasicBadge title="to" backgroundColor={'#EFEFEF'} />
          <Text ellipsizeMode="middle" numberOfLines={1} style={s.to}>
            {history.to}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionHistoryCard;

const s = StyleSheet.create({
  historyBox: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: MAIN_BORDER_COROR,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
    paddingHorizontal: 25,
    marginBottom: 6,
  },
  columWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  purpose: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  purposeText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 32,
    marginLeft: 9.55,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 32,
  },
  to: {
    marginLeft: 5,
    width: 96,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 28,
  },
  from: {
    marginLeft: 5,
    width: 96,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 28,
  },
});
