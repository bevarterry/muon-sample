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
import {CC_WHITE, MAIN_BLACK, MAIN_BORDER_COROR} from '../ColorCode';
const home_card_1_img = require('../../../assets/image/home_card_1_img.png');
const home_card_2_img = require('../../../assets/image/home_card_2_img.png');
const home_card_3_img = require('../../../assets/image/home_card_3_img.png');
const home_card_4_img = require('../../../assets/image/home_card_4_img.png');
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
      {id === '1' && (
        <TwiceComponent
          icon={home_card_2_img}
          title={'Safe and Easy' + '\n' + 'for all'}
          subText={
            'In MU:Vault’s patented security system, your crypto assets are virtually unhackable, unphishable, and unbreakable.'
          }
        />
      )}
      {id === '2' && (
        <TwiceComponent
          icon={home_card_3_img}
          title={'Designed to ' + '\n' + 'Minimize Human' + '\n' + 'Error'}
          subText={'Deposit and withdraw crypto without confusion or mistakes.'}
        />
      )}
      {id === '3' && (
        <TwiceComponent
          icon={home_card_4_img}
          title={'Insured against' + '\n' + 'Hacking and' + '\n' + 'Accidents'}
          subText={
            'Moreover, it is insured by the world’s leading insurance firms against most common types of hacking and accidents.'
          }
        />
      )}
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
        confusing tech, irritating steps, or hidden fees! Choi’s MU:onoff offers
        the only choice you need.
      </Text>
    </View>
  );
};

type twiceComponentProps = {
  icon: any;
  title: string;
  subText: string;
};
const TwiceComponent: React.FC<
  React.PropsWithChildren<twiceComponentProps>
> = ({icon, title, subText}) => {
  return (
    <View style={s.guideCardTwice}>
      <Text style={s.twiceTitle}>{title}</Text>
      <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
        <FastImage
          resizeMode="stretch"
          style={{width: 300, height: 200, marginTop: 60}}
          source={icon}
        />
      </View>

      <Text
        style={{
          width: 275,
          fontSize: 16,
          fontWeight: '500',
          color: '#000000',
          marginTop: 40,
          lineHeight: 20.07,
        }}>
        {subText}
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
  guideCardTwice: {
    paddingHorizontal: 24,
    backgroundColor: CC_WHITE,
    borderWidth: 1,
    borderColor: MAIN_BORDER_COROR,
    display: 'flex',
    paddingBottom: 43,
    borderRadius: 14,
    width: width - paddingHorizontalLength * 2,
    paddingTop: 42,
    marginRight: 15,
  },
  twiceTitle: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28.8,
  },
});
