import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const top_back_btn = require('../../../assets/image/top_back_btn.png');
type Props = {
  symbol: string;
  imageSource: any;
  gap?: number;
  size?: number;
  fontSize?: number;
  fontWeight?: any;
};
const CoinTitleComponent: React.FC<React.PropsWithChildren<Props>> = ({
  symbol,
  imageSource,
  fontWeight,
  fontSize,
  gap,
  size,
}) => {
  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: size ? size : 20,
            height: size ? size : 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: gap ? gap : 10,
          }}>
          <FastImage
            resizeMode="contain"
            style={{
              width: size ? size : 20,
              height: size ? size : 20,
            }}
            source={imageSource}
          />
        </View>
        <Text
          style={{
            fontSize: fontSize ? fontSize : 14,
            fontWeight: fontWeight ? fontWeight : '700',
          }}>
          {symbol}
        </Text>
      </View>
    </>
  );
};

export default CoinTitleComponent;

const s = StyleSheet.create({});
