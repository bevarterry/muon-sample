import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
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
import {WITHDRAW_INPUT_AMOUNT} from '../../constantProperties';

type Props = {
  updateStep: Function;
  updateToAddress: Function;
};
const Step0: React.FC<React.PropsWithChildren<Props>> = ({
  updateStep,
  updateToAddress,
}) => {
  const [toAddress, setToAddress] = useState('');

  const leftComponent = (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}></View>
  );

  const isActiveNextButton = () => {
    return toAddress !== '';
  };

  return (
    <>
      <TextInputComponent
        placeHolder={'Enter withdrawal address or ENS'}
        backgroundColor={'#ffffff'}
        update={(e: string) => {
          updateToAddress(e);
          setToAddress(e);
        }}
        active={toAddress !== ''}
        blur={(e: string) => {}}
      />
      <View style={{width: '100%', paddingHorizontal: 20, marginTop: 30}}>
        <ButtonComponent
          title="Next"
          width="100%"
          borderColor={BASE_BUTTON}
          titleColor={DIMED_GRAY}
          borderRadius={20}
          activeColor={isActiveNextButton() ? MAIN_BLACK : undefined}
          activeFontColor={isActiveNextButton() ? CC_WHITE : undefined}
          bodyColor={BASE_BUTTON}
          click={() => {
            if (isActiveNextButton()) {
              updateStep(WITHDRAW_INPUT_AMOUNT);
            }
          }}
        />
      </View>
    </>
  );
};

export default Step0;

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
  topComponentWrapper: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryComponentWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 33,
    display: 'flex',
    marginTop: 37,
  },
  centerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28.8,
  },
  centerImage: {
    width: 240,
    height: 240,
    marginTop: 54,
    marginBottom: 100,
  },
  bottomButtonWrapper: {
    width: '100%',
    paddingHorizontal: 37,
    zIndex: 2,
    position: 'absolute',
    bottom: 80,
  },
});
