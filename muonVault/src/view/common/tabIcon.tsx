import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {MAIN_BLACK} from '../ColorCode';

type Props = {
  title: string;
  left?: boolean;
  backgroundColor?: string;
  onTouchBackButton?: Function;
  active: boolean;
  icon: any;
};
const TabIcon: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  active,
  icon,
}) => {
  let tapColor = '#222222';

  return (
    <View style={s.tabOptionBox}>
      <FastImage
        resizeMode="contain"
        style={{
          width: 28,
          height: 28,
          opacity: active ? 1 : 0.2,
        }}
        source={icon}
      />
      <View style={[s.tabOptionTextBox, {borderBottomWidth: active ? 2 : 0}]}>
        <Text
          style={[
            s.tabOptionText,
            {
              color: tapColor,
              marginTop: 0,
              opacity: active ? 1 : 0.2,
            },
          ]}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default TabIcon;

const s = StyleSheet.create({
  tabOptionBox: {
    paddingTop: 2,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  tabOptionText: {
    fontSize: 12,
    fontWeight: '800',
  },
  tabOptionTextBox: {
    paddingBottom: 3,
  },
});
