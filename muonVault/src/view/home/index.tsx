import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import TopComponent from '@view/common/topComponent';
import {BASE_BACKGROUND} from '../ColorCode';
import GuideCardListComponent from './guideCardListComponent';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {width, height} = Dimensions.get('window');
const Home = () => {
  return (
    <>
      <TopComponent />
      <View style={s.wrapper}>
        <GuideCardListComponent />
      </View>
    </>
  );
};

export default Home;

const s = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: height,
    backgroundColor: BASE_BACKGROUND,
    paddingTop: 24,
  },
});
