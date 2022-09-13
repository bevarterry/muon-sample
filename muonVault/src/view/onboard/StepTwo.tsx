import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import ButtonComponent from '../common/ButtonComponent';
import {BASE_BACKGROUND, BASE_BUTTON, MAIN_BLACK} from '../ColorCode';
const onboard_center_image = require('../../../assets/image/onboard_center_image.png');
import Top from '../common/top';

const StepTwo = () => {
  const navigation = useNavigation();

  function moveToHome() {
    navigation.navigate('Main' as never);
  }
  return (
    <>
      <Top
        title={''}
        backgroundColor={BASE_BACKGROUND}
        left={true}
        onTouchBackButton={navigation.goBack}
      />
      <View style={s.wrapper}>
        <Text style={s.centerText}>What can I help you?</Text>
        <FastImage
          resizeMode="contain"
          style={s.centerImage}
          source={onboard_center_image}
        />
        <View style={s.bottomButtonWrapper}>
          <ButtonComponent
            title="Find my Mu:Vault"
            width="100%"
            borderColor={BASE_BUTTON}
            titleColor={MAIN_BLACK}
            borderRadius="20"
            bodyColor={BASE_BUTTON}
            click={moveToHome}
          />
          <View style={{height: 10}} />
          <ButtonComponent
            title="Inherit MU:Vault"
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

export default StepTwo;

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
