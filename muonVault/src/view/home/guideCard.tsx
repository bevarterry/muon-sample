import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CC_WHITE} from '../ColorCode';
const home_card_1_img = require('../../../assets/image/home_card_1_img.png');
const muon_subTitle = require('../../../assets/image/muon_subTitle.png');

const {width, height} = Dimensions.get('window');
const paddingHorizontalLength = 27;
type Prop = {
  id: string;
};
const GuideCard: React.FC<React.PropsWithChildren<Prop>> = ({id}) => {
  return (
    <>
      {id === '0' && firstComponent()}
      {id === '1' && twiceComponent()}
    </>
  );
};

export default GuideCard;
const firstComponent = () => {
  return (
    <View style={s.guideCard}>
      <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
        <FastImage
          resizeMode="stretch"
          style={{width: 300, height: 200}}
          source={home_card_1_img}
        />
      </View>

      <FastImage
        resizeMode="stretch"
        style={{width: 196.24, height: 27.34, marginTop: 33, marginLeft: 24}}
        source={muon_subTitle}
      />

      <Text
        style={{
          width: 260,
          fontSize: 14,
          fontWeight: '400',
          color: CC_WHITE,
          marginTop: 39.66,
          paddingLeft: 24,
          lineHeight: 20.07,
        }}>
        With Choi’s MU:onoff, you are free to navigate the crypto world without
        confusing tech, irritating steps, or mixed with hidden fees! Choi’s
        MU:onoff offers the only choice you need.
      </Text>
    </View>
  );
};

const twiceComponent = () => {
  return (
    <View style={s.guideCard}>
      <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
        <FastImage
          resizeMode="stretch"
          style={{width: 300, height: 200}}
          source={home_card_1_img}
        />
      </View>

      <FastImage
        resizeMode="stretch"
        style={{width: 196.24, height: 27.34, marginTop: 33, marginLeft: 24}}
        source={muon_subTitle}
      />

      <Text
        style={{
          width: 260,
          fontSize: 14,
          fontWeight: '400',
          color: CC_WHITE,
          marginTop: 39.66,
          paddingLeft: 24,
          lineHeight: 20.07,
        }}>
        With Choi’s MU:onoff, you are free to navigate the crypto world without
        confusing tech, irritating steps, or mixed with hidden fees! Choi’s
        MU:onoff offers the only choice you need.
      </Text>
    </View>
  );
};
const s = StyleSheet.create({
  wrapper: {
    paddingLeft: paddingHorizontalLength,
    paddingRight: paddingHorizontalLength - 15,
  },
  guideCard: {
    backgroundColor: '#1C1C1C',
    display: 'flex',
    paddingBottom: 35,
    borderRadius: 14,
    width: width - paddingHorizontalLength * 2,
    paddingTop: 80,
    marginRight: 15,
  },
});
