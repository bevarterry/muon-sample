import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, {
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
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {
  BASE_BUTTON,
  BASE_GRAY_BACKGROUND,
  CC_WHITE,
  MAIN_BLACK,
} from '~/view/ColorCode';

import ButtonComponent from '@view/common/ButtonComponent';
const {width, height} = Dimensions.get('window');
const buttonWidth = (width - 30) / 2;

const DepositBottomDialog = forwardRef((props: any, ref) => {
  const address = '1YoURbEATcoiN99MYWaLLetiDaDdRess72';

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => [467], []);

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

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
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
        style={{zIndex: 1}}
        backgroundStyle={{borderRadius: 40}}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}>
        <View style={s.contentContainer}>
          <Text style={s.title}>Deposit ETH</Text>
          <View style={{height: 44}} />
          <QRCode value={address} size={128} />
          <Text style={s.address}>{address}</Text>

          <View
            style={{
              marginTop: 30,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingHorizontal: 0,
            }}>
            <ButtonComponent
              title="Copy"
              width={buttonWidth}
              borderColor={BASE_GRAY_BACKGROUND}
              titleColor={MAIN_BLACK}
              paddingVertical={21}
              borderRadius={16}
              bodyColor={BASE_GRAY_BACKGROUND}
              click={() => {}}
            />
            <View style={{width: 10}} />
            <ButtonComponent
              title="Share"
              width={buttonWidth}
              borderColor={BASE_GRAY_BACKGROUND}
              titleColor={MAIN_BLACK}
              paddingVertical={21}
              borderRadius={16}
              bodyColor={BASE_GRAY_BACKGROUND}
              click={() => {}}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              handlePresentModalClose();
            }}>
            <Text style={s.close}>Close</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default DepositBottomDialog;

const s = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  address: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 24,
    marginTop: 7,
  },
  close: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '700',
  },
});
