import React, {useRef} from 'react';
import {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/modules';
import {BASE_BACKGROUND} from '../ColorCode';
import TopComponent from '@view/common/topComponent';
import TotalAssetsComponent from './totalAssetsComponent';
import ValutCardListComponent from './valutCardListComponent';

const Vault = () => {
  const scAssetsStore = useSelector((root: RootState) => root.scAssetsStore);
  const vaultsStore = useSelector((root: RootState) => root.vaultsStore);
  const ratioStore = useSelector((root: RootState) => root.ratioStore);

  const totalValueInDallor = () => {
    if (!vaultsStore.totalAssets) return Number(0).toFixed(2);

    return Number(
      vaultsStore.totalAssets.bitcoin * ratioStore.ratioSet.BTC +
        vaultsStore.totalAssets.ethereum * ratioStore.ratioSet.ETH +
        vaultsStore.totalAssets.binance * ratioStore.ratioSet.BNB +
        vaultsStore.totalAssets.usdc * ratioStore.ratioSet.USDC +
        vaultsStore.totalAssets.muon * ratioStore.ratioSet.MU,
    ).toFixed(2);
  };

  return (
    <>
      <ScrollView style={s.wrapper}>
        <TopComponent />
        <AssetSummaryComponent totalDollar={totalValueInDallor()} />
        <View
          style={{
            width: '100%',
            opacity: 0.1,
            borderBottomWidth: 1,
            marginTop: 15,
            marginBottom: 10,
            marginHorizontal: 33,
          }}
        />
        <TotalAssetsComponent />
        <ValutCardListComponent />
      </ScrollView>
    </>
  );
};

type PropAssetSummary = {
  totalDollar: string;
};
const AssetSummaryComponent: React.FC<
  React.PropsWithChildren<PropAssetSummary>
> = ({totalDollar}) => {
  return (
    <View style={s.summaryComponentWrapper}>
      <FastImage
        resizeMode="stretch"
        style={{width: 62, height: 62, borderRadius: 50}}
        source={{
          uri: 'https://lh3.googleusercontent.com/-vgHaHJKRzXxXWd6OuY0vCwesaHfOHYeBbuvs6gZe9NoCK3I-NqTWngMAKDEyO7suAY8RQQLNbV5TlqYZULFpaQ6WQ7rkVuqaXkH=s168',
        }}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: '#838383',
          marginTop: 10,
          lineHeight: 19.09,
        }}>
        My Crypto Assets
      </Text>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '700',
          color: '#000000',
          marginTop: 5,
          lineHeight: 28.8,
        }}>
        ${totalDollar}
      </Text>
    </View>
  );
};

export default Vault;

const s = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: BASE_BACKGROUND,
  },
  summaryComponentWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 33,
    display: 'flex',
    marginTop: 37,
  },
  centerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28.8,
  },
  centerImage: {
    width: 240,
    height: 240,
    marginTop: 54,
    marginBottom: 100,
  },
  bottomButtonWrapper: {
    width: '100%',
    paddingHorizontal: 37,
    zIndex: 2,
    position: 'absolute',
    bottom: 80,
  },
});
