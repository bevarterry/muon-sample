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
import {
  BASE_BUTTON,
  BASE_GRAY_BACKGROUND,
  CC_WHITE,
  MAIN_BLACK,
} from '../../../ColorCode';
import ButtonComponent from '../../../common/ButtonComponent';
const withraw_money_icon = require('../../../../../assets/image/withdraw_money_img.png');
const {width, height} = Dimensions.get('window');
const buttonWidth = (width - 30) / 2;

const PilotWithdrawBottomDialog = forwardRef((props: any, ref) => {
  const address = '1YoURbEATcoiN99MYWaLLetiDaDdRess72';

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => [537], []);

  useImperativeHandle(ref, () => ({
    openModal() {
      handlePresentModalPress();
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
          <View style={{height: 44}} />
          <FastImage
            resizeMode="contain"
            style={{
              width: 230,
              height: 120,
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
              click={() => {}}
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
    marginTop: 30,
    fontSize: 24,
    fontWeight: '700',
  },
  guide: {
    width: 330,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22.4,
    marginTop: 24,
  },
  close: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '700',
  },
});
