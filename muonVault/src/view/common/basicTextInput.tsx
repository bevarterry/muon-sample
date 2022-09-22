import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  Text,
} from 'react-native';

const {width, height} = Dimensions.get('window');

type Props = {
  postfix?: string;
  placeHolder?: string;
  active?: boolean;
  password?: boolean;
  update: Function;
  blur?: Function;
  summit?: Function;
  leftComponent?: any;
  rightComponent?: any;
  style?: any;
  textContentStyle?: any;
  initValue?: string;
  textAlign?: 'center' | 'right' | 'left' | undefined;
};
const BasicTextInput: React.FC<React.PropsWithChildren<Props>> = ({
  active,
  postfix,
  textAlign,
  password,
  blur,
  update,
  summit,
  placeHolder,
  leftComponent,
  rightComponent,
  style,
  textContentStyle,
  initValue,
}) => {
  const ref_input = useRef(null);
  const [value, onChangeText] = useState('');
  const [mainColor, setMainColor] = useState('#e0e2e4');

  useEffect(() => {
    onChangeText(initValue ? initValue : '');
  }, [initValue]);
  return (
    <>
      <View
        style={[
          {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}>
        {leftComponent}

        <TextInput
          secureTextEntry={password ? password : false}
          style={[textContentStyle]}
          keyboardType={'number-pad'}
          textAlign={textAlign ? textAlign : 'center'}
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
          value={value}></TextInput>
        {postfix && (
          <Text
            style={[
              textContentStyle,
              {
                marginLeft: 5,
              },
            ]}>
            VP
          </Text>
        )}

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

export default BasicTextInput;
