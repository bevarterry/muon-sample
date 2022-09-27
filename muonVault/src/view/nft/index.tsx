import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Top from '../common/top';
import TopComponent from '@view/common/topComponent';
import {BASE_BACKGROUND} from '../ColorCode';
import NotReadyComponent from '@view/common/notReadyComponent';
const {width, height} = Dimensions.get('window');

const nft_page = require('../../../assets/image/nft_page.png');

const Nft = () => {
  return (
    <>
      <TopComponent />
      <View style={s.wrapper}>
        <NotReadyComponent
          icon={nft_page}
          title={'Under Construction'}
          subText={
            'Tired of log-in, authentication, swaps, and fees to buy NFTs?' +
            '\n' +
            'One-click Service is coming to MU:Vault, because buying and selling NFT should not be that difficult.'
          }
        />
      </View>
    </>
  );
};

export default Nft;

const s = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: height,
    backgroundColor: BASE_BACKGROUND,
    paddingTop: 24,
  },
});
