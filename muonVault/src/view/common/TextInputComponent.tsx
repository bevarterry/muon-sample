import {SpringKeyboardAnimationConfig} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  Text,
  Platform,
  KeyboardTypeOptions,
} from 'react-native';
import {Value} from 'react-native-reanimated';
import { hScale } from '../scaling';

const {width, height} = Dimensions.get('window');

type Props = {
  textAlign?: "center" | "left" | "right" | undefined;
  keypad?: KeyboardTypeOptions | undefined;
  title?: string;
  fontSize?: number;
  fontWeight?: any;
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
  leftComponent?: any;
  rightComponent?: any;
  prooStyle?: any;
  propsValue?: string;
};
const TextInputComponent: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  textAlign,
  backgroundColor,
  active,
  icon,
  keypad,
  paddingVertical,
  marginHorizontal,
  password,
  blur,
  update,
  summit,
  fontSize,
  fontWeight,
  placeHolder,
  leftComponent,
  rightComponent,
  prooStyle,
  propsValue,
}) => {
  const ref_input = useRef(null);
  const [value, onChangeText] = useState('');
  const [mainColor, setMainColor] = useState('#e0e2e4');

  useEffect(() => {
    if (propsValue) onChangeText(propsValue);
  }, [propsValue]);
  return (
    <>
      <View
        style={[
          {
            paddingVertical: (paddingVertical ? paddingVertical : 23 - (Platform.OS === 'ios' ? 0 : 10)),
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
          prooStyle,
        ]}>
        {leftComponent}

        <TextInput
          secureTextEntry={password ? password : false}
          style={[
            s.editBox,
            {
              width: hScale(170),
              maxWidth: hScale(210),
              fontSize: fontSize ? fontSize : 13,
              fontWeight: fontWeight ? fontWeight : '400',
            },
          ]}
          keyboardType={keypad?keypad:'default'}
          textAlign={value ? (textAlign ? textAlign: 'right') : (textAlign ? textAlign: 'center')}
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
          value={value}>
            
          </TextInput>
        {rightComponent}
      </View>
    </>
  );
};

const s = StyleSheet.create({
  editBox: {
    color: '#222222',
  },
});

export default TextInputComponent;
