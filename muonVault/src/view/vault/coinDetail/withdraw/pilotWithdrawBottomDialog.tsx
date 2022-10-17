import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { mScale } from '~/view/scaling';
import {
  BASE_BUTTON,
  BASE_GRAY_BACKGROUND,
  CC_WHITE,
  MAIN_BLACK,
} from '../../../ColorCode';
import ButtonComponent from '../../../common/ButtonComponent';
const withraw_money_icon = require('../../../../../assets/image/withdraw_money_img.png');

const PilotWithdrawBottomDialog = forwardRef((props: any, ref) => {
  
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => [537], []);

  useImperativeHandle(ref, () => ({
    openModal() {
      handlePresentModalPress();
    },
    closeModal() {
      handlePresentModalClose();
    },
  }));

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.3}
      />
    ),
    [],
  );
  // renders
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        handleIndicatorStyle={{backgroundColor: CC_WHITE}}
        backgroundStyle={{borderRadius: 40}}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        containerStyle={{
          position: 'absolute',
          top: 0,
          zIndex: 2,
          width: '100%',
        }}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}>
        <View style={s.contentContainer}>
          <Text style={s.title}>Pilot withdrawal is made</Text>
          <View style={{height: mScale(44) }} />
          <FastImage
            resizeMode="contain"
            style={{
              width: mScale(230),
              height: mScale(120),
            }}
            source={withraw_money_icon}
          />
          <Text style={s.guide}>
            Please check with the receiving end to validate the address.
          </Text>

          <View
            style={{
              marginTop: 40,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              paddingHorizontal: 23,
            }}>
            <ButtonComponent
              title="Confirmed"
              width={'100%'}
              borderColor={BASE_GRAY_BACKGROUND}
              titleColor={CC_WHITE}
              paddingVertical={21}
              borderRadius={16}
              bodyColor={MAIN_BLACK}
              click={() => {
                props.send();
              }}
            />
            <View style={{height: 10}} />
            <ButtonComponent
              title="Stop withdrawal"
              width={'100%'}
              borderColor={BASE_GRAY_BACKGROUND}
              titleColor={MAIN_BLACK}
              paddingVertical={21}
              borderRadius={16}
              bodyColor={BASE_GRAY_BACKGROUND}
              click={() => {
                handlePresentModalClose();
              }}
            />
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default PilotWithdrawBottomDialog;

const s = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: mScale(30),
    fontSize: mScale(24),
    fontWeight: '700',
  },
  guide: {
    width: mScale(330) ,
    textAlign: 'center',
    fontSize: mScale(16),
    fontWeight: '400',
    lineHeight: mScale(22.4),
    marginTop: mScale(24),
  },
  close: {
    marginTop: mScale(20),
    fontSize: mScale(20),
    fontWeight: '700',
  },
});
