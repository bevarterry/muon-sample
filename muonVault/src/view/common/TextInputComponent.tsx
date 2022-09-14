import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {MAIN_BLACK} from '../ColorCode';
import BasicBadge from './basicBadge';
const qr_icon = require('../../../assets/image/qr_icon.png');
const {width, height} = Dimensions.get('window');

type Props = {
  title?: string;
  left?: boolean;
  placeHolder?: string;
  backgroundColor?: string;
  borderColor?: string;
  onTouchBackButton?: Function;
  active?: boolean;
  icon?: any;
  paddingVertical?: number;
  marginHorizontal?: number;
  password?: boolean;
  update: Function;
  blur?: Function;
  summit?: Function;
};
const TextInputComponent: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  backgroundColor,
  active,
  icon,
  paddingVertical,
  marginHorizontal,
  password,
  blur,
  update,
  summit,
  placeHolder,
}) => {
  const ref_input = useRef(null);
  const [value, onChangeText] = useState('');
  const [mainColor, setMainColor] = useState('#e0e2e4');

  return (
    <>
      <View
        style={[
          {
            paddingVertical: paddingVertical ? paddingVertical : 23,
            marginHorizontal: marginHorizontal ? marginHorizontal : 7,
            paddingLeft: 20,
            paddingRight: 32,
            borderWidth: 1,
            backgroundColor: backgroundColor ? backgroundColor : '#f0f2f4',
            borderRadius: 14,
            opacity: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          {borderColor: mainColor},
        ]}>
        <BasicBadge
          title={'To'}
          paddingHorizontal={12}
          paddingVertical={4}
          backgroundColor={MAIN_BLACK}
          fontColor={'#ffffff'}
          fontSize={12}
        />

        <TextInput
          secureTextEntry={password ? password : false}
          style={[s.editBox, {width: 250, maxWidth: 300}]}
          textAlign={'center'}
          editable
          ref={ref_input}
          numberOfLines={1}
          onEndEditing={() => {}}
          onChangeText={(text: string) => {
            if (update) update(text);
            onChangeText(text);
          }}
          onFocus={() => {
            //props.focus();
          }}
          onBlur={() => {
            if (blur) blur(value);
          }}
          onSubmitEditing={() => {
            if (summit) summit();
          }}
          placeholder={placeHolder}
          placeholderTextColor="#9C9C9C"
          value={value}
        />
        <View style={{width: 16}}>
          <FastImage
            resizeMode="contain"
            style={{
              width: 16,
              height: 16,
            }}
            source={qr_icon}
          />
        </View>
      </View>
    </>
  );
};

const s = StyleSheet.create({
  editBox: {
    fontSize: 13,
    color: '#222222',
    fontWeight: '400',
  },
});

export default TextInputComponent;
