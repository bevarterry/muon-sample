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
import ButtonComponent from '~/view/common/ButtonComponent';
import {
  BASE_BUTTON,
  BASE_GRAY_BACKGROUND,
  CC_WHITE,
  MAIN_BLACK,
} from '~/view/ColorCode';

const {width, height} = Dimensions.get('window');
const buttonWidth = (width - 30) / 2;

type Props = {
  content: React.ReactNode;
  height: number;
};

const GlobalModal: React.FC<React.PropsWithChildren<Props>> = forwardRef(
  ({content, height}, ref) => {
    const address = '1YoURbEATcoiN99MYWaLLetiDaDdRess72';

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => [height], [height]);

    useImperativeHandle(ref, () => ({
      openModal() {
        console.log(height);
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
          style={{zIndex: 2}}
          backgroundStyle={{borderRadius: 40}}
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}>
          {content}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  },
);

export default GlobalModal;

const s = StyleSheet.create({
  contentContainer: {
    zIndex: 2,
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
