import {
  BottomSheetBackdrop,
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
import {StyleSheet, Dimensions} from 'react-native';
import {
  BASE_BUTTON,
  BASE_GRAY_BACKGROUND,
  CC_WHITE,
  MAIN_BLACK,
} from '~/view/ColorCode';

type Props = {
  content: React.ReactNode;
  height: number;
};

const GlobalModal: React.FC<React.PropsWithChildren<Props>> = forwardRef(
  ({content, height}, ref) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => [height ? height : 400], [height]);

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
  close: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '700',
  },
});
