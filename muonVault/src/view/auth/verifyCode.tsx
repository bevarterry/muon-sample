import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
} from '../ColorCode';
import BasicTextInput from '../common/basicTextInput';
import ButtonComponent from '../common/ButtonComponent';
import PinCodeInput from '../common/pinCodeInput';
import Top from '../common/top';

const VerifyCode = (props: any) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  useEffect(() => {
    if (props.route.params.email) {
      setEmail(props.route.params.email);
    }
  }, []);

  const isActiveDoneButton = () => {
    return verifyCode !== '';
  };

  return (
    <>
      <KeyboardAvoidingView behavior="padding">
        <View style={s.wrapper}>
          <Top
            title={'Veification Code'}
            backgroundColor={BASE_BACKGROUND}
            left={true}
            onTouchBackButton={navigation.goBack}
          />
          <Text style={s.title}>Please enter code sent to {email}</Text>
          <Text style={s.inputTitle}>Verification code</Text>
          <View style={{marginHorizontal: 23, marginTop: 10}}>
            <PinCodeInput
              update={(e: string) => {
                setVerifyCode(e);
              }}
              blur={(e: string) => {}}
              style={{
                paddingVertical: 16,
                width: '100%',
                borderTopWidth: 0,
                borderBottomWidth: 3,
                borderColor: MAIN_BLACK,
                borderRightWidth: 0,
                borderRadius: 0,
                borderLeftWidth: 0,
                marginTop: 10,
              }}
              initValue={email}
              textContentStyle={{
                fontSize: 22,
                fontWeight: '700',
              }}
            />
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 22,
              position: 'absolute',
              bottom: 43,
            }}>
            <ButtonComponent
              title="Verify"
              width="100%"
              borderColor={BASE_BUTTON}
              titleColor={DIMED_GRAY}
              borderRadius={20}
              activeColor={isActiveDoneButton() ? MAIN_BLACK : BASE_BUTTON}
              activeFontColor={isActiveDoneButton() ? CC_WHITE : DIMED_GRAY}
              bodyColor={BASE_BUTTON}
              click={() => {
                navigation.navigate('Main' as never);
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default VerifyCode;

const s = StyleSheet.create({
  wrapper: {
    zIndex: -1,
    paddingTop: 50 + getStatusBarHeight(),
    width: '100%',
    backgroundColor: BASE_BACKGROUND,
    height: '100%',
  },
  title: {
    marginLeft: 23,
    marginTop: 40,
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 28.8,
  },
  inputTitle: {
    marginLeft: 23,
    marginTop: 50,
    fontSize: 14,
    fontWeight: '600',
    color: DIMED_GRAY,
  },
});