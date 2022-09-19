import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-status-bar-height';
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
const qr_icon = require('../../../../assets/image/qr_icon.png');

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
        leftComponent={
          <BasicBadge
            title={'To'}
            paddingHorizontal={12}
            paddingVertical={4}
            backgroundColor={MAIN_BLACK}
            fontColor={'#ffffff'}
            fontSize={12}
          />
        }
        rightComponent={
          <View style={{width: 16}}>
            <FastImage
              resizeMode="contain"
              style={{
                width: 16,
                height: 16,
              }}
              source={qr_icon}
            />
          </View>
        }
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
