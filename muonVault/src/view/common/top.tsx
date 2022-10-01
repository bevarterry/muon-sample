import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { MAIN_BLACK } from '../ColorCode';
const top_back_btn = require('../../../assets/image/top_back_btn.png');
type Props = {
  title: string;
  left?: boolean;
  backgroundColor?: string;
  onTouchBackButton?: Function;
  component?: any;
};
const top: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  left,
  backgroundColor,
  onTouchBackButton,
  component,
}) => {
  return (
    <>
      <View
        style={[
          s.topWrapper,
          {backgroundColor: backgroundColor ? backgroundColor : '#ffffff'},
        ]}>
        <TouchableOpacity
          style={s.buttonWrapper}
          activeOpacity={0.7}
          onPress={() => {
            if (onTouchBackButton) onTouchBackButton();
          }}>
          {left && (
            <FastImage
              resizeMode="contain"
              style={s.left}
              source={top_back_btn}
            />
          )}
        </TouchableOpacity>
        {!component && <Text style={s.title}>{title}</Text>}
        {component && <View>{component}</View>}
        <View style={s.buttonWrapper}>
          <Text></Text>
        </View>
      </View>
    </>
  );
};

export default top;

const s = StyleSheet.create({
  topWrapper: {
    position: 'absolute',
    top: 0,
    paddingTop: getStatusBarHeight(),
    paddingBottom: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: MAIN_BLACK,
    lineHeight: 32,
  },
  buttonWrapper: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    width: 8,
    height: 16,
  },
  editBox: {
    width: '100%',
    alignItems: 'center',
  },
});
