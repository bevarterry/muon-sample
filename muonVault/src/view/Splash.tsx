import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {CC_LOGHT_YELLOW} from './ColorCode';

const Splash = (props: any) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('Home');
    }, 800);
  });

  return <View style={s.wrapper}></View>;
};

export default Splash;

const s = StyleSheet.create({
  wrapper: {
    zIndex: 2,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CC_LOGHT_YELLOW,
  },
  guideImage: {
    width: 106,
    height: 100,
    marginBottom: 20,
  },
});
