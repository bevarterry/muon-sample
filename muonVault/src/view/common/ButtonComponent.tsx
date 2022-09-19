import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';

type Props = {
  title: string;
  borderColor?: string;
  bodyColor?: string;
  marginTop?: string;
  paddingVertical?: number;
  click: Function;
  width: number | string;
  titleColor: string;
  borderRadius: number;
  activeColor?: string;
  activeFontColor?: string;
};
const ButtonComponent: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  titleColor,
  borderColor,
  bodyColor,
  marginTop,
  width,
  click,
  activeColor,
  paddingVertical,
  activeFontColor,
  borderRadius,
}) => {
  return (
    <View
      style={[
        s.button,
        {
          paddingVertical: paddingVertical ? paddingVertical : 17,
          borderColor: borderColor,
          backgroundColor: activeColor ? activeColor : bodyColor,
          marginTop: marginTop ? marginTop : 0,
        },
      ]}>
      <TouchableOpacity
        style={{width: width, flexDirection: 'row'}}
        activeOpacity={0.7}
        onPress={() => {
          click();
        }}>
        <View style={s.editBox}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 16,
              color: activeFontColor ? activeFontColor : titleColor,
              fontWeight: 'bold',
            }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  titleBox: {
    width: '10%',
    alignItems: 'center',
    paddingLeft: 10,
  },
  button: {
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 14,
    opacity: 1,
    flexDirection: 'row',
  },
  editBox: {
    width: '100%',
    alignItems: 'center',
  },
});

export default ButtonComponent;
