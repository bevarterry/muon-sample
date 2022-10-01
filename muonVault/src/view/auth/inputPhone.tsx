import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Auth from '../../api/Auth';
import {getCommonInfo, setCommonInfo} from '../../store/global/state';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
} from '../ColorCode';
import BasicTextInput from '../common/basicTextInput';
import ButtonComponent from '../common/ButtonComponent';
import Top from '../common/top';
import {NOTI_AUTH_PHONE, STORED_ACCESS_TOKEN, STORED_FCM_TOKEN} from '../constantProperties';
import Toast from 'react-native-simple-toast';
import PinCodeInput from '../common/pinCodeInput';
import { RootState } from '~/store/modules';
import { useSelector } from 'react-redux';

const InputPhone = (props: any) => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const userStore = useSelector((root: RootState) => root.userStore);
  const isActiveDoneButton = () => {

    return phoneNumber.length > 10;
  };

  function requestAuthByPhone() {
    console.log('************************[userStore.fcmToken]', userStore.fcmToken);
    const param = {
      type: 'phone',
      value: phoneNumber,
      fcmToken: getCommonInfo(STORED_FCM_TOKEN)
    };
    Auth.auth(param)
      .then(res => {
        Toast.show(`인증번호 요청 완료`, Toast.SHORT);
        const {token} = res.data;

        setCommonInfo(STORED_ACCESS_TOKEN, token);
        navigation.navigate('VerifyCode' as never, {phone: phoneNumber, type: NOTI_AUTH_PHONE, value: phoneNumber} as never);
      })
      .catch(e => {
        console.log(e);
        Alert.alert('네트워크 호출도중 오류발생');
      });
  }

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding": "height"}>
        <View style={s.wrapper}>
          <Top
            title={'Verification Mobile'}
            backgroundColor={BASE_BACKGROUND}
            left={true}
            onTouchBackButton={navigation.goBack}
          />
          <Text style={s.title}>Please type in your mobile number.</Text>
          <Text style={s.inputTitle}>Phone Number</Text>
          <View style={{marginHorizontal: 23, marginTop: 10}}>
          <PinCodeInput
              numberOnly={true}
              maxLength={11}
              update={(e: string) => {
                setPhoneNumber(e);
              }}
              blur={(e: string) => {}}
              style={{
                paddingVertical: Platform.OS === 'ios' ? 16 : 5,
                width: '100%',
                borderTopWidth: 0,
                borderBottomWidth: 3,
                borderColor: MAIN_BLACK,
                borderRightWidth: 0,
                borderRadius: 0,
                borderLeftWidth: 0,
                marginTop: 10,
              }}
              textContentStyle={{
                fontSize: 22,
                color: '#000000',
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
              title="Verify via SMS"
              width="100%"
              borderColor={BASE_BUTTON}
              titleColor={DIMED_GRAY}
              borderRadius={20}
              activeColor={isActiveDoneButton() ? MAIN_BLACK : BASE_BUTTON}
              activeFontColor={isActiveDoneButton() ? CC_WHITE : DIMED_GRAY}
              bodyColor={BASE_BUTTON}
              click={requestAuthByPhone}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default InputPhone;

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
