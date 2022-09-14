import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

type Props = {
  title: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  backgroundColor?: string;
  borderWidth?: number;
  fontColor?: string;
  fontSize?: number;
};
const BasicBadge: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  paddingHorizontal,
  paddingVertical,
  backgroundColor,
  fontColor,
  fontSize,
  borderWidth,
}) => {
  return (
    <>
      <View
        style={[
          s.wrapper,
          {
            backgroundColor: backgroundColor ? backgroundColor : '#ffffff',
            borderWidth: borderWidth ? borderWidth : 0,
            borderRadius: 14,
            paddingHorizontal: paddingHorizontal ? paddingHorizontal : 5,
            paddingVertical: paddingVertical ? paddingVertical : 3,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 32,
  },
});
