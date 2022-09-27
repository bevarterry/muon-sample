import React, {useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/modules';
import {BASE_BACKGROUND} from '../ColorCode';

const top_logo = require('../../../assets/image/top_logo.png');

type PropTopComponent = {};
const TopComponent: React.FC<
  React.PropsWithChildren<PropTopComponent>
> = ({}) => {
  const vaultStore = useSelector((root: RootState) => root.vaultsStore);

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
      <Text style={{fontSize: 16, fontWeight: '700'}}>
        {vaultStore.totalAssets.muon} VP
      </Text>
    </View>
  );
};

export default TopComponent;

const s = StyleSheet.create({
  topComponentWrapper: {
    width: '100%',
    backgroundColor: BASE_BACKGROUND,
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
