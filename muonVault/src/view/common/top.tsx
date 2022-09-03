import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

type Props = {
  title: string;
  left?: string;
};
const top: React.FC<React.PropsWithChildren<Props>> = ({title, left}) => {
  return (
    <>
      <View style={s.topWrapper}>
        <Text>{left}</Text>
        <Text style={s.title}>{title}</Text>
        <Text></Text>
      </View>
    </>
  );
};

export default top;

const s = StyleSheet.create({
  topWrapper: {
    paddingTop: getStatusBarHeight(),
    paddingBottom: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
  },
  editBox: {
    width: '100%',
    alignItems: 'center',
  },
});
