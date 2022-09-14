import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BASE_BACKGROUND} from '../ColorCode';
import TotalAssetsComponent from './totalAssetsComponent';
import ValutCardListComponent from './valutCardListComponent';
const top_logo = require('../../../assets/image/top_logo.png');
const Vault = () => {
  return (
    <>
      <ScrollView style={s.wrapper}>
        <TopComponent />
        <AssetSummaryComponent />
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

const TopComponent = () => {
  return (
    <View style={s.topComponentWrapper}>
      <FastImage
        resizeMode="contain"
        style={{
          width: 101,
          height: 20,
        }}
        source={top_logo}
      />
      <Text style={{fontSize: 16, fontWeight: '700'}}>2,436 VP</Text>
    </View>
  );
};

const AssetSummaryComponent = () => {
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
        $72,032,532
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
  topComponentWrapper: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
