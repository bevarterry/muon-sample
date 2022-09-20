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
type Props = {};
const Step2: React.FC<React.PropsWithChildren<Props>> = ({}) => {
  const navigation = useNavigation();

  const [amount, setAmount] = useState('');
  const leftComponent = (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}></View>
  );

  const isActiveDoneButton = () => {
    return amount !== '';
  };
  return (
    <>
      <SummaryCard
        totalComponent={
          <>
            <BasicBadge
              title={'Total'}
              paddingHorizontal={12}
              paddingVertical={4}
              backgroundColor={MAIN_BLACK}
              fontColor={'#ffffff'}
              fontSize={12}
            />
            <Text style={s.totalValue}>$19,723.10</Text>
          </>
        }
      />
      <Text
        style={{
          textAlign: 'center',
          paddingHorizontal: 27,
          marginTop: 20,
          fontSize: 13,
          fontWeight: '400',
          lineHeight: 18.2,
        }}>
        Pilot withdraw is recommended to avoid an unintended transaction to a
        wrong address. $1 will be sent to the address above upon clicking “pilot
        withdraw”. Please check with the receiving end before full withdrawal.
        Gas fee will apply to the pilot withdraw.
      </Text>
      <View
        style={{
          marginTop: 30,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          paddingHorizontal: 12,
        }}>
        <ButtonComponent
          title="Pilot withdraw"
          width={buttonWidth}
          borderColor={BASE_BUTTON}
          titleColor={CC_WHITE}
          paddingVertical={21}
          borderRadius={16}
          activeColor={isActiveDoneButton() ? MAIN_BLACK : undefined}
          activeFontColor={isActiveDoneButton() ? CC_WHITE : undefined}
          bodyColor={MAIN_BLACK}
          click={() => {}}
        />
        <View style={{width: 10}} />
        <ButtonComponent
          title="Full withdraw"
          width={buttonWidth}
          borderColor={BASE_BUTTON}
          titleColor={MAIN_BLACK}
          paddingVertical={21}
          borderRadius={16}
          activeColor={isActiveDoneButton() ? MAIN_BLACK : undefined}
          activeFontColor={isActiveDoneButton() ? CC_WHITE : undefined}
          bodyColor={BASE_BUTTON}
          click={() => {
            //@ts-ignore
            navigation.replace('CompleteWithdraw', {
              from: '',
              to: '',
              symbol: '',
              estimateGasFee: 0,
              serviceFee: 0,
              totalAmount: 0,
            });
          }}
        />
      </View>
    </>
  );
};

export default Step2;

const s = StyleSheet.create({
  withdrawSummary: {
    marginHorizontal: 8,
    paddingVertical: 40,
    backgroundColor: CC_WHITE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: MAIN_BORDER_COROR,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
  },
});
