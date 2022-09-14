import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Vault} from '../../../model/vaults';
import {MAIN_BORDER_COROR} from '../../ColorCode';
const search_icon = require('../../../../assets/image/search_icon.png');
type Props = {
  symbol: string;
  vault: Vault;
};
const TransactionHistoryContainer: React.FC<React.PropsWithChildren<Props>> = ({
  symbol,
  vault,
}) => {
  return (
    <View style={s.trasactionComponentWrapper}>
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
  trasactionComponentWrapper: {
    marginTop: 20,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
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
});
