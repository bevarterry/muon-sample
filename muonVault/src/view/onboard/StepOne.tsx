import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import ButtonComponent from '../../component/ButtonComponent';
import {BASE_BACKGROUND, BASE_BUTTON, MAIN_BLACK} from '../ColorCode';
const onboard_center_image = require('../../../assets/image/onboard_center_image.png');
import Top from '../common/top';

const StepOne = () => {
  return (
    <>
      <Top title={''} backgroundColor={BASE_BACKGROUND} />
      <View style={s.wrapper}>
        <Text style={s.centerText}>Are you new to{'\n'}Mu:Vault?</Text>
        <FastImage
          resizeMode="contain"
          style={s.centerImage}
          source={onboard_center_image}
        />
        <View style={s.bottomButtonWrapper}>
          <ButtonComponent
            title="Yes"
            width="100%"
            borderColor={BASE_BUTTON}
            titleColor={MAIN_BLACK}
            borderRadius="20"
            bodyColor={BASE_BUTTON}
            click={() => {}}
          />
          <View style={{height: 10}} />
          <ButtonComponent
            title="No"
            width="100%"
            borderColor={BASE_BUTTON}
            titleColor={MAIN_BLACK}
            borderRadius="20"
            bodyColor={BASE_BUTTON}
            click={() => {}}
          />
        </View>
      </View>
    </>
  );
};

export default StepOne;

const s = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BASE_BACKGROUND,
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
