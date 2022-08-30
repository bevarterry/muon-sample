import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  title: string;
  left?: string;
};
const top: React.FC<React.PropsWithChildren<Props>> = ({title, left}) => {
  return (
    <View style={s.topWrapper}>
      <Text>{left}</Text>
      <Text style={s.title}>{title}</Text>
      <Text></Text>
    </View>
  );
};

export default top;

const s = StyleSheet.create({
  topWrapper: {
    width: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 10,
  },
  editBox: {
    width: '100%',
    alignItems: 'center',
  },
});
