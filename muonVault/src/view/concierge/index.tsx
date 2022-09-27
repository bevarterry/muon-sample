import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import TopComponent from '@view/common/topComponent';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
} from '../ColorCode';
import ButtonComponent from '@view/common/ButtonComponent';

const {width, height} = Dimensions.get('window');

const nft_page = require('../../../assets/image/nft_page.png');

const Concierge = () => {
  return (
    <>
      <TopComponent totalVp={12} />
      <View style={s.wrapper}>
        <ButtonComponent
          title="View My Insurance"
          width="100%"
          borderColor={BASE_BUTTON}
          titleColor={MAIN_BLACK}
          borderRadius={20}
          bodyColor={CC_WHITE}
          click={() => {}}
        />
        <View style={{height: 10}} />
        <ButtonComponent
          title="Purchase Vault:Points"
          width="100%"
          borderColor={BASE_BUTTON}
          titleColor={MAIN_BLACK}
          borderRadius={20}
          bodyColor={CC_WHITE}
          click={() => {}}
        />
        <View style={{height: 10}} />

        <ButtonComponent
          title="Review My Activities"
          width="100%"
          borderColor={BASE_BUTTON}
          titleColor={MAIN_BLACK}
          borderRadius={20}
          bodyColor={CC_WHITE}
          click={() => {}}
        />
        <View style={{height: 10}} />
        <ButtonComponent
          title="Questions"
          width="100%"
          borderColor={BASE_BUTTON}
          titleColor={MAIN_BLACK}
          borderRadius={20}
          bodyColor={CC_WHITE}
          click={() => {}}
        />
        <View style={{height: 10}} />
        <ButtonComponent
          title="Sign Out"
          width="100%"
          borderColor={BASE_BUTTON}
          titleColor={MAIN_BLACK}
          borderRadius={20}
          bodyColor={CC_WHITE}
          click={() => {}}
        />
        <View style={{height: 10}} />
      </View>
    </>
  );
};

export default Concierge;

const s = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: height,
    backgroundColor: BASE_BACKGROUND,
    paddingTop: 21,
    paddingHorizontal: 23,
  },
});
