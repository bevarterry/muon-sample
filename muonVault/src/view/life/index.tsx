import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Top from '../common/top';
import TopComponent from '@view/common/topComponent';
import {BASE_BACKGROUND} from '../ColorCode';
import NotReadyComponent from '@view/common/notReadyComponent';
const {width, height} = Dimensions.get('window');

const life_page = require('../../../assets/image/life_page.png');

const Life = () => {
  return (
    <>
      <TopComponent totalVp={12} />
      <View style={s.wrapper}>
        <NotReadyComponent
          icon={life_page}
          title={'Under Construction'}
          subText={
            'Store, edit, and legalize documents' +
            '\n' +
            'anytime you want. Safekeep any private ' +
            '\n' +
            'digital item in MU:Vault.'
          }
        />
      </View>
    </>
  );
};

export default Life;

const s = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: height,
    backgroundColor: BASE_BACKGROUND,
    paddingTop: 24,
  },
});
