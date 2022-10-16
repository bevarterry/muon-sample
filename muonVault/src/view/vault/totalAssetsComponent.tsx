import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {ScAssetInfo} from '../../model/scAssets';
import {RootState} from '../../store/modules';
import {BASE_BACKGROUND, DIMED_GRAY} from '../ColorCode';

const TotalAssetsComponent = () => {
  const scAssetsStore = useSelector((root: RootState) => root.scAssetsStore);
  const vaultStore = useSelector((root: RootState) => root.vaultsStore);
  const ratioStore = useSelector((root: RootState) => root.ratioStore);

  const displayCoinRow = (
    asset: ScAssetInfo,
    totalValue: number,
    ratio: number,
  ) => {
    return (
      <>
        <View style={s.assetWrapper}>
          <Text style={s.displayCoinName}>{asset.displayName}</Text>
          <View style={s.assetValueWrapper}>
            <Text style={s.displayCoinName}>
              {Number(totalValue) === 0 ? '0.0' : Number(totalValue).toFixed(6)}
            </Text>
            <Text style={s.coinValue}>{asset.symbol}</Text>
            <Text style={s.dollarValue}>
              (${Number(totalValue * ratio).toFixed(2)})
            </Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <View style={s.wrapper}>
        {displayCoinRow(
          scAssetsStore.bitcoin,
          vaultStore.totalAssets.bitcoin,
          ratioStore.ratioSet.BTC,
        )}
        {displayCoinRow(
          scAssetsStore.ethereum,
          vaultStore.totalAssets.ethereum,
          ratioStore.ratioSet.ETH,
        )}
        {displayCoinRow(
          scAssetsStore.binance,
          vaultStore.totalAssets.binance,
          ratioStore.ratioSet.BNB,
        )}
        {displayCoinRow(
          scAssetsStore.usdc,
          vaultStore.totalAssets.usdc,
          ratioStore.ratioSet.USDC,
        )}
        {displayCoinRow(
          scAssetsStore.muon,
          vaultStore.totalAssets.muon,
          ratioStore.ratioSet.MU,
        )}
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
