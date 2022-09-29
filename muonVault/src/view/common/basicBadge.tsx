import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {MAIN_BORDER_COROR} from '../ColorCode';

type Props = {
  title: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  backgroundColor?: string;
  borderWidth?: number;
  fontColor?: string;
  fontSize?: number;
  borderRadius?: number;
  borderColor?: string;
};
const BasicBadge: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  borderRadius,
  paddingHorizontal,
  paddingVertical,
  backgroundColor,
  fontColor,
  fontSize,
  borderWidth,
  borderColor,
}) => {
  return (
    <>
      <View
        style={[
          s.wrapper,
          {
            backgroundColor: backgroundColor ? backgroundColor : '#ffffff',
            borderWidth: borderWidth ? borderWidth : 0,
            borderRadius: borderRadius ? borderRadius : 14,
            paddingHorizontal: paddingHorizontal ? paddingHorizontal : 5,
            paddingVertical: paddingVertical ? paddingVertical : 3,
            borderColor: borderColor ? borderColor : MAIN_BORDER_COROR,
          },
        ]}>
        <Text
          style={{
            fontSize: fontSize ? fontSize : 10,
            color: fontColor ? fontColor : '#A6A6A6',
            fontWeight: '700',
          }}>
          {title}
        </Text>
      </View>
    </>
  );
};

export default BasicBadge;

const s = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 32,
  },
});
