import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {ScAssetInfo} from '../../model/scAssets';
import {RootState} from '../../store/modules';
import {BASE_BACKGROUND, DIMED_GRAY} from '../ColorCode';

const TotalAssetsComponent = () => {
  const scAssetsStore = useSelector((root: RootState) => root.scAssetsStore);

  const displayCoinRow = (asset: ScAssetInfo) => {
    return (
      <>
        <View style={s.assetWrapper}>
          <Text style={s.displayCoinName}>{asset.displayName}</Text>
          <View style={s.assetValueWrapper}>
            <Text style={s.displayCoinName}>{asset.totalValue}</Text>
            <Text style={s.coinValue}>{asset.symbol}</Text>
            <Text style={s.dollarValue}>($65,232,111)</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <View style={s.wrapper}>
        {displayCoinRow(scAssetsStore.bitcoin)}
        {displayCoinRow(scAssetsStore.ethereum)}
        {displayCoinRow(scAssetsStore.binance)}
        {displayCoinRow(scAssetsStore.usdc)}
        {displayCoinRow(scAssetsStore.muon)}
      </View>
    </>
  );
};

export default TotalAssetsComponent;

const s = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: 34,
    paddingVertical: 0,
    marginBottom: 20,
  },
  assetWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 24,
  },
  assetValueWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayCoinName: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 24,
    marginRight: 2,
  },
  coinValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 24,
    marginRight: 5,
  },
  dollarValue: {
    fontSize: 12,
    fontWeight: '400',
    color: DIMED_GRAY,
    lineHeight: 24,
  },
});
