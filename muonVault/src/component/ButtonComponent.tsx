import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';

const ButtonComponent = (props: any) => {
  const [value, onChangeText] = useState('');
  const [isValid, setIsValid] = useState(false);
  const refInput = useRef();

  useEffect(() => {
    onChangeText(props.input);
  }, [props.input]);

  return (
    <View
      style={[
        s.button,
        {
          borderColor: props.borderColor,
          backgroundColor: props.bodyColor,
          marginTop: props.marginTop ? props.marginTop : 0,
        },
      ]}>
      <TouchableOpacity
        style={{width: props.width, flexDirection: 'row'}}
        activeOpacity={0.7}
        onPress={() => {
          props.click();
        }}>
        <View style={s.editBox}>
          <Text
            allowFontScaling={false}
            style={{fontSize: 16, color: props.titleColor, fontWeight: 'bold'}}>
            {props.title}
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
    width: '100%',
    paddingVertical: 17,
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
