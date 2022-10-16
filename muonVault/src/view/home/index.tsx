import React from 'react';
import {Dimensions, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import TopComponent from '@view/common/topComponent';
import {BASE_BACKGROUND} from '../ColorCode';
import GuideCardListComponent from './guideCardListComponent';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { mScale } from '../scaling';
const {width, height} = Dimensions.get('window');
const Home = () => {
  return (
    <>
      <TopComponent />
      <ScrollView contentContainerStyle={s.wrapper}>
        <GuideCardListComponent />
      </ScrollView>
      </>
  );
};

export default Home;

const s = StyleSheet.create({
  scrollWrapper: {
    paddingBottom: Platform.OS === 'ios' ? 43 : 20,
    width: '100%',
    height: '100%',
    backgroundColor: BASE_BACKGROUND,
    display: 'flex',
  },
  wrapper: {
    width: '100%',
    backgroundColor: BASE_BACKGROUND,
    paddingTop: 24,
    paddingBottom: 100
  },
});
