import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch } from 'react-redux';
import { UserApiResponse } from '~/api/interface/userApiResponse';
import User from '~/api/User';
import { updateScAssets } from '~/store/action/scAction';
import { updateVaultsFromApi } from '~/store/action/VaultAction';
import { updateWallet } from '~/store/action/walletAction';
import Auth from '../../api/Auth';
import { setAccessToken } from '../../storage/AccessTokenStorage';
import { getCommonInfo, setCommonInfo } from '../../store/global/state';
import {
  BASE_BACKGROUND,
  BASE_BUTTON,
  CC_WHITE,
  DIMED_GRAY,
  MAIN_BLACK,
} from '../ColorCode';
import ButtonComponent from '../common/ButtonComponent';
import PinCodeInput from '../common/pinCodeInput';
import Top from '../common/top';
import { AUTH_EMAIL_TYPE, AUTH_PHONE_TYPE, INHERIT_VERIFY_CODE, NOTI_AUTH_PHONE, STORED_ACCESS_TOKEN, STORED_FCM_TOKEN } from '../constantProperties';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-simple-toast';
import { isDuplicated, stringToHash } from '../Hash';
import { INIT_AUTH } from './biometicContainer';
import { postInheritPin } from '~/api/Inherit';


const VerifyCode = (props: any) => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const [pinCode, setVerifyCode] = useState('');
  const [verifyItems, setVerifyItems] = useState({
    type: '',
    value: ''
  })


  useEffect(() => {
    setVerifyCode('');

    if (props.route.params.type) {
      const { type, value } = props.route.params;

      setVerifyItems({
        value: value,
        type: type
      })
    }
  }, []);


  messaging().onMessage(async (remoteMessage: any) => {
    if (remoteMessage === null) return;
    const hashCodeRomoteMessage = stringToHash(JSON.stringify(remoteMessage));
    if (isDuplicated(hashCodeRomoteMessage)) return;

    pushNextStep(remoteMessage.data.title, remoteMessage.data.message);
  });


  function pushNextStep(id: string | undefined, message: any) {

    if (id === undefined) return;

    if (id === NOTI_AUTH_PHONE) {
      setTimeout(() => {
        setVerifyCode(message);
        Toast.show(`인증번호 [${message}] 를 전달받았습니다.`, Toast.LONG);
      }, 1000);
    }
  }


  const isActiveDoneButton = () => {
    return pinCode.length == 6;
  };


  function inheritAuth(token: string) {
    const deadPin = props.route.params.inheritCode;

    console.log(token, deadPin);
    postInheritPin(deadPin,token)
      .then((e) => {
        console.log(props.route.params.inheritCode);

        navigation.pop(0);
        navigation.pop(1);
        navigation.goBack();
      })
      .catch((err)=> {
        Alert.alert('inherit code를 처리하는데 문제가 발생했습니다.')
      })
  }


  function requestVerifyPincode() {

    if (!isActiveDoneButton()) return;

    Auth.verifyPinCode({
      pin: pinCode,
    })
      .then(async res => {

        const { token } = res.data;

        if (verifyItems.type === AUTH_PHONE_TYPE) {
          

          if (props.route.params.inheritCode) {
            props.navigation.navigate('BiometicContainer', {
              purpose: INIT_AUTH,
              pass: () => { inheritAuth(token) },
              reject: () => { reject() }
            } as never);

            return ;
          }
          
          navigation.pop(1);
          return navigation.replace('InputEmail' as never);
        }
        

        await setAccessToken({ accessToken: token });
        setCommonInfo(STORED_ACCESS_TOKEN, token);


        props.navigation.navigate('BiometicContainer', {
          purpose: INIT_AUTH,
          pass: () => { checkBiometicPass() },
          reject: () => { reject() }
        } as never);

      })
      .catch(e => {
        Alert.alert('인증코드를 다시 확인하세요. ');
      });
  }


  async function reject() {
    await setAccessToken({ accessToken: '' });
    setCommonInfo(STORED_ACCESS_TOKEN, '');
    Toast.show(`생체인증에 실패했습니다.`, Toast.SHORT);
  }


  async function checkBiometicPass() {

    // FCM토큰 바로갱신
    updateFcmToken();

    updateUserInfo();

  }


  function updateFcmToken() {
    User.updateFcm({ fcmToken: getCommonInfo(STORED_FCM_TOKEN) });
  }


  function updateUserInfo() {
    User.info()
      .then(e => {
        const res: UserApiResponse = e;

        dispatch(updateWallet(res.Wallet));

        dispatch(updateVaultsFromApi());

        dispatch(updateScAssets(res.SafeAddress, res.Wallet, res.MUP));

        props.navigation.pop(1);
        props.navigation.pop(2);

        props.navigation.replace('Main');
      })
      .catch(e => {
        Alert.alert('인증은 정상적이나, 데이터로드에 오류발생');
      });
  }


  return (
    <>
      <KeyboardAvoidingView
        style={{ backgroundColor: BASE_BACKGROUND, }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 22,
            position: 'absolute',
            backgroundColor: BASE_BACKGROUND,
            bottom: Platform.OS === 'ios' ? 43 : 20,
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
            click={requestVerifyPincode}
          />
        </View>
        <View style={s.wrapper}>
          <Top
            title={'Verification Code'}
            backgroundColor={BASE_BACKGROUND}
            left={true}
            onTouchBackButton={navigation.goBack}
          />
          {
            verifyItems.type === AUTH_EMAIL_TYPE &&
            <Text style={s.title}>Please enter code  sent to {verifyItems.value}</Text>
          }
          {
            verifyItems.type === AUTH_PHONE_TYPE &&
            <Text style={s.title}>Please enter code </Text>
          }
          <Text style={s.inputTitle}>Verification code</Text>
          <View style={{ marginHorizontal: 23, marginTop: 10 }}>
            <PinCodeInput
              propValue={pinCode}
              numberOnly={true}
              maxLength={6}
              update={(e: string) => {
                setVerifyCode(e);
              }}
              blur={(e: string) => { }}
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
