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
  focusYn?: Function;
  summit?: Function;
  leftComponent?: any;
  rightComponent?: any;
  style?: any;
  textContentStyle?: any;
  initValue?: string | number;
  numberOnly?: boolean;
  textAlign?: 'center' | 'right' | 'left' | undefined;
};
const BasicTextInput: React.FC<React.PropsWithChildren<Props>> = ({
  active,
  postfix,
  textAlign,
  password,
  blur,
  focusYn,
  update,
  summit,
  placeHolder,
  leftComponent,
  rightComponent,
  style,
  textContentStyle,
  initValue,
  numberOnly,
}) => {
  const ref_input = useRef(null);
  const [value, onChangeText] = useState('0');
  const [mainColor, setMainColor] = useState('#e0e2e4');

  function changeValue(e: string) {
    let val = e;

    if (!e) val = '0';

    if (update) update(parseInt(val));
    onChangeText(parseInt(val) + '');
  }

  function keyboardType() {
    if (numberOnly) return 'number-pad';
    return 'default';
  }
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
          keyboardType={keyboardType()}
          textAlign={textAlign ? textAlign : 'center'}
          editable
          ref={ref_input}
          numberOfLines={1}
          onEndEditing={() => {}}
          onChangeText={(text: string) => {
            changeValue(text);
          }}
          onFocus={() => {
            if (focusYn) focusYn();
            //props.focus();
          }}
          onBlur={() => {
            console.log(2);
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
