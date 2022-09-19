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
} from '../../ColorCode';
import BasicBadge from '../../common/basicBadge';
import ButtonComponent from '../../common/ButtonComponent';
import TextInputComponent from '../../common/TextInputComponent';
import {WITHDRAW_BEFORE_EXECUTE} from '../../constantProperties';
import SummaryCard from './summaryCard';
const convert_value_icon = require('../../../../assets/image/convert_value_icon.png');
const {width, height} = Dimensions.get('window');
const buttonWidth = (width - 34) / 2;
type Props = {
  from: string;
  to: string;
  symbol: string;
  estimateGasFee: number;
  serviceFee: number;
  totalAmount: number;
};

const CompleteTransaction = (props: any) => {
  const [summary, setSummary] = useState<Props>({
    from: '',
    to: '',
    symbol: '',
    estimateGasFee: 0,
    serviceFee: 0,
    totalAmount: 0,
  });
  useEffect(() => {
    if (props.route.params) {
      setSummary(props.route.params);
    }
  }, []);

  return (
    <>
      <View style={s.wrapper}>
        <Text style={s.completeText}>Complete!</Text>
        <Text
          style={{
            textAlign: 'center',
            paddingHorizontal: 38,
            marginTop: 24,
            marginBottom: 30,
          }}>
          12.00 ETH ($18,702.20) has been transferred to the address 0x09e3…44E7
        </Text>
        <SummaryCard />
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 22,
          position: 'absolute',
          bottom: 50,
        }}>
        <ButtonComponent
          title="Done"
          width="100%"
          borderColor={MAIN_BLACK}
          titleColor={CC_WHITE}
          borderRadius={20}
          bodyColor={MAIN_BLACK}
          click={() => {}}
        />
      </View>
    </>
  );
};

export default CompleteTransaction;

const s = StyleSheet.create({
  wrapper: {
    paddingTop: getStatusBarHeight(),
    width: '100%',
    height: '100%',
    backgroundColor: BASE_BACKGROUND,
    paddingHorizontal: 13,
    display: 'flex',
    alignItems: 'center',
  },
  completeText: {
    marginTop: 20,
    fontWeight: '700',
    fontSize: 28,
  },
});
