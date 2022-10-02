import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {MAIN_BLACK} from '../ColorCode';

type Props = {
  title: string;
  subTitle?: string;
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
  fontSize?: number;
};
const ButtonComponent: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  subTitle,
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
  fontSize,
}) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding": "height"}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          click();
        }}
        style={[
          s.button,
          {
            paddingVertical: paddingVertical ? paddingVertical : 17,
            borderColor: borderColor,
            backgroundColor: activeColor ? activeColor : bodyColor,
            marginTop: marginTop ? marginTop : 0,
          },
        ]}>
        <View style={{width: width, flexDirection: 'row'}}>
          <View style={s.editBox}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: fontSize ? fontSize : 16,
                color: activeFontColor ? activeFontColor : titleColor,
                fontWeight: 'bold',
              }}>
              {title}
            </Text>
            {subTitle && (
              <Text
                style={{
                  fontSize: 14,
                  color: activeFontColor ? activeFontColor : titleColor,
                  fontWeight: '500',
                }}>
                {subTitle}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
