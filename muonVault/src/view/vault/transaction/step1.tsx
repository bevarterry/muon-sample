import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {CoinDetailType} from '../../../model/coin';
import {Vault} from '../../../model/vaults';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
} from '../../ColorCode';
import BasicBadge from '../../common/basicBadge';
import ButtonComponent from '../../common/ButtonComponent';
import TextInputComponent from '../../common/TextInputComponent';
import {WITHDRAW_BEFORE_EXECUTE} from '../../constantProperties';
const convert_value_icon = require('../../../../assets/image/convert_value_icon.png');

type Props = {
  updateStep: Function;
  updateAmount: Function;
};
const Step1: React.FC<React.PropsWithChildren<Props>> = ({
  updateStep,
  updateAmount,
}) => {
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
      <TextInputComponent
        leftComponent={
          <BasicBadge
            title={'Amount'}
            paddingHorizontal={12}
            paddingVertical={4}
            backgroundColor={MAIN_BLACK}
            fontColor={'#ffffff'}
            fontSize={12}
          />
        }
        rightComponent={
          <View style={{marginLeft: 5}}>
            <Text style={{fontSize: 22, fontWeight: '700'}}>ETH</Text>
          </View>
        }
        fontSize={22}
        fontWeight={'700'}
        backgroundColor={'#ffffff'}
        update={(e: string) => {
          updateAmount(e);
          setAmount(e);
        }}
        active={amount !== ''}
        blur={(e: string) => {}}
      />
      <View
        style={[
          s.rowCenter,
          {
            width: '100%',
            justifyContent: 'space-between',
            marginTop: 14,
            paddingLeft: 32,
            paddingRight: 23,
          },
        ]}>
        <Text>Value</Text>
        <View style={[s.rowCenter, {paddingHorizontal: 0}]}>
          <TouchableOpacity style={s.convertButton} activeOpacity={0.7}>
            <FastImage
              resizeMode="contain"
              style={{
                width: 13.5,
                height: 13.5,
              }}
              source={convert_value_icon}
            />
          </TouchableOpacity>
          <Text>$19,702.20</Text>
        </View>
      </View>
      <View
        style={[
          {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            marginTop: 24,
          },
        ]}>
        <Text style={s.balanceText}>
          Balance <Text style={{color: MAIN_BLACK}}>23.5ETH</Text>($38,528.12)
        </Text>
        <Text style={s.balanceText}>1 ETH = $1,642.04</Text>
      </View>
      <View style={{width: '100%', paddingHorizontal: 20, marginTop: 30}}>
        <ButtonComponent
          title="Done"
          width="100%"
          borderColor={BASE_BUTTON}
          titleColor={DIMED_GRAY}
          borderRadius={20}
          activeColor={isActiveDoneButton() ? MAIN_BLACK : undefined}
          activeFontColor={isActiveDoneButton() ? CC_WHITE : undefined}
          bodyColor={BASE_BUTTON}
          click={() => {
            if (isActiveDoneButton()) {
              updateStep(WITHDRAW_BEFORE_EXECUTE);
            }
          }}
        />
      </View>
    </>
  );
};

export default Step1;

const s = StyleSheet.create({
  wrapper: {
    paddingTop: 50 + getStatusBarHeight(),
    width: '100%',
    backgroundColor: BASE_BACKGROUND,
    height: '100%',
  },
  fromRow: {
    width: '100%',
    paddingVertical: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  rowCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  convertButton: {
    paddingHorizontal: 17,
    paddingVertical: 9,
    backgroundColor: CC_WHITE,
    borderRadius: 20,
  },
  convertValue: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
    backgroundColor: MAIN_BLACK,
  },
  balanceText: {
    color: DIMED_GRAY,
    fontSize: 14,
    fontWeight: '500',
  },
});
