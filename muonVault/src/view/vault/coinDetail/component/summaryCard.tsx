import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
  MAIN_BORDER_COROR,
} from '../../../ColorCode';
import BasicBadge from '../../../common/basicBadge';
import ButtonComponent from '../../../common/ButtonComponent';
import TextInputComponent from '../../../common/TextInputComponent';
import {WITHDRAW_BEFORE_EXECUTE} from '../../../constantProperties';
const convert_value_icon = require('../../../../assets/image/convert_value_icon.png');
const {width, height} = Dimensions.get('window');
const buttonWidth = (width - 34) / 2;
type Props = {
  fromComponent?: React.ReactNode;
  toComponent?: React.ReactNode;
  amountComponent?: React.ReactNode;
  totalComponent?: React.ReactNode;
};
const SummaryCard: React.FC<React.PropsWithChildren<Props>> = ({
  totalComponent,
  toComponent,
  fromComponent,
  amountComponent,
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

        <View style={[s.row, {marginTop: 40}]}>
          <Text style={s.title}>Estimated Gas Fee</Text>
          <Text style={s.value}>$20.90</Text>
        </View>
        <View style={s.row}>
          <Text style={s.subTitle}>Likeyly in {'<'} 30 seconds</Text>
        </View>
        <View style={[s.row, {marginTop: 11}]}>
          <Text style={s.title}>Service Fee</Text>
          <Text style={s.value}>{17}Valut Points</Text>
        </View>

        <View style={{width: '100%', borderWidth: 1, marginVertical: 31}} />

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
