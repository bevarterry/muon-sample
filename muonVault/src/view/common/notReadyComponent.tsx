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

type twiceComponentProps = {
  icon: any;
  title: string;
  subText: string;
};
const NotReadyComponent: React.FC<
  React.PropsWithChildren<twiceComponentProps>
> = ({icon, title, subText}) => {
  return (
    <View style={s.wrapper}>
      <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
        <FastImage
          resizeMode="stretch"
          style={{width: 280, height: 200}}
          source={icon}
        />
      </View>

      <Text style={s.title}>{title}</Text>

      <Text
        style={{
          textAlign: 'center',
          width: 300,
          fontSize: 16,
          fontWeight: '400',
          color: '#000000',
          marginTop: 30,
          lineHeight: 20.8,
        }}>
        {subText}
      </Text>
    </View>
  );
};

export default NotReadyComponent;

const s = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 35,
    borderRadius: 14,
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

    paddingTop: 42,
    marginRight: 15,
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28.8,
  },
});
