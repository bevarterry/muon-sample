import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
  MAIN_BORDER_COROR,
} from '../../../ColorCode';

type Props = {
  fromComponent?: React.ReactNode;
  toComponent?: React.ReactNode;
  amountComponent?: React.ReactNode;
  totalComponent?: React.ReactNode;
  serviceFee: number;
  estimateGasFee: number;
};
const SummaryCard: React.FC<React.PropsWithChildren<Props>> = ({
  totalComponent,
  toComponent,
  fromComponent,
  amountComponent,
  serviceFee,
  estimateGasFee
}) => {
  return (
    <>
      <View style={s.withdrawSummary}>
        {fromComponent && (
          <View style={[s.row, {height: 60, marginTop: 25}]}>
            {fromComponent}
          </View>
        )}
        {toComponent && (
          <View style={[s.row, {height: 60}]}>{toComponent}</View>
        )}
        {amountComponent && (
          <View style={[s.row, {height: 60}]}>{amountComponent}</View>
        )}
        {estimateGasFee !== 0 && <>
          <View style={[s.row, {marginTop: 40}]}>
            <Text style={s.title}>Estimated Gas Fee</Text>
            <Text style={s.value}>{estimateGasFee} gwei</Text>
          </View>
          <View style={s.row}>
            <Text style={s.subTitle}>Likely in {'<'} 30 seconds</Text>
          </View>
          <View style={[s.row, {marginTop: 11, marginBottom: 10}]}>
            <Text style={s.title}>Service Fee</Text>
            <Text style={s.value}>{serviceFee} MU Point</Text>
          </View>
        </>}


        <View style={{width: '100%', borderWidth: 1, marginBottom: 31, marginTop: 21}} />

        <View style={[s.row]}>{totalComponent}</View>
      </View>
    </>
  );
};

export default SummaryCard;

const s = StyleSheet.create({
  withdrawSummary: {
    width: '100%',
    marginTop: 0,
    marginHorizontal: 8,
    paddingHorizontal: 13,
    paddingBottom: 39,
    backgroundColor: CC_WHITE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: MAIN_BORDER_COROR,
  },
  row: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16.7,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
    color: DIMED_GRAY,
  },
});
